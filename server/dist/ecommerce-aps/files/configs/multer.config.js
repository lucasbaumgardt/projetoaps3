"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = require("multer");
const path = require("path");
const uuid_1 = require("uuid");
const multerConfig = {
    storage: (0, multer_1.diskStorage)({
        destination: './upload/files',
        filename: (req, file, cb) => {
            const fileName = path.parse(file.originalname).name.replace(/\s/g, '') + '-' + (0, uuid_1.v4)();
            const extension = path.parse(file.originalname).ext;
            cb(null, `${fileName}${extension}`);
        },
    }),
};
exports.default = multerConfig;
//# sourceMappingURL=multer.config.js.map