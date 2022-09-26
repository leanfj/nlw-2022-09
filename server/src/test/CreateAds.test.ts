import CreateAds, { InputDTO } from "../application/CreateAds";

describe('CreateAds Use Case', () => {
  test('Should create a new ad', async () => {
    const createAds = new CreateAds()

    const input: InputDTO = {
      name: 'Leandro',
      hourStart: '10:00',
      hourEnd: '12:00',
      weekDays: [1, 2, 3, 4, 5, 6, 7],
      useVoiceChannel: 1,
      yearsPlaying: 1,
      discord: 'leanfj#12345',
      gameId: '11066725-1755-4d8c-bd5e-cc44e76c1194'
    }

    const adCreated = await createAds.execute(input)

    expect(adCreated).toHaveProperty('id')
    expect(adCreated.name).toBe('Leandro')
    })
})