import {CreateLessonModel, LessonViewModel} from "./education.models";
import {EducationRepository} from "./education.repository";

export class EducationService {
    educationRepository : EducationRepository
    constructor() {
     this.educationRepository = new EducationRepository()
    }
    async getLessons(date_1 : string | null,
                     date_2 : string | null,
                     status : string | null,
                     teacherIds : string | null,
                     studentsCount_1 : string | null,
                     studentsCount_2 : string | null,
                     page : number,
                     lessonsPerPage : number) : Promise <LessonViewModel[]>{
        return await this.educationRepository.getLessons(
            date_1,
            date_2,
            status,
            teacherIds,
            studentsCount_1,
            studentsCount_2,
            page,
            lessonsPerPage
        )
    }
    async createLessonsWithLessonsCount(createLessonModel : CreateLessonModel) : Promise<number[]>{
        function generateDates(firstDate: string, days: number[], lessons : number): string[] {
            const dates: string[] = [];
            const maxLessons = 300;
            const oneYear = 365;
            let currentDate = new Date(firstDate);
            let lessonsCount = 0;

            while (lessonsCount < maxLessons && lessonsCount < oneYear && lessonsCount < lessons ) {
                if (days.includes(currentDate.getDay())) {
                    dates.push((new Date(currentDate)).toISOString().split('T')[0]);
                    lessonsCount++;
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
            return dates;
        }
        const dateList = generateDates(createLessonModel.firstDate, createLessonModel.days, createLessonModel.lessonsCount)
        return await this.educationRepository.createLesson(createLessonModel.title, dateList, createLessonModel.teacherIds)
    }
    async createLessonsWithLastDate(createLessonModel: CreateLessonModel): Promise<number[]> {
        function generateDates(firstDate: string, days: number[], last: string): string[] {
            const dates: string[] = [];
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
        return await this.educationRepository.createLesson(createLessonModel.title, dateList, createLessonModel.teacherIds)
    }
}
