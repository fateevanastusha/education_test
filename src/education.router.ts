import {Request, Response, Router} from "express";
import {
    dateValidation,
    daysValidation,
    firstDateValidation,
    inputValidationMiddleware, lastDateValidation, lessonsCountValidation,
    lessonsPerPageValidation,
    pageValidation,
    statusValidation,
    studentsCountValidation,
    teacherIdsValidation,
    teachersIdsValidation,
    titleValidation
} from "./middlewares/input.validation.middleware";
import {queryHelpers} from "./middlewares/query.helpers";
import {CreateLessonModel, LessonViewModel} from "./education.models";
import {educationService} from "./composition.root";

export const educationRouter = Router();

educationRouter.get('/',
    dateValidation,
    statusValidation,
    teacherIdsValidation,
    studentsCountValidation,
    pageValidation,
    lessonsPerPageValidation,
    inputValidationMiddleware,
    async (req : Request, res : Response) => {
        const [firstDate, lastDate] = await queryHelpers.date(<string>req.query.date);
        const status = await queryHelpers.status(<string>req.query.status);
        const teacherIds = await queryHelpers.teacherIds(<string>req.query.teacherIds);
        const [studentsCountFirst, studentCountLast] = await queryHelpers.studentsCount(<string>req.query.studentsCount);
        const page = await queryHelpers.page(<string>req.query.page);
        const lessonsPerPage = await queryHelpers.lessonsPerPage(<string>req.query.lessonsPerPage);

        const result : LessonViewModel[] = await educationService.getLessons(
            firstDate,
            lastDate,
            status,
            teacherIds,
            studentsCountFirst,
            studentCountLast,
            page,
            lessonsPerPage
        )

        res.send(result).status(204)
    })

educationRouter.post('/lessons',
    teachersIdsValidation,
    titleValidation,
    daysValidation,
    firstDateValidation,
    lessonsCountValidation,
    lastDateValidation,
    inputValidationMiddleware,
    async (req : Request, res : Response) => {

        const createModel : CreateLessonModel = req.body

        if (!createModel.lessonsCount && !createModel.lastDate) {
            res.send(400);
            return;
        }
        let idList : number[]
        if(createModel.lessonsCount){
            idList = await educationService.createLessonsWithLessonsCount(createModel)
        } else {
            idList = await educationService.createLessonsWithLastDate(createModel)
        }

        res.send(idList).status(200);
    })