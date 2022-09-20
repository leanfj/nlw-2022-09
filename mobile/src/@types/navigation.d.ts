export interface GameParams {
  id: string,
  title: string,
  bannerUrl: string,
}

export global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined,
      game: GameParams
    }
  }
}