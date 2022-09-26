import { PrismaClient } from "@prisma/client";
import { convertHoursToMin } from "../utils/convertHoursToMin";

export interface InputDTO{
  name: string
  hourStart: string
  hourEnd: string
  weekDays: number[]
  useVoiceChannel: number
  yearsPlaying: number
  discord: string
  gameId: string
}

export interface OutputDTO{
  id: string
  name: string
  hourStart: number
  hourEnd: number
  weekDays: string
  useVoiceChannel: number
  yearsPlaying: number
  discord: string
  gameId: string
}

const prisma = new PrismaClient()

export default class CreateAds {
  constructor () {

  }

  async execute (input: InputDTO): Promise<OutputDTO> {
    const id = input.gameId;

    const ad = {
        name: input.name,
        hourStart: convertHoursToMin(input.hourStart),
        hourEnd: convertHoursToMin(input.hourEnd),
        discord: input.discord,
        gameId: id,
        weekDays: input.weekDays.join(','),
        useVoiceChannel: input.useVoiceChannel,
        yearsPlaying: input.yearsPlaying
    }

    const adCreated = await prisma.ad.create({
        data: ad
    })

    return adCreated
  }
}