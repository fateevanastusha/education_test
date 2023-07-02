import {pool} from "./index";

export class EducationRepository {
    async getLessons(date : string | undefined, status : '1' | '0' | null, teacherIds : string | undefined, studentsCount : string | undefined, page : number, lessonsPerPage : number){
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
            l."date" BETWEEN '2019-06-17' AND '2023-07-02' AND 
            "status" IN (0,1)
        GROUP BY l."id", l."date", l."title", l."status"
        HAVING 
            COUNT(ls."student_id") BETWEEN 0 AND 10 AND 
        ARRAY(SELECT unnest(array_agg(DISTINCT lt."teacher_id"))) && ARRAY[1, 2, 3]
        ORDER BY l."date"
        OFFSET 0 LIMIT 10
        `)
        return lessons.rows
    }
}