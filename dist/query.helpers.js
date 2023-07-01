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
exports.queryHelpers = void 0;
exports.queryHelpers = {
    date(date) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!date)
                return undefined;
            return date.trim();
        });
    },
    status(status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!status)
                return undefined;
            return +status;
        });
    },
    teacherIds(teacherIds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!teacherIds)
                return undefined;
            return teacherIds.trim();
        });
    },
    studentsCount(studentsCount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!studentsCount)
                return undefined;
            return studentsCount.trim();
        });
    },
    page(page) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!page)
                return 1;
            return +page;
        });
    },
    lessonsPerPage(lessonsPerPage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!lessonsPerPage)
                return 1;
            return +lessonsPerPage;
        });
    },
};
