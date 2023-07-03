import {EducationRepository} from "./education.repository";
import {EducationService} from "./education.service";

export const educationRepository = new EducationRepository()
export const educationService = new EducationService(educationRepository)