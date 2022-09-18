"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertHoursToMin = void 0;
const convertHoursToMin = (time) => {
    const [hour, minutes] = time.split(':').map(Number);
    const timeInMinutes = hour * 60 + minutes;
    return timeInMinutes;
};
exports.convertHoursToMin = convertHoursToMin;
