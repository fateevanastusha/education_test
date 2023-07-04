import {CreateLessonModel, LessonViewModel} from "./education.models";
import {EducationRepository} from "./education.repository";
import {lastDateValidation} from "./middlewares/input.validation.middleware";

export class EducationService {
    constructor(protected educationRepository : EducationRepository) {
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
            const lastDate = new Date(firstDate)
            lastDate.setFullYear(lastDate.getFullYear() + 1)
            let currentDate = new Date(firstDate);
            let lessonsCount = 0;

            while (lessonsCount < maxLessons && currentDate < lastDate && lessonsCount < lessons ) {

                if (days.includes(currentDate.getDay())) {
                    dates.push((new Date(currentDate)).toISOString().split('T')[0]);
                    lessonsCount++;
                }
                currentDate.setDate(currentDate.getDate() + 1);

            }

            return dates;
        }

        const dateList = generateDates(createLessonModel.firstDate, createLessonModel.days, createLessonModel.lessonsCount)
        const mappedDateList = dateList.map(date => `('${date}', '${createLessonModel.title}')`).join(', ')
        return await this.educationRepository.createLesson(createLessonModel.title, dateList, mappedDateList, createLessonModel.teacherIds)
    }
    async createLessonsWithLastDate(createLessonModel: CreateLessonModel): Promise<number[]> {

        function generateDates(firstDate: string, days: number[], last: string): string[] {
            const dates: string[] = [];
            const maxLessons = 300;
            let lastDate = new Date(last);
            let currentDate = new Date(firstDate);
            let lessonsCount = 0;

            while (lessonsCount < maxLessons && currentDate < lastDate) {

                if (days.includes(currentDate.getDay())) {
                    let dateWithoutTime = (new Date(currentDate)).toISOString().split('T')[0];
                    dates.push(dateWithoutTime);
                    lessonsCount++;
                }

                currentDate.setDate(currentDate.getDate() + 1);
            }

            return dates;

        }

        const dateList = generateDates(createLessonModel.firstDate, createLessonModel.days, createLessonModel.lastDate);
        const mappedDateList = dateList.map(date => `('${date}', '${createLessonModel.title}')`).join(', ')
        return await this.educationRepository.createLesson(createLessonModel.title, dateList, mappedDateList, createLessonModel.teacherIds)
    }
}
