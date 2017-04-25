'use strict';

/**
 * Dependencies
 */
const isSimpleObject = require('./is-simple-object');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Test = mongoose.model('Test');

/**
 * Specifications
 */
describe('isSimpleObject()', () => {

  it('should consider non objects not a simple object', () => {
    expect(isSimpleObject(null)).to.be.false();
    expect(isSimpleObject(undefined)).to.be.false();
    expect(isSimpleObject(1)).to.be.false();
    expect(isSimpleObject('a')).to.be.false();
    expect(isSimpleObject(true)).to.be.false();
    expect(isSimpleObject(false)).to.be.false();
  });

  it('should consider a Date not a simple object', () => {
    expect(isSimpleObject(new Date())).to.be.false();
    expect(isSimpleObject([])).to.be.false();
    expect(isSimpleObject([])).to.be.false();
  });

  it('should consider an Array not a simple object', () => {
    expect(isSimpleObject([])).to.be.false();
  });

  it('should consider a Model with _id not a simple object', () => {
    const model = new Test({_id: new ObjectId()});
    expect(isSimpleObject(model)).to.be.false();
  });

  it('should consider a Model without _id a simple object', () => {
    const model = new Test({id: 2});
    delete model._id;
    expect(isSimpleObject(model)).to.be.false();
  });

  it('should consider a plain object a simple object', () => {
    expect(isSimpleObject({})).to.be.true();
    expect(isSimpleObject({id: 2})).to.be.true();
  });
});
