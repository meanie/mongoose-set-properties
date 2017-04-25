'use strict';

/**
 * Dependencies
 */
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Test = mongoose.model('Test');

/**
 * Specifications
 */
describe('setObjectProperties()', () => {

  //Reference object
  let v1;
  beforeEach(() => {
    v1 = new Test({
      _id: new ObjectId('333bee3e4527879d33c7b31a'),
      string: 'a',
      number: 1,
      boolean: true,
      date: new Date(123),
      objectId: new ObjectId('333bee3e4527879d33c7b31b'),
      object: {a: 1, b: 2},
      array1: ['a', 'b', 'c'],
      array2: [{a: 1}, {b: 2}],
    });
    v1.unmarkModified('string');
    v1.unmarkModified('number');
    v1.unmarkModified('boolean');
    v1.unmarkModified('date');
    v1.unmarkModified('objectId');
    v1.unmarkModified('object');
    v1.unmarkModified('array1');
    v1.unmarkModified('array2');
  });

  //Simple changes
  const simple = {
    string: 'b',
    number: 2,
    boolean: false,
    date: new Date(456),
    objectId: new ObjectId('333bee3e4527879d33c7b31c'),
  };
  const simpleNone = {
    string: 'a',
    number: 1,
    boolean: true,
    date: new Date(123),
    objectId: new ObjectId('333bee3e4527879d33c7b31b'),
  };

  //Deep changes
  const deep = {
    object: {a: 2},
  };
  const deepNone = {
    object: {a: 1},
  };
  const deepError = {
    object: 2,
  };

  //Array changes
  const array1 = {
    array1: ['b', 'd'],
  };
  const array1None = {
    array1: ['a', 'b', 'c'],
  };
  const array2 = {
    array2: [{a: 1}, {c: 3}],
  };
  const array2Diff = {
    array2: [{a: 1}, {b: 3}],
  };
  const array2None = {
    array2: [{a: 1}, {b: 2}],
  };

  it('should set changed simple properties', () => {
    v1.setProperties(simple);
    expect(v1.string).to.equal('b');
    expect(v1.number).to.equal(2);
    expect(v1.boolean).to.equal(false);
    expect(v1.date.getTime()).to.equal(new Date(456).getTime());
    expect(v1.objectId.equals(simple.objectId)).to.be.true();
    expect(v1.isModified('string')).to.be.true();
    expect(v1.isModified('number')).to.be.true();
    expect(v1.isModified('boolean')).to.be.true();
    expect(v1.isModified('date')).to.be.true();
    expect(v1.isModified('objectId')).to.be.true();
  });

  it('should not set unchanged simple properties', () => {
    v1.setProperties(simpleNone);
    expect(v1.string).to.equal('a');
    expect(v1.number).to.equal(1);
    expect(v1.boolean).to.equal(true);
    expect(v1.date.getTime()).to.equal(new Date(123).getTime());
    expect(v1.objectId.equals(simpleNone.objectId)).to.be.true();
    expect(v1.isModified('string')).to.be.false();
    expect(v1.isModified('number')).to.be.false();
    expect(v1.isModified('boolean')).to.be.false();
    expect(v1.isModified('date')).to.be.false();
    expect(v1.isModified('objectId')).to.be.false();
  });

  it('should set changed deep properties', () => {
    v1.setProperties(deep);
    expect(v1.object.a).to.equal(2);
    expect(v1.object.b).to.equal(2);
    expect(v1.isModified('object')).to.be.true();
  });

  it('should not set unchanged deep properties', () => {
    v1.setProperties(deepNone);
    expect(v1.object.a).to.equal(1);
    expect(v1.object.b).to.equal(2);
    expect(v1.isModified('object')).to.be.false();
  });

  it('should throw an error on invalid object data', () => {
    expect(function() {
      v1.setProperties(deepError);
    }).to.throw(Error);
  });

  it('should set changed flat array properties', () => {
    v1.setProperties(array1);
    expect(v1.array1).to.have.lengthOf(2);
    expect(v1.array1).to.include('b');
    expect(v1.array1).to.include('d');
    expect(v1.isModified('array1')).to.be.true();
  });

  it('should not set unchanged flat array properties', () => {
    v1.setProperties(array1None);
    expect(v1.array1).to.have.lengthOf(3);
    expect(v1.array1).to.include('a');
    expect(v1.array1).to.include('b');
    expect(v1.array1).to.include('c');
    expect(v1.isModified('array1')).to.be.false();
  });

  it('should set changed deep array items', () => {
    v1.setProperties(array2);
    expect(v1.array2).to.have.lengthOf(2);
    expect(v1.array2[0].a).to.equal(1);
    expect(v1.array2[1].c).to.equal(3);
    expect(v1.isModified('array2')).to.be.true();
  });

  it('should set changed deep array properties', () => {
    v1.setProperties(array2Diff);
    expect(v1.array2).to.have.lengthOf(2);
    expect(v1.array2[0].a).to.equal(1);
    expect(v1.array2[1].b).to.equal(3);
    expect(v1.isModified('array2')).to.be.true();
  });

  it('should not set unchanged deep arrays', () => {
    v1.setProperties(array2None);
    expect(v1.array2).to.have.lengthOf(2);
    expect(v1.array2[0].a).to.equal(1);
    expect(v1.array2[1].b).to.equal(2);
    expect(v1.isModified('array2')).to.be.false();
  });
});
