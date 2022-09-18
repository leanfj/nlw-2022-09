import express from 'express';
import cors from 'cors'
import { PrismaClient } from '@prisma/client';
import { convertHoursToMin } from './utils/convertHoursToMin';
import { convertMinToHours } from './utils/convertMinToHours';

const app = express();
app.use(express.json());
app.use(cors())
const prisma = new PrismaClient()


app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })
    response.json(games);
})

app.post('/games/:id/ads', async (request, response) => {
    const { id } = request.params;

    const ad = {
        name: request.body.name,
        hourStart: convertHoursToMin(request.body.hourStart),
        hourEnd: convertHoursToMin(request.body.hourEnd),
        discord: request.body.discord,
        gameId: id,
        weekDays: request.body.weekDays.join(','),
        useVoiceChannel: request.body.useVoiceChannel,
        yearsPlaying: request.body.yearsPlaying
    }

    const adCreated = await prisma.ad.create({
        data: ad
    })

    response.status(201).json(adCreated);
})

app.get('/games/:id/ads', async (request, response) => {

    const { id } = request.params;

    const ads = await prisma.ad.findMany({
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
    })

    const formatedAds = ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(',').map(Number),
            hourEnd: convertMinToHours(ad.hourEnd),
            hourStart: convertMinToHours(ad.hourStart)
        }
    })

    response.json(formatedAds);
})

app.get('/ads/:id/discord', async (request, response) => {
    const { id } = request.params;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: id
        }
    })

    response.json({
        discord: ad.discord
    });
})


app.listen(3333, () => {
    console.log("Server stated on port 3333");
})