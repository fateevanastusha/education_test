import {EducationService} from "./education.service";
import {
    dateValidation, inputValidationMiddleware, lessonsPerPageValidation, pageValidation,
    statusValidation,
    studentsCountValidation,
    teacherIdsValidation
} from "./middlewares/input.validation.middleware";
import {Request, Response} from "express";
import {queryHelpers} from "./query.helpers";

const express = require('express')
const bodyParser = require('body-parser')
export const app = express()
app.use(bodyParser())
const port = 3000

const Pool = require('pg').Pool
export const pool = new Pool({
    user: 'nodejs',
    host: 'localhost',
    database: 'EducationTestDB',
    password: 'nodejs',
    port: 5432
})

const educationService = new EducationService()

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
        const result = await educationService.getLessons(date,status,teacherIds,studentsCount,page,lessonsPerPage)
        res.send(result).status(204)
    })

app.listen(port, async () => {
    const result = await pool.query(`SELECT * FROM public.teachers;`)
    console.log(result.rows)
    console.log(`Example app listening on port ${port}`)
})