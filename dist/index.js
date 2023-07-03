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
exports.pool = exports.app = void 0;
const education_service_1 = require("./education.service");
const input_validation_middleware_1 = require("./middlewares/input.validation.middleware");
const query_helpers_1 = require("./middlewares/query.helpers");
const express = require('express');
const bodyParser = require('body-parser');
exports.app = express();
exports.app.use(bodyParser());
const port = 3000;
const Pool = require('pg').Pool;
exports.pool = new Pool({
    user: 'nodejs',
    host: 'localhost',
    database: 'EducationTestDB',
    password: 'nodejs',
    port: 5432
});
const educationService = new education_service_1.EducationService();
exports.app.get('/', input_validation_middleware_1.dateValidation, input_validation_middleware_1.statusValidation, input_validation_middleware_1.teacherIdsValidation, input_validation_middleware_1.studentsCountValidation, input_validation_middleware_1.pageValidation, input_validation_middleware_1.lessonsPerPageValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = yield query_helpers_1.queryHelpers.date(req.query.date);
    const status = yield query_helpers_1.queryHelpers.status(req.query.status);
    const teacherIds = yield query_helpers_1.queryHelpers.teacherIds(req.query.teacherIds);
    const studentsCount = yield query_helpers_1.queryHelpers.studentsCount(req.query.studentsCount);
    const page = yield query_helpers_1.queryHelpers.page(req.query.page);
    const lessonsPerPage = yield query_helpers_1.queryHelpers.lessonsPerPage(req.query.lessonsPerPage);
    const result = yield educationService.getLessons(date[0], date[1], status, teacherIds, studentsCount[0], studentsCount[1], page, lessonsPerPage);
    res.send(result).status(204);
}));
exports.app.post('/lessons', input_validation_middleware_1.teachersIdsValidation, input_validation_middleware_1.titleValidation, input_validation_middleware_1.daysValidation, input_validation_middleware_1.firstDateValidation, input_validation_middleware_1.lessonsCountValidation, input_validation_middleware_1.lastDateValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createModel = req.body;
    if (!createModel.lessonsCount && !createModel.lastDate)
        res.send(400);
    let idList;
    if (createModel.lessonsCount) {
        idList = yield educationService.createLessonsWithLessonsCount(createModel);
    }
    else {
        idList = yield educationService.createLessonsWithLastDate(createModel);
    }
    res.send(idList).status(200);
}));
exports.app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Example app listening on port ${port}`);
}));
