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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const convertHoursToMin_1 = require("./utils/convertHoursToMin");
const convertMinToHours_1 = require("./utils/convertMinToHours");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const prisma = new client_1.PrismaClient();
app.get('/games', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });
    response.json(games);
}));
app.post('/games/:id/ads', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const ad = {
        name: request.body.name,
        hourStart: (0, convertHoursToMin_1.convertHoursToMin)(request.body.hourStart),
        hourEnd: (0, convertHoursToMin_1.convertHoursToMin)(request.body.hourEnd),
        discord: request.body.discord,
        gameId: id,
        weekDays: request.body.weekDays.join(','),
        useVoiceChannel: request.body.useVoiceChannel,
        yearsPlaying: request.body.yearsPlaying
    };
    const adCreated = yield prisma.ad.create({
        data: ad
    });
    response.status(201).json(adCreated);
}));
app.get('/games/:id/ads', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const ads = yield prisma.ad.findMany({
        select: {
            id: true,
            hourEnd: true,
            hourStart: true,
            name: true,
            useVoiceChannel: true,
            weekDays: true,
            yearsPlaying: true,
        },
        where: {
            gameId: id
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    const formatedAds = ads.map(ad => {
        return Object.assign(Object.assign({}, ad), { weekDays: ad.weekDays.split(',').map(Number), hourEnd: (0, convertMinToHours_1.convertMinToHours)(ad.hourEnd), hourStart: (0, convertMinToHours_1.convertMinToHours)(ad.hourStart) });
    });
    response.json(formatedAds);
}));
app.get('/ads/:id/discord', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const ad = yield prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: id
        }
    });
    response.json({
        discord: ad.discord
    });
}));
app.listen(3333, () => {
    console.log("Server stated on port 3333");
});
