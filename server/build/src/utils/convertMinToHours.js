"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMinToHours = void 0;
//Function to converte minutes to hours
const convertMinToHours = (time) => {
    const hour = Math.floor(time / 60);
    const minutes = time % 60;
    return `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};
exports.convertMinToHours = convertMinToHours;
