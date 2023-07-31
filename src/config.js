"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
var envsafe_1 = require("envsafe");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
exports.env = (0, envsafe_1.envsafe)({
    DB_STRING: (0, envsafe_1.str)(),
    PORT: (0, envsafe_1.port)(),
});
