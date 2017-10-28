const expect = require('chai').expect;
const multiplyStr = require('./index.js').multiplyStr;

describe('multiply-strings', () => {
    
    it('Two single digit numbers with a single digit result', () => {
        expect(multiplyStr('4', '2')).to.equal('8');
    });

    it('Two single digit numbers with a multi digit result', () => {
        expect(multiplyStr('4', '8')).to.equal('32');
    });

    it('Multi digit multiplier, single digit multiplicand', () => {
        expect(multiplyStr('12', '8')).to.equal('96');
    });

    it('Single digit multiplier, multi digit multiplicand', () => {
        expect(multiplyStr('6', '13')).to.equal('78');
    });

    it('Multi digit multiplier, multi digit multiplicand', () => {
        expect(multiplyStr('36', '13')).to.equal('468');
    });

    it('Multi digit multiplier, multi digit multiplicand', () => {
        expect(multiplyStr('236', '113')).to.equal('26668');
    });

    it('Two large numbers 1', () => {
        expect(multiplyStr('8615028', '12347659')).to.equal('106375428019452')
    });

    it('Two large numbers 2', () => {
        expect(multiplyStr('8616385028', '12341347659')).to.equal('106337803194350449452')
    });
});