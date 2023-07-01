import {LessonViewModel} from "./education.models";
import {EducationRepository} from "./education.repository";

export class EducationService {
    educationRepository : EducationRepository
    constructor() {
     this.educationRepository = new EducationRepository()
    }
    async getLessons(date : string | undefined, status : number | undefined, teacherIds : string | undefined, studentsCount : string | undefined, page : number, lessonsPerPage : number) : Promise <LessonViewModel>{
        return await this.educationRepository.getLessons(date,status,teacherIds,studentsCount,page,lessonsPerPage)
    }
}
