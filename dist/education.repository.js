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
    getLessons(date_1, date_2, status, teacherIds, studentsCount_1, studentsCount_2, page, lessonsPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const skipSize = lessonsPerPage * (page - 1);
            console.log(date_1, date_2, status, teacherIds, studentsCount_1, studentsCount_2, page, lessonsPerPage);
            const lessons = yield index_1.pool.query(`
        SELECT 
                l."id", l."date", l."title", l."status", 
                COUNT(ls."student_id") AS "visitCount",
                array_agg(DISTINCT ls."student_id") AS "student_ids",
                array_agg(DISTINCT lt."teacher_id") AS "teacher_ids"
                    FROM public."lessons" l
                    LEFT JOIN public."lesson_students" ls ON l."id" = ls."lesson_id" AND ls."visit" = true
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
                        (${studentsCount_1} IS NOT NULL AND ${studentsCount_2} IS NULL AND COUNT(ls."student_id") = ${studentsCount_1})
                        OR
                        (${studentsCount_1} IS NOT NULL AND ${studentsCount_2} IS NOT NULL AND COUNT(ls."student_id") BETWEEN ${studentsCount_1} AND ${studentsCount_2}))
                        AND
                        (CASE
                        WHEN ${teacherIds} IS NULL THEN true
                        ELSE ARRAY(SELECT unnest(array_agg(DISTINCT lt."teacher_id")::integer[])) && ARRAY[${teacherIds}]::integer[]
                        END)
                    ORDER BY l."date"
                    OFFSET ${skipSize} LIMIT ${lessonsPerPage}
        `);
            return lessons.rows;
        });
    }
}
exports.EducationRepository = EducationRepository;
