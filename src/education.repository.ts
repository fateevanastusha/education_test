import {pool} from "./index";
import {LessonViewModel} from "./education.models";

export class EducationRepository {
    async getLessons(date_1 : string | null,
                     date_2 : string | null,
                     status : string | null,
                     teacherIds : string | null,
                     studentsCount_1 : string | null,
                     studentsCount_2 : string | null,
                     page : number,
                     lessonsPerPage : number) : Promise <LessonViewModel[]>{
        const skipSize: number = lessonsPerPage * (page - 1)
        const result = await pool.query(`
        SELECT 
                l."id", l."date", l."title", l."status", 
                COUNT(DISTINCT ls."student_id") AS "visitCount",
                array_agg(DISTINCT ls."student_id") AS "student_ids",
                array_agg(DISTINCT lt."teacher_id") AS "teacher_ids"
                    FROM public."lessons" l
                    LEFT JOIN public."lesson_students" ls ON l."id" = ls."lesson_id"
                    LEFT JOIN public."lesson_teachers" lt ON l."id" = lt."lesson_id"
                    WHERE 
                    CASE
                    WHEN ${date_1} IS NULL AND ${date_2} IS NULL THEN true
                    WHEN ${date_1} IS NOT NULL AND ${date_2} IS NULL THEN l."date" = ${date_1}
                    ELSE l."date" BETWEEN ${date_1} AND ${date_2}
                    END
                        AND 
                        CASE 
                            WHEN ${status} = 1 THEN l."status" = 1 
                            WHEN ${status} = 0 THEN l."status" = 0 
                            ELSE l."status" IN (0,1) 
                            END
                    GROUP BY l."id", l."date", l."title", l."status"
                    HAVING 
                        ((${studentsCount_1} IS NULL AND ${studentsCount_2} IS NULL)
                        OR
                        (${studentsCount_1} IS NOT NULL AND ${studentsCount_2} IS NULL AND COUNT(DISTINCT ls."student_id") = ${studentsCount_1})
                        OR
                        (${studentsCount_1} IS NOT NULL AND ${studentsCount_2} IS NOT NULL AND COUNT(DISTINCT ls."student_id") BETWEEN ${studentsCount_1} AND ${studentsCount_2}))
                        AND
                        (CASE
                        WHEN ${teacherIds} IS NULL THEN true
                        ELSE ARRAY(SELECT unnest(array_agg(DISTINCT lt."teacher_id")::integer[])) && ARRAY[${teacherIds}]::integer[]
                        END)
                    ORDER BY l."id"
                    OFFSET ${skipSize} LIMIT ${lessonsPerPage}
        `);

        const lessons = result.rows

        return await Promise.all(lessons.map(async (lesson : any) => {

            let mappedLesson = {

                id: lesson.id,
                date: lesson.date.toISOString().split('T')[0],
                title: lesson.title,
                status: lesson.status,
                visitCount: lesson.visitCount,

                students: (await pool.query(`
                      SELECT 
                      "student_id", 
                      "visit", 
                      "name"
                          FROM public."lesson_students" ls 
                          JOIN public."students" s ON ls."student_id" = s."id"
                          WHERE ls."student_id" = ANY($1::integer[]) AND ls."lesson_id" = $2;
                    `, [lesson.student_ids, lesson.id])).rows,

                teachers: (await pool.query(`
                      SELECT 
                      "teacher_id" AS "id", 
                      "name"
                          FROM public."lesson_teachers" lt
                          JOIN public."teachers" t ON lt."teacher_id" = t."id"
                          WHERE lt."teacher_id" = ANY($1::integer[]) AND lt."lesson_id" = $2;
                    `, [lesson.teacher_ids, lesson.id])).rows
            }

            let students = [...mappedLesson.students];
            let visitedStudents = students.filter(a => a.visit === true);
            mappedLesson.visitCount = visitedStudents.length;
            return mappedLesson;
        }))
    }
    async createLesson(title : string, dateList : string[], mappedDateList : string, teachersIdList : number[]): Promise<number[]> {

        const result = await pool.query(`
            INSERT INTO public."lessons"("date", "title")
            VALUES ${mappedDateList}
            RETURNING "id";
        `)

        const lessonsIdList : number[] = result.rows.map((lessonObject : LessonReturnModel) => lessonObject.id);
        const teachersAndLessonsIdList : string = lessonsIdList
                .flatMap((lessonId : number) => teachersIdList.map((teacherId : number)=> `(${lessonId},${teacherId})`))
                .join(',');

        await pool.query(`
                INSERT INTO public."lesson_teachers"(
                    "lesson_id", "teacher_id") 
                    VALUES ${teachersAndLessonsIdList};
                `)

        return lessonsIdList;
    }
}

type LessonReturnModel ={
    id : number
}
