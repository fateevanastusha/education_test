"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EducationRepository = void 0;
const index_1 = require("./index");
class EducationRepository {
    getLessons(date, status, teacherIds, studentsCount, page, lessonsPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const skipSize = lessonsPerPage * (page - 1);
            const lessons = yield index_1.pool.query(`
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
        `);
            return lessons.rows;
        });
    }
}
exports.EducationRepository = EducationRepository;
