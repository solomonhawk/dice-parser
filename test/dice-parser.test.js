import { roll } from '../src'

describe('dice-parser', function() {

  it('exports a `roll` function', function() {
    expect(roll).to.be.defined
    expect(typeof roll).to.equal('function')
  })

  describe('#roll', function() {

    it('computes random rolls based on given dice', function() {
      let iterations = 100
      let results = []

      while (iterations--) {
        results.push(roll('1d4').total)
      }

      results.map(result => {
        expect(result).to.be.above(0)
        expect(result).to.be.below(5)
      })
    })

    it('returns a CompositeDiceRoll type', function() {
      var result = roll('2d4')
      expect(result).to.have.property('rolls')
      expect(result).to.have.property('total')
    })

  })

})
