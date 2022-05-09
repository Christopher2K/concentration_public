import AsyncStorage from '@react-native-async-storage/async-storage'

import { persist, read } from '@app/services/storage'

describe('Storage service', () => {
  const setItemSpy = jest.spyOn(AsyncStorage, 'setItem')
  const getItemSpy = jest.spyOn(AsyncStorage, 'getItem')

  beforeEach(() => {
    setItemSpy.mockClear()
    getItemSpy.mockClear()
  })

  describe('persist()', () => {
    it('should stringify data we want to persist', () => {
      persist({ key: '@initialized', data: true })
      expect(setItemSpy).toHaveBeenCalledWith('@initialized', 'true')
    })
  })

  describe('read()', () => {
    it('should read data if it does exist', async () => {
      getItemSpy.mockImplementationOnce(() =>
        Promise.resolve(JSON.stringify({ testData: 'test' })),
      )

      const data = await read({ key: '@initialized' })

      expect(getItemSpy).toHaveBeenCalledWith('@initialized')
      expect(data).toMatchObject({ testData: 'test' })
    })

    it('should create the expected data if it does not exist', async () => {
      getItemSpy.mockImplementationOnce(() => Promise.resolve(null))

      const data = await read({ key: '@initialized', createIfNotExists: true })
      expect(data).not.toBeNull()
      expect(setItemSpy).toHaveBeenCalledWith('@initialized', 'true')
    })

    it('should returns null if the data does not exists', async () => {
      getItemSpy.mockImplementationOnce(() => Promise.resolve(null))

      const data = await read({ key: '@initialized', createIfNotExists: false })
      expect(data).toBeNull()
      expect(setItemSpy).not.toHaveBeenCalled()
    })
  })
})
