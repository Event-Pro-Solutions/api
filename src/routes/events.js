"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var EventController_1 = require("../controllers/EventController");
var router = (0, express_1.Router)();
router.get('/', EventController_1.default.getAllEvents);
router.get('/:id', EventController_1.default.getEventById);
exports.default = router;
