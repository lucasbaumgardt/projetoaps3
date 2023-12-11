"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBuffer = void 0;
const class_validator_1 = require("class-validator");
const validator_constraint_1 = require("./validator.constraint");
function IsBuffer(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isBuffer',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: validator_constraint_1.IsBufferConstraint,
        });
    };
}
exports.IsBuffer = IsBuffer;
//# sourceMappingURL=is.buffer.js.map