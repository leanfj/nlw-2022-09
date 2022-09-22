import './styles/main.css';
import { useEffect, useState } from 'react';

import logoImg from './assets/Logo.svg'

import axios from 'axios'

import { GameBanner } from './components/GameBanner';
import { AdBanner } from './components/AdBanner';

import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdModal } from './components/CreateAdModal';

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: { ads: number }
}

function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => setGames(response.data))
  }, [])

  return (
    <div className='max-w-[1200px] mx-auto flex flex-col items-center my-20'>

      <img src={logoImg} />

      <h1 className='text-6xl text-white font-black mt-20 text-center'>Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui</h1>

      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-6 mt-16">
        {
          games.map(game => {
            return (
              <GameBanner
                key={game.id}
                gameName={game.title}
                bannerUrl={game.bannerUrl}
                adsCount={game._count.ads}
              />
            )

          })
        }
      </div>
      <Dialog.Root>
        <AdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
