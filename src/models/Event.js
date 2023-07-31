"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var EventSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    is_virtual: { type: Boolean, required: true },
    location: { type: String },
    startDatetime: { type: Date, required: true },
    endDatetime: { type: Date, required: true },
    price: { type: Number, required: true },
    tags: [{ type: String }],
    creatorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    managedBy: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    imgUrl: { type: String },
    description: { type: String, required: true },
});
exports.default = mongoose_1.default.model('Event', EventSchema);
