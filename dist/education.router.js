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
exports.educationRouter = void 0;
const express_1 = require("express");
const input_validation_middleware_1 = require("./middlewares/input.validation.middleware");
const query_helpers_1 = require("./middlewares/query.helpers");
const composition_root_1 = require("./composition.root");
exports.educationRouter = (0, express_1.Router)();
exports.educationRouter.get('/', input_validation_middleware_1.dateValidation, input_validation_middleware_1.statusValidation, input_validation_middleware_1.teacherIdsValidation, input_validation_middleware_1.studentsCountValidation, input_validation_middleware_1.pageValidation, input_validation_middleware_1.lessonsPerPageValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = yield query_helpers_1.queryHelpers.date(req.query.date);
    const status = yield query_helpers_1.queryHelpers.status(req.query.status);
    const teacherIds = yield query_helpers_1.queryHelpers.teacherIds(req.query.teacherIds);
    const studentsCount = yield query_helpers_1.queryHelpers.studentsCount(req.query.studentsCount);
    const page = yield query_helpers_1.queryHelpers.page(req.query.page);
    const lessonsPerPage = yield query_helpers_1.queryHelpers.lessonsPerPage(req.query.lessonsPerPage);
    const result = yield composition_root_1.educationService.getLessons(date[0], date[1], status, teacherIds, studentsCount[0], studentsCount[1], page, lessonsPerPage);
    res.send(result).status(204);
}));
exports.educationRouter.post('/lessons', input_validation_middleware_1.teachersIdsValidation, input_validation_middleware_1.titleValidation, input_validation_middleware_1.daysValidation, input_validation_middleware_1.firstDateValidation, input_validation_middleware_1.lessonsCountValidation, input_validation_middleware_1.lastDateValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createModel = req.body;
    if (!createModel.lessonsCount && !createModel.lastDate)
        res.send(400);
    let idList;
    if (createModel.lessonsCount) {
        idList = yield composition_root_1.educationService.createLessonsWithLessonsCount(createModel);
    }
    else {
        idList = yield composition_root_1.educationService.createLessonsWithLastDate(createModel);
    }
    res.send(idList).status(200);
}));
