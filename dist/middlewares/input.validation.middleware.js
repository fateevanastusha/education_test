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
exports.lessonsPerPageValidation = exports.pageValidation = exports.studentsCountValidation = exports.teacherIdsValidation = exports.statusValidation = exports.dateValidation = exports.checkForLessonsPerPage = exports.checkForPage = exports.checkStudentsCount = exports.checkForTeacherIds = exports.checkForStatus = exports.checkForDate = exports.inputValidationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const inputValidationMiddleware = (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(400).send({
            errorsMessages: error.array({ onlyFirstError: true }).map(e => {
                return {
                    message: e.msg,
                    field: e.type
                };
            })
        });
    }
    return next();
};
exports.inputValidationMiddleware = inputValidationMiddleware;
const checkForDate = (date, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!date)
        return;
});
exports.checkForDate = checkForDate;
const checkForStatus = (status, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!status)
        req.skipInputValidation = true;
    return;
});
exports.checkForStatus = checkForStatus;
const checkForTeacherIds = (teacherIds, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!teacherIds)
        req.skipInputValidation = true;
    return;
});
exports.checkForTeacherIds = checkForTeacherIds;
const checkStudentsCount = (studentsCount, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!studentsCount)
        req.skipInputValidation = true;
    return;
});
exports.checkStudentsCount = checkStudentsCount;
const checkForPage = (lessonsPerPage, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!lessonsPerPage)
        req.skipInputValidation = true;
    return;
});
exports.checkForPage = checkForPage;
const checkForLessonsPerPage = (lessonsPerPage, { req }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!lessonsPerPage)
        req.skipInputValidation = true;
    return;
});
exports.checkForLessonsPerPage = checkForLessonsPerPage;
exports.dateValidation = (0, express_validator_1.param)('date').custom(exports.checkForDate).matches(/^(\d{4}-\d{2}-\d{2})(,\d{4}-\d{2}-\d{2})?$/);
exports.statusValidation = (0, express_validator_1.param)('status').custom(exports.checkForStatus).toInt().isInt({ min: 0, max: 1 });
exports.teacherIdsValidation = (0, express_validator_1.param)('teacherIds').custom(exports.checkForTeacherIds).trim().matches(/^(\d+(\.\d+)?(,\s*\d+(\.\d+)?)*|\d+(\.\d+)?|\d+)$/);
exports.studentsCountValidation = (0, express_validator_1.param)('studentsCount').custom(exports.checkStudentsCount).trim().matches(/^(\d+(\.\d+)?(,\d+(\.\d+)?)?)$/);
exports.pageValidation = (0, express_validator_1.param)('page').custom(exports.checkForPage).toInt().isInt({ min: 1 });
exports.lessonsPerPageValidation = (0, express_validator_1.param)('lessonsPerPage').custom(exports.checkForLessonsPerPage).toInt().isInt({ min: 1 });
