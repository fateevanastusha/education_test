import { NextFunction, Response, Request } from "express";
import {body, CustomValidator, query, validationResult} from 'express-validator';

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
    return next()
}

export const checkArrayForNumbers : CustomValidator = async array => {
    const status = array.every((a : number) => typeof a === 'number');
    if (!status) throw new Error('array must contain numbers');
    return true;
}

//query check

export const dateValidation = query('date').optional().isString().matches(/^(\d{4}-\d{2}-\d{2})(,\d{4}-\d{2}-\d{2})?$/);
export const statusValidation = query('status').optional().toInt().isInt({ min: 0, max : 1 });
export const teacherIdsValidation = query('teacherIds').optional().trim().matches(/^(\d+(\.\d+)?(,\s*\d+(\.\d+)?)*|\d+(\.\d+)?|\d+)$/);
export const studentsCountValidation = query('studentsCount').optional().trim().matches(/^(\d+(\.\d+)?(,\d+(\.\d+)?)?)$/);
export const pageValidation = query('page').optional().toInt().isInt({ min: 1 });
export const lessonsPerPageValidation = query('lessonsPerPage').optional().toInt().isInt({ min: 1 });

export const teachersIdsValidation = body('teacherIds').isArray().custom(checkArrayForNumbers);
export const titleValidation = body('title').isString().isLength({max : 100});
export const daysValidation = body('days').isArray().custom(checkArrayForNumbers);
export const firstDateValidation = body('firstDate').isString().matches(/^\d{4}-\d{2}-\d{2}$/);
export const lastDateValidation = body('lastDate').optional().isString().matches(/^\d{4}-\d{2}-\d{2}$/);
export const lessonsCountValidation = body('lessonsCount').optional().isInt({min : 1, max : 300});
