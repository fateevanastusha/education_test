"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonsCountValidation = exports.lastDateValidation = exports.firstDateValidation = exports.daysValidation = exports.titleValidation = exports.teachersIdsValidation = exports.lessonsPerPageValidation = exports.pageValidation = exports.studentsCountValidation = exports.teacherIdsValidation = exports.statusValidation = exports.dateValidation = exports.checkArrayForNumbers = exports.inputValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const inputValidationMiddleware = (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(400).send({
            errorsMessages: error.array({ onlyFirstError: true })
        });
    }
    return next();
};
exports.inputValidationMiddleware = inputValidationMiddleware;
const checkArrayForNumbers = (array) => __awaiter(void 0, void 0, void 0, function* () {
    const status = array.every((a) => typeof a === 'number');
    if (!status)
        throw new Error('array must contain numbers');
    return true;
});
exports.checkArrayForNumbers = checkArrayForNumbers;
//query check
exports.dateValidation = (0, express_validator_1.query)('date').optional().isString().withMessage('must be string').matches(/^(\d{4}-\d{2}-\d{2})(,\d{4}-\d{2}-\d{2})?$/).withMessage('must be date');
exports.statusValidation = (0, express_validator_1.query)('status').optional().toInt().isInt({ min: 0, max: 1 });
exports.teacherIdsValidation = (0, express_validator_1.query)('teacherIds').optional().trim().matches(/^(\d+(\.\d+)?(,\s*\d+(\.\d+)?)*|\d+(\.\d+)?|\d+)$/);
exports.studentsCountValidation = (0, express_validator_1.query)('studentsCount').optional().trim().matches(/^(\d+(\.\d+)?(,\d+(\.\d+)?)?)$/);
exports.pageValidation = (0, express_validator_1.query)('page').optional().toInt().isInt({ min: 1 });
exports.lessonsPerPageValidation = (0, express_validator_1.query)('lessonsPerPage').optional().toInt().isInt({ min: 1 });
exports.teachersIdsValidation = (0, express_validator_1.body)('teacherIds').isArray().custom(exports.checkArrayForNumbers);
exports.titleValidation = (0, express_validator_1.body)('title').isString().withMessage('must be string').isLength({ max: 100 });
exports.daysValidation = (0, express_validator_1.body)('days').isArray().custom(exports.checkArrayForNumbers);
exports.firstDateValidation = (0, express_validator_1.body)('firstDate').isString().withMessage('must be string').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('must be date');
exports.lastDateValidation = (0, express_validator_1.body)('lastDate').optional().isString().withMessage('must be string').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('must be date');
exports.lessonsCountValidation = (0, express_validator_1.body)('lessonsCount').optional().isInt({ min: 1, max: 300 });
