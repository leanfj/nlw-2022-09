import express from 'express';
import cors from 'cors'
import { PrismaClient } from '@prisma/client';
import { convertHoursToMin } from './utils/convertHoursToMin';
import { convertMinToHours } from './utils/convertMinToHours';
import CreateAds from './application/CreateAds';
import GetAdsByGame from './application/GetAdByGame';

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
    const createAds = new CreateAds()
    
    const { name, hourStart, hourEnd, weekDays, useVoiceChannel, yearsPlaying, discord } = request.body;
    const id = request.params.id;
    
    const adCreated = await createAds.execute({ name, hourStart, hourEnd, weekDays, useVoiceChannel, yearsPlaying, discord, gameId: id })

    response.status(201).json(adCreated);
})

app.get('/games/:id/ads', async (request, response) => {

    const id = request.params.id;

    const adsByGame = new GetAdsByGame()

    const formatedAds = adsByGame.execute(id)

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