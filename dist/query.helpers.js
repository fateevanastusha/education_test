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
                return [null, null];
            const dataList = date.trim().split(',');
            if (!dataList[1])
                return [dataList[0], ''];
            return dataList;
        });
    },
    status(status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!status)
                return null;
            return status;
        });
    },
    teacherIds(teacherIds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!teacherIds)
                return null;
            return teacherIds.trim();
        });
    },
    studentsCount(studentsCount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!studentsCount)
                return [null, null];
            const countList = studentsCount.trim().split(',');
            if (!countList[1])
                return [countList[0], null];
            return countList;
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
                return 10;
            return +lessonsPerPage;
        });
    },
};
