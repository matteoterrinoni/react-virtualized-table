import * as H from '../src/helpers'

describe('Helpers', () => {
  it('should text compare an array correctly', () => {
    const arr = ['b', 'a']
    expect(arr.sort((a, b) => H.textComparison(a, b, o => o))[0]).toBe('a')

    const arrObj = [{ text: 'b' }, { text: 'a' }]
    expect(arrObj.sort((a, b) => H.textComparison(a, b, o => o.text))[0].text).toBe('a')
  })

  it('should text compare 2 strings correctly', () => {
    expect(H.textComparison('a', 'b', o => o)).toBe(-1)
    expect(H.textComparison('b', 'a', o => o)).toBe(1)
    expect(H.textComparison('a', 'a', o => o)).toBe(0)
  })
})
