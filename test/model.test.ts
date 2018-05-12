import { initCounter } from '../src/model'

describe('Method over lists', () => {
  it('When init the counter each element as a value of zero ', () => {
    const counter = initCounter()
    const lengthOfElementsHigherThanZero = Object.keys(counter).filter(
      k => counter[k] > 0
    ).length
    expect(lengthOfElementsHigherThanZero === 0).toBeTruthy()
  })
})
