'use strict';

/**
 * Dependencies
 */
const isSame = require('./is-same');
const mongoose = require('mongoose');
const Test = mongoose.model('Test');
const ObjectId = mongoose.Types.ObjectId;

/**
 * Specifications
 */
describe('isSame()', () => {

  /**************************************************************************
   * Basic
   ***/

  it('should match simple values that are the same', () => {
    expect(isSame(null, null)).to.be.true();
    expect(isSame(undefined, undefined)).to.be.true();
    expect(isSame(0, 0)).to.be.true();
    expect(isSame(1, 1)).to.be.true();
    expect(isSame('a', 'a')).to.be.true();
    expect(isSame(true, true)).to.be.true();
    expect(isSame(false, false)).to.be.true();
  });

  it('should not match null to values that aren’t the same', () => {
    expect(isSame(null, undefined)).to.be.false();
    expect(isSame(null, 0)).to.be.false();
    expect(isSame(null, 1)).to.be.false();
    expect(isSame(null, 'a')).to.be.false();
    expect(isSame(null, true)).to.be.false();
    expect(isSame(null, false)).to.be.false();
  });

  it('should not match undefined to values that aren’t the same', () => {
    expect(isSame(undefined, null)).to.be.false();
    expect(isSame(undefined, 0)).to.be.false();
    expect(isSame(undefined, 1)).to.be.false();
    expect(isSame(undefined, 'a')).to.be.false();
    expect(isSame(undefined, true)).to.be.false();
    expect(isSame(undefined, false)).to.be.false();
  });

  it('should not match numbers to values that aren’t the same', () => {
    expect(isSame(1, null)).to.be.false();
    expect(isSame(1, undefined)).to.be.false();
    expect(isSame(1, 0)).to.be.false();
    expect(isSame(1, 2)).to.be.false();
    expect(isSame(1, 'a')).to.be.false();
    expect(isSame(1, true)).to.be.false();
    expect(isSame(1, false)).to.be.false();
  });

  it('should not match strings to values that aren’t the same', () => {
    expect(isSame('a', null)).to.be.false();
    expect(isSame('a', undefined)).to.be.false();
    expect(isSame('a', 0)).to.be.false();
    expect(isSame('a', 1)).to.be.false();
    expect(isSame('a', 'b')).to.be.false();
    expect(isSame('a', true)).to.be.false();
    expect(isSame('a', false)).to.be.false();
  });

  it('should not match booleans to values that aren’t the same', () => {
    expect(isSame(false, null)).to.be.false();
    expect(isSame(false, undefined)).to.be.false();
    expect(isSame(false, 0)).to.be.false();
    expect(isSame(false, 1)).to.be.false();
    expect(isSame(false, 'a')).to.be.false();
    expect(isSame(false, true)).to.be.false();
    expect(isSame(true, null)).to.be.false();
    expect(isSame(true, undefined)).to.be.false();
    expect(isSame(true, 0)).to.be.false();
    expect(isSame(true, 1)).to.be.false();
    expect(isSame(true, 'a')).to.be.false();
    expect(isSame(true, false)).to.be.false();
  });

  /**************************************************************************
   * Dates
   ***/

  it('should match dates that are the same', () => {
    const v1 = new Date(12345);
    const v2 = new Date(12345);
    expect(isSame(v1, v2)).to.be.true();
  });

  it('should not match dates that aren’t the same', () => {
    const v1 = new Date(12345);
    const v2 = new Date(54321);
    expect(isSame(v1, v2)).to.be.false();
  });

  it('should not match dates with other things', () => {
    const v1 = new Date(12345);
    const v2 = 12345;
    const v3 = {a: 1};
    expect(isSame(v1, v2)).to.be.false();
    expect(isSame(v1, v3)).to.be.false();
  });

  /**************************************************************************
   * ObjectId's
   ***/

  it('should match ObjectId’s that are the same', () => {
    const v1 = new ObjectId('333bee3e4527879d33c7b31a');
    const v2 = new ObjectId('333bee3e4527879d33c7b31a');
    expect(isSame(v1, v2)).to.be.true();
  });

  it('should not match ObjectId’s that aren’t the same', () => {
    const v1 = new ObjectId('333bee3e4527879d33c7b31a');
    const v2 = new ObjectId('333bee3e4527879d33c7b31b');
    expect(isSame(v1, v2)).to.be.false();
  });

  it('should match ObjectId’s with strings that are the same', () => {
    const v1 = new ObjectId('333bee3e4527879d33c7b31a');
    const v2 = '333bee3e4527879d33c7b31a';
    expect(isSame(v1, v2)).to.be.true();
  });

  it('should not match ObjectId’s with strings that aren’t the same', () => {
    const v1 = new ObjectId('333bee3e4527879d33c7b31a');
    const v2 = '333bee3e4527879d33c7b31b';
    expect(isSame(v1, v2)).to.be.false();
  });

  it('should match ObjectId’s with Models that are the same', () => {
    const v1 = new ObjectId('333bee3e4527879d33c7b31a');
    const v2 = new Test({_id: new ObjectId('333bee3e4527879d33c7b31a')});
    expect(isSame(v1, v2)).to.be.true();
  });

  it('should not match ObjectId’s with Models that aren’t the same', () => {
    const v1 = new ObjectId('333bee3e4527879d33c7b31a');
    const v2 = new Test({_id: new ObjectId('333bee3e4527879d33c7b31b')});
    expect(isSame(v1, v2)).to.be.false();
  });

  it('should match ObjectId’s with objects that are the same', () => {
    const v1 = new ObjectId('333bee3e4527879d33c7b31a');
    const v2 = {id: '333bee3e4527879d33c7b31a'};
    expect(isSame(v1, v2)).to.be.true();
  });

  it('should not match ObjectId’s with objects that aren’t the same', () => {
    const v1 = new ObjectId('333bee3e4527879d33c7b31a');
    const v2 = {id: '333bee3e4527879d33c7b31b'};
    expect(isSame(v1, v2)).to.be.false();
  });

  /**************************************************************************
   * Models
   ***/

  it('should match Models with the same ID', () => {
    const v1 = new Test({_id: '333bee3e4527879d33c7b31a'});
    const v2 = new Test({_id: '333bee3e4527879d33c7b31a'});
    expect(isSame(v1, v2)).to.be.true();
  });

  it('should not match Models with different ID', () => {
    const v1 = new Test({_id: '333bee3e4527879d33c7b31a'});
    const v2 = new Test({_id: '333bee3e4527879d33c7b31b'});
    expect(isSame(v1, v2)).to.be.false();
  });

  it('should match Models with ObjectId’s that are the same', () => {
    const v1 = new Test({_id: '333bee3e4527879d33c7b31a'});
    const v2 = new Test({_id: new ObjectId('333bee3e4527879d33c7b31a')});
    expect(isSame(v1, v2)).to.be.true();
  });

  it('should not match Models with ObjectId’s that aren’t the same', () => {
    const v1 = new Test({_id: '333bee3e4527879d33c7b31a'});
    const v2 = new Test({_id: new ObjectId('333bee3e4527879d33c7b31b')});
    expect(isSame(v1, v2)).to.be.false();
  });

  it('should match Models with strings that are the same', () => {
    const v1 = new Test({_id: '333bee3e4527879d33c7b31a'});
    const v2 = '333bee3e4527879d33c7b31a';
    expect(isSame(v1, v2)).to.be.true();
  });

  it('should not match Models with strings that aren’t the same', () => {
    const v1 = new Test({_id: '333bee3e4527879d33c7b31a'});
    const v2 = '333bee3e4527879d33c7b31b';
    expect(isSame(v1, v2)).to.be.false();
  });

  it('should match Models with objects that are the same', () => {
    const v1 = new Test({_id: '333bee3e4527879d33c7b31a'});
    const v2 = {id: '333bee3e4527879d33c7b31a'};
    expect(isSame(v1, v2)).to.be.true();
  });

  it('should not match Models with objects that aren’t the same', () => {
    const v1 = new Test({_id: '333bee3e4527879d33c7b31a'});
    const v2 = {id: '333bee3e4527879d33c7b31b'};
    expect(isSame(v1, v2)).to.be.false();
  });

  /**************************************************************************
   * Objects
   ***/

  it('should match objects with the same properties', () => {
    const v1 = {a: 1, b: 't', c: true, d: undefined, e: null};
    const v2 = {e: null, a: 1, c: true, b: 't', d: undefined};
    expect(isSame(v1, v2)).to.be.true();
  });

  it('should mismatch objects with missing properties', () => {
    const v1 = {a: 1, b: 't', c: true, d: undefined, e: null};
    const v2 = {a: 1, b: 't', c: true, e: null};
    expect(isSame(v1, v2)).to.be.false();
  });

  it('should mismatch objects with additional properties', () => {
    const v1 = {a: 1, b: 't', c: true, d: undefined, e: null};
    const v2 = {a: 1, b: 't', c: true, d: undefined, e: null, f: 2};
    expect(isSame(v1, v2)).to.be.false();
  });

  it('should mismatch objects with different values', () => {
    const v1 = {a: 1, b: 't', c: true, d: undefined, e: null};
    const v2 = {a: 2, b: 't', c: true, d: undefined, e: null};
    const v3 = {a: 1, b: 't', c: true, d: null, e: null};
    const v4 = {a: 1, b: 't', c: true, d: undefined, e: 0};
    expect(isSame(v1, v2)).to.be.false();
    expect(isSame(v1, v3)).to.be.false();
    expect(isSame(v1, v4)).to.be.false();
  });

  it('should match objects with the same properties recursively', () => {
    const v1 = {a: 1, b: {c: true, d: 't'}};
    const v2 = {a: 1, b: {c: true, d: 't'}};
    expect(isSame(v1, v2)).to.be.true();
  });

  it('should mismatch objects with different properties recursively', () => {
    const v1 = {a: 1, b: {c: true, d: 't'}};
    const v2 = {a: 1, b: {c: false, d: 't'}};
    expect(isSame(v1, v2)).to.be.false();
  });

  /**************************************************************************
   * Arrays
   ***/

  it('should match arrays with the same values', () => {
    const o1 = new ObjectId('333bee3e4527879d33c7b31b');
    const o2 = new ObjectId('333bee3e4527879d33c7b31b');
    const v1 = [1, 'a', true, null, {_id: o1, a: 2, b: {c: 4}}];
    const v2 = ['a', true, 1, {_id: o2, a: 2, b: {c: 4}}, null];
    expect(isSame(v1, v2)).to.be.true();
  });

  it('should not match arrays with missing values', () => {
    const v1 = [1, 'a', true, null, {a: 2}];
    const v2 = [1, 'a', true, {a: 2}];
    expect(isSame(v1, v2)).to.be.false();
  });

  it('should not match arrays with additional values', () => {
    const v1 = [1, 'a', true, null, {a: 2}];
    const v2 = [1, 'a', true, null, {a: 2}, 3];
    expect(isSame(v1, v2)).to.be.false();
  });

  it('should not match arrays with different values', () => {
    const v1 = [1, 'a', true, null, {a: 2}];
    const v2 = [2, 'a', true, null, {a: 2}];
    expect(isSame(v1, v2)).to.be.false();
  });

  it('should not match arrays with different values in objects', () => {
    const v1 = [1, 'a', true, null, {a: 2}];
    const v2 = [1, 'a', true, null, {a: 3}];
    expect(isSame(v1, v2)).to.be.false();
  });

  it('should not match arrays with other things', () => {
    const v1 = [1, 'a', true, null, {a: 2}];
    const v2 = 2;
    const v3 = {a: 2};
    expect(isSame(v1, v2)).to.be.false();
    expect(isSame(v1, v3)).to.be.false();
  });

  it('should match arrays with the same values recursively', () => {
    const v1 = [1, 'a', [2, 'b']];
    const v2 = [1, 'a', [2, 'b']];
    expect(isSame(v1, v2)).to.be.true();
  });

  it('should not match arrays with different values recursively', () => {
    const v1 = [1, 'a', [2, 'b']];
    const v2 = [1, 'a', [3, 'b']];
    expect(isSame(v1, v2)).to.be.false();
  });

  /**************************************************************************
   * Other data
   ***/

  it('should throw an error for invalid input', () => {
    expect(function() {
      isSame(Array.isArray, true);
    }).to.throw(Error);
  });
});
