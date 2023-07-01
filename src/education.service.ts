import {LessonViewModel} from "./education.models";

export class EducationService {
    async getLessons(date : string | undefined, status : 0 | 1 | undefined, teacherIds : string | undefined, studentsCount : string | undefined, page : number, lessonsPerPage : number) : Promise <LessonViewModel>{

    }
}