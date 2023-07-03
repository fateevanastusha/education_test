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
exports.EducationService = void 0;
const education_repository_1 = require("./education.repository");
class EducationService {
    constructor() {
        this.educationRepository = new education_repository_1.EducationRepository();
    }
    getLessons(date_1, date_2, status, teacherIds, studentsCount_1, studentsCount_2, page, lessonsPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.educationRepository.getLessons(date_1, date_2, status, teacherIds, studentsCount_1, studentsCount_2, page, lessonsPerPage);
        });
    }
    createLessonsWithLessonsCount(createLessonModel) {
        return __awaiter(this, void 0, void 0, function* () {
            function generateDates(firstDate, days, lessons) {
                const dates = [];
                const maxLessons = 300;
                const oneYear = 365;
                let currentDate = new Date(firstDate);
                let lessonsCount = 0;
                while (lessonsCount < maxLessons && lessonsCount < oneYear && lessonsCount < lessons) {
                    if (days.includes(currentDate.getDay())) {
                        dates.push((new Date(currentDate)).toISOString().split('T')[0]);
                        lessonsCount++;
                    }
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                return dates;
            }
            const dateList = generateDates(createLessonModel.firstDate, createLessonModel.days, createLessonModel.lessonsCount);
            return yield this.educationRepository.createLesson(createLessonModel.title, dateList, createLessonModel.teacherIds);
        });
    }
    createLessonsWithLastDate(createLessonModel) {
        return __awaiter(this, void 0, void 0, function* () {
            function generateDates(firstDate, days, last) {
                const dates = [];
                const maxLessons = 300;
                const oneYear = 365;
                let lastDate = new Date(last);
                let currentDate = new Date(firstDate);
                let lessonsCount = 0;
                while (lessonsCount < maxLessons && lessonsCount < oneYear && currentDate < lastDate) {
                    if (days.includes(currentDate.getDay())) {
                        dates.push((new Date(currentDate)).toISOString().split('T')[0]);
                        lessonsCount++;
                    }
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                return dates;
            }
            const dateList = generateDates(createLessonModel.firstDate, createLessonModel.days, createLessonModel.lastDate);
            return yield this.educationRepository.createLesson(createLessonModel.title, dateList, createLessonModel.teacherIds);
        });
    }
}
exports.EducationService = EducationService;
