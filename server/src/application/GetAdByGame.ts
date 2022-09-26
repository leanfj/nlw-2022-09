import { PrismaClient } from "@prisma/client"
import { convertMinToHours } from "../utils/convertMinToHours"

interface OutputDTO {
  id: string
  name: string
  hourStart: string
  hourEnd: string
  weekDays: number[]
  useVoiceChannel: number
  yearsPlaying: number
}

const prisma = new PrismaClient()

export default class GetAdsByGame {
  constructor () {

  }

  async execute (id: string): Promise<OutputDTO[]> {

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

    return formatedAds
  }
}