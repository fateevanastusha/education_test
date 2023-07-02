import {pool} from "./index";

export class EducationRepository {
    async getLessons(date_1 : string | null,
                     date_2 : string | null,
                     status : '1' | '0' | null,
                     teacherIds : number[] | null,
                     studentsCount_1 : string | null,
                     studentsCount_2 : string | null,
                     page : number,
                     lessonsPerPage : number){
        const skipSize: number = lessonsPerPage * (page - 1)
        const lessons = await pool.query(`
            SELECT 
                l."id", l."date", l."title", l."status", 
                COUNT(ls."student_id") AS "visitCount",
                array_agg(DISTINCT ls."student_id") AS "student_ids",
                array_agg(DISTINCT lt."teacher_id") AS "teacher_ids"
                    FROM public."lessons" l
                    LEFT JOIN public."lesson_students" ls ON l."id" = ls."lesson_id" AND ls."visit" = true
                    LEFT JOIN public."lesson_teachers" lt ON l."id" = lt."lesson_id"
                    WHERE 
                         (('${date_1}' IS NULL AND '${date_2}' IS NULL) 
                          OR 
                          ('${date_1}' IS NOT NULL AND '${date_2}' IS NULL AND l."date" = '${date_1}') 
                          OR 
                          ('${date_1}' IS NOT NULL AND '${date_2}' IS NOT NULL AND l."date" BETWEEN '${date_1}' AND '${date_2}')) 
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
                        (${studentsCount_1} IS NOT NULL AND ${studentsCount_2} IS NULL AND COUNT(ls."student_id") = ${studentsCount_1})
                        OR
                        (${studentsCount_1} IS NOT NULL AND ${studentsCount_2} IS NOT NULL AND COUNT(ls."student_id") BETWEEN ${studentsCount_1} AND ${studentsCount_2}))
                        AND
                        ((${teacherIds} IS NULL) 
                        OR
                        (ARRAY${teacherIds} IS NOT NULL AND ARRAY(SELECT unnest(array_agg(DISTINCT lt."teacher_id"))) && ARRAY${teacherIds}))
                    ORDER BY l."date"
                    OFFSET ${skipSize} LIMIT ${lessonsPerPage}
        `)
        return lessons.rows
    }
}