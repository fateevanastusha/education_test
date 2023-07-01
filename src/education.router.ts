import {
    dateValidation, inputValidationMiddleware, lessonsPerPageValidation, pageValidation,
    statusValidation,
    studentsCountValidation,
    teacherIdsValidation
} from "./middlewares/input.validation.middleware";
import {Request, Response} from "express";
import {queryHelpers} from "./query.helpers";

app.get('/',
    dateValidation,
    statusValidation,
    teacherIdsValidation,
    studentsCountValidation,
    pageValidation,
    lessonsPerPageValidation,
    inputValidationMiddleware,
    async (req : Request, res : Response) => {
        const date = await queryHelpers.date(req.params.date)
        const status = await queryHelpers.status(req.params.status)
        const teacherIds = await queryHelpers.teacherIds(req.params.teacherIds)
        const studentsCount = await queryHelpers.studentsCount(req.params.studentsCount)
        const page = await queryHelpers.page(req.params.page)
        const lessonsPerPage = await queryHelpers.lessonsPerPage(req.params.lessonsPerPage)
        res.send('Hello World!')
    })