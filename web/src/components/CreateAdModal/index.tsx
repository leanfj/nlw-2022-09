
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import axios from 'axios'

import { Check, GameController } from "phosphor-react"
import { Input } from "../Form/Input"
import { SelectBox } from '../Form/Select'
import { FormEvent, useEffect, useState } from 'react'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: { ads: number }
}

export function CreateAdModal() {

  const [games, setGames] = useState<Game[]>([])
  const [game, setGame] = useState<Game>()
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [voiceChat, setVoiceChat] = useState<string | boolean>(false)

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => setGames(response.data))
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if (!data.name) {
      return
    }
    console.log(game)
    try {
      await axios.post(`http://localhost:3333/games/${game}/ads`, {
        hourEnd: data.hourEnd,
        hourStart: data.hourStart,
        name: data.name,
        discord: data.discord,
        useVoiceChannel: voiceChat ? 1 : 0,
        weekDays: weekDays.map(Number),
        yearsPlaying: Number(data.yearsPlaying)
      })
      alert('Anúncio criado com sucesso!')

    } catch (error) {
      console.log(error)

      alert('Erro ao criar anúncio!')
    }
  }

  function getSelectedGame(data: any) {
    setGame(data)
  }

  return (

    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
      <Dialog.Content className='shadow-lg shadow-black/25 fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[460px]'>
        <Dialog.Title className='text-3xl text-white font-black'>Publique um anúncio</Dialog.Title>
        <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="game" className='font-semibold'>Qual o game?</label>
            <SelectBox data={games} getGame={getSelectedGame} />
          </div>
          <div className='flex flex-col gap-2' >
            <label htmlFor="name" className='font-semibold'>Seu nome (ou nickname)</label>
            <Input name="name" id='name' placeholder='Como te chamam dentro do game?' />
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='yearsPlaying' className='font-semibold'>Joga a quantos anos?</label>
              <Input type='number' id='yearsPlaying' name='yearsPlaying' placeholder='Tudo bem ser ZERO' />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='discord' className='font-semibold'>Qual seu Discord</label>
              <Input type='text' id='discord' name='discord' placeholder='Usuário#0000' />
            </div>
          </div>
          <div className='flex gap-6'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="weekDays" className='font-semibold'>Quando costuma jogar ?</label>

              <ToggleGroup.Root
                type="multiple"
                value={weekDays}
                onValueChange={(value) => {
                  if (value) setWeekDays(value)
                }}
                className="grid grid-cols-4 gap-2"
              >
                <ToggleGroup.Item
                  value="0"
                  className='w-8 h-8 rounded bg-zinc-900 [&[data-state=on]]:bg-violet-500 '
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  className='w-8 h-8 rounded bg-zinc-900 [&[data-state=on]]:bg-violet-500 '
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  className='w-8 h-8 rounded bg-zinc-900 [&[data-state=on]]:bg-violet-500 '
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  className='w-8 h-8 rounded bg-zinc-900 [&[data-state=on]]:bg-violet-500 '
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  className='w-8 h-8 rounded bg-zinc-900 [&[data-state=on]]:bg-violet-500 '
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  className='w-8 h-8 rounded bg-zinc-900 [&[data-state=on]]:bg-violet-500 '
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  className='w-8 h-8 rounded bg-zinc-900 [&[data-state=on]]:bg-violet-500 '
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>

            </div >
            <div className='flex flex-col gap-1 flex-1' >
              <label className='font-semibold'>Qual horário do dia?</label>
              <div className='grid grid-cols-1 gap-2'>
                <div className="flex items-center justify-between">
                  <label htmlFor="hourStart" className='font-semibold text-sm'>Início</label>
                  <Input id="hourStart" name="hourStart" type="time" placeholder='De' />
                </div>
                <div className='flex items-center justify-between'>
                  <label htmlFor="hourEnd" className='font-semibold text-sm '>Término</label>
                  <Input id="hourEnd" name="hourEnd" type="time" placeholder='Até' />
                </div>
              </div>
            </div>
          </div>
          <div className='mt-2 flex gap-2 text-sm items-center'>
            <Checkbox.Root id='check01' className='w-6 h-6 bg-zinc-900 rounded flex items-center justify-center' onCheckedChange={(data) => setVoiceChat(data)} >
              <Checkbox.Indicator className='' >
                <Check className='w-4 h-4 text-emerald-400' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor="check01" className='select-none'>
              Costumo me conectar ao chat de voz
            </label>
          </div>
          <footer className='mt-4 flex justify-end gap-4'>
            <Dialog.Close type="button" className='bg-zinc-500 h-12 px-5 rounded-md font-semibold hover:bg-zinc-600'>
              Cancelar
            </Dialog.Close>
            <button type='submit' className='bg-violet-500 h-12 px-5 rounded-md gap-3 flex items-center hover:bg-violet-600'>
              <GameController size={24} />
              Encontrar Duo
            </button>
          </footer>
        </form>
      </Dialog.Content>

    </Dialog.Portal>
  )
}
