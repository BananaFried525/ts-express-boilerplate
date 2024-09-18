import { getMockReq, getMockRes } from '@jest-mock/express'
import { getUser } from '../../src/controllers/user'

const { res, next } = getMockRes()

describe('user', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getUser', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })
    
    it('should return test', async () => {
      const req = getMockReq({})
      await getUser(req, res)

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'test'
        })
      )
    })
  })
})
