import {LessonViewModel} from "./education.models";
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
                     lessonsPerPage : number) : Promise <LessonViewModel>{
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
}
