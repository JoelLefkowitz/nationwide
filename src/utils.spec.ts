import { beforeChar, fromPounds, roundAdd, sortFields } from './utils';

import { expect } from 'chai';

describe('fromPounds', () => {
  it('parses a pounds currency string literal.', () => {
    expect(fromPounds('£0.00')).to.equal(0);
    expect(fromPounds('£1.00')).to.equal(1);
    expect(fromPounds('£0.50')).to.equal(0.5);
  });

  it('parses a number string literal.', () => {
    expect(fromPounds('0')).to.equal(0);
    expect(fromPounds('0.')).to.equal(0);
    expect(fromPounds('0.0')).to.equal(0);
    expect(fromPounds('1.5')).to.equal(1.5);
    expect(fromPounds('0.5')).to.equal(0.5);
    expect(fromPounds('0.50')).to.equal(0.5);
  });

  it('parses a negative values.', () => {
    expect(fromPounds('-0.50')).to.equal(-0.5);
    expect(fromPounds('-£0.50')).to.equal(-0.5);
  });
});

describe('beforeChar', () => {
  it('returns the part of a string preceding the specified character.', () => {
    expect(beforeChar('abc', 'b')).to.equal('a');
    expect(beforeChar('abc', 'd')).to.equal('abc');
  });
});

describe('sortFields', () => {
  it("sorts an object's fields by value.", () => {
    expect(sortFields({ a: 1, b: 3, c: 2 })).to.eql({ a: 1, c: 2, b: 3 });
  });
});

describe('roundAdd', () => {
  it('adds floats and rounds decimals to two places.', () => {
    expect(roundAdd(1, 2)).to.equal(3);
    expect(roundAdd(2.3, 2.4)).to.equal(4.7);
  });
});
