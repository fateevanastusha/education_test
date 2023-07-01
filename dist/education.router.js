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
const input_validation_middleware_1 = require("./middlewares/input.validation.middleware");
const query_helpers_1 = require("./query.helpers");
const index_1 = require("./index");
const education_service_1 = require("./education.service");
const educationService = new education_service_1.EducationService();
index_1.app.get('/', input_validation_middleware_1.dateValidation, input_validation_middleware_1.statusValidation, input_validation_middleware_1.teacherIdsValidation, input_validation_middleware_1.studentsCountValidation, input_validation_middleware_1.pageValidation, input_validation_middleware_1.lessonsPerPageValidation, input_validation_middleware_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = yield query_helpers_1.queryHelpers.date(req.params.date);
    const status = yield query_helpers_1.queryHelpers.status(req.params.status);
    const teacherIds = yield query_helpers_1.queryHelpers.teacherIds(req.params.teacherIds);
    const studentsCount = yield query_helpers_1.queryHelpers.studentsCount(req.params.studentsCount);
    const page = yield query_helpers_1.queryHelpers.page(req.params.page);
    const lessonsPerPage = yield query_helpers_1.queryHelpers.lessonsPerPage(req.params.lessonsPerPage);
    const result = yield educationService.getLessons(date, status, teacherIds, studentsCount, page, lessonsPerPage);
    res.send(result).status(204);
}));
