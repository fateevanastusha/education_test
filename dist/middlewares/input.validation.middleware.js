"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonsPerPageValidation = exports.pageValidation = exports.studentsCountValidation = exports.teacherIdsValidation = exports.statusValidation = exports.dateValidation = exports.inputValidationMiddleware = void 0;
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
exports.dateValidation = (0, express_validator_1.query)('date').optional().matches(/^(\d{4}-\d{2}-\d{2})(,\d{4}-\d{2}-\d{2})?$/);
exports.statusValidation = (0, express_validator_1.query)('status').optional().toInt().isInt({ min: 0, max: 1 });
exports.teacherIdsValidation = (0, express_validator_1.query)('teacherIds').optional().trim().matches(/^(\d+(\.\d+)?(,\s*\d+(\.\d+)?)*|\d+(\.\d+)?|\d+)$/);
exports.studentsCountValidation = (0, express_validator_1.query)('studentsCount').optional().trim().matches(/^(\d+(\.\d+)?(,\d+(\.\d+)?)?)$/);
exports.pageValidation = (0, express_validator_1.query)('page').optional().toInt().isInt({ min: 1 });
exports.lessonsPerPageValidation = (0, express_validator_1.query)('lessonsPerPage').optional().toInt().isInt({ min: 1 });
