interface GameBannerProps {
  bannerUrl: string;
  gameName: string;
  adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <a href="" className='relative rounded-lg overflow-hidden'>
      <img src={props.bannerUrl} alt="" />
      <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 text-white flex flex-col'>
        <strong className='font-bold'>{props.gameName}</strong>
        <span className='text-zinc-300 text-sm'>{props.adsCount} {(props.adsCount >=2) ? "anúncios" : "anúncio"}</span>
      </div>
    </a>
  );
}