import {pool} from "./index";

export class EducationRepository {
    async getLessons(date : string | undefined, status : number | undefined, teacherIds : string | undefined, studentsCount : string | undefined, page : number, lessonsPerPage : number){
        const skipSize: number = lessonsPerPage * (page - 1)
        const lessons = await pool.query(`
        SELECT l.id, l.title, l.status, l.date,
            COUNT(ls.visit) AS "visitCount",
            array_agg(DISTINCT s.id) AS students,
            array_agg(DISTINCT t.id) AS teachers
                FROM lessons l
                LEFT JOIN lesson_students ls ON l.id = ls.lesson_id
                LEFT JOIN students s ON ls.student_id = s.id
                LEFT JOIN lesson_teachers lt ON l.id = lt.lesson_id
                LEFT JOIN teachers t ON lt.teacher_id = t.id
                WHERE
                    ($1::date IS NULL OR l.date = $1::date) -- Фильтр по дате
                    AND ($2 IS NULL OR l.status = $2) -- Фильтр по статусу
                    AND ($3::int[] IS NULL OR lt.teacher_id = ANY($3::int[])) -- Фильтр по идентификаторам учителей
                    AND (
                        ($4 IS NULL AND ($5 IS NULL OR $6 IS NULL)) OR -- Не указано количество записанных учеников
                        (
                            ($4 IS NOT NULL AND (SELECT COUNT(*) FROM lesson_students WHERE lesson_id = l.id) = $4) OR -- Точное количество записанных учеников
                            ($5 IS NOT NULL AND $6 IS NOT NULL AND (SELECT COUNT(*) FROM lesson_students WHERE lesson_id = l.id) BETWEEN $5 AND $6) -- Диапазон количества записанных учеников
                        )
                    )
                GROUP BY l.id
                ORDER BY l.date ASC
                OFFSET $7 LIMIT $8;
        `)
        return lessons.rows
    }
}