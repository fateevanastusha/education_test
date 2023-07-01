import { NextFunction, Response, Request } from "express";
import {CustomValidator, param, validationResult} from 'express-validator';

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).send({
            errorsMessages: error.array({onlyFirstError: true}).map(e => {
                return {
                    message: e.msg,
                    field: e.type
                }
            })
        })
    }
    next()
}


export const checkForDate : CustomValidator = async (date, { req }) => {
    if (!date) return;
}
export const checkForStatus : CustomValidator = async (status, { req }) => {
    if (!status) return;
}
export const checkForTeacherIds : CustomValidator = async (teacherIds, { req }) => {
    if (!teacherIds) return;
}
export const checkStudentsCount : CustomValidator = async (studentsCount, { req }) => {
    if (!studentsCount) return;
}
export const checkForPage : CustomValidator = async (lessonsPerPage, { req }) => {
    if (!lessonsPerPage) return;
}
export const checkForLessonsPerPage : CustomValidator = async (lessonsPerPage, { req }) => {
    if (!lessonsPerPage) return;
}


export const dateValidation = param('date').custom(checkForDate).matches(/^(\d{4}-\d{2}-\d{2})(,\d{4}-\d{2}-\d{2})?$/);
export const statusValidation = param('status').custom(checkForStatus).toInt().isInt({ min: 0, max : 1 });
export const teacherIdsValidation = param('teacherIds').custom(checkForTeacherIds).trim().matches(/^(\d+(\.\d+)?(,\s*\d+(\.\d+)?)*|\d+(\.\d+)?|\d+)$/);
export const studentsCountValidation = param('studentsCount').custom(checkStudentsCount).trim().matches(/^(\d+(\.\d+)?(,\d+(\.\d+)?)?)$/);
export const pageValidation = param('page').custom(checkForPage).toInt().isInt({ min: 1 });
export const lessonsPerPageValidation = param('lessonsPerPage').custom(checkForLessonsPerPage).toInt().isInt({ min: 1 });