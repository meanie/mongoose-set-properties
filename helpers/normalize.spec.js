'use strict';

/**
 * Dependencies
 */
const normalize = require('./normalize');
const moment = require('moment');

/**
 * Specifications
 */
describe('normalize()', () => {

  it('should convert a moment to a date', () => {
    const m = moment();
    const d = normalize(m);
    expect(d).to.be.an.instanceOf(Date);
    expect(normalize(m).getTime()).to.equal(m.toDate().getTime());
  });

  it('should not touch other stuff', () => {
    expect(normalize(5)).to.equal(5);
  });
});
