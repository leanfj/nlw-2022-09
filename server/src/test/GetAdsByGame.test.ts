import GetAdsByGame from "../application/GetAdByGame"

describe('GetAdsByGame Use Case', () => {
  test('Should return all ads by game', async () => {
    const adsByGame = new GetAdsByGame()

    const formatedAds = await adsByGame.execute('11066725-1755-4d8c-bd5e-cc44e76c1194')

    expect(formatedAds).toHaveLength(1)
    expect(formatedAds[0]).toHaveProperty('id')
    expect(formatedAds[0].name).toBe('Leandro')
  })
})