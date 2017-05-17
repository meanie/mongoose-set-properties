'use strict';

/**
 * Dependencies
 */
const onlyId = require('meanie-mongoose-only-id');
const mongoose = require('mongoose');
const Model = mongoose.Model;
const ObjectId = mongoose.Types.ObjectId;
const normalize = require('./normalize');

/**
 * Helper to check if two values are the same
 */
module.exports = function isSame(v1, v2) {

  //Normalize values (mostly just converts moments to dates)
  v1 = normalize(v1);
  v2 = normalize(v2);

  //Arrays
  if (Array.isArray(v1)) {
    if (Array.isArray(v2)) {

      //Check length matches
      if (v1.length !== v2.length) {
        return false;
      }

      //Keep track of indices of items that were compared
      const indices = new Set();
      return v1.every(item1 => {
        return v2.some((item2, index) => {

          //If index already matched another item, don't match again
          if (!indices.has(index) && isSame(item1, item2)) {
            indices.add(index);
            return true;
          }
          return false;
        });
      });
    }
    return false;
  }

  //Simple comparisons
  if (
    v1 === null ||
    v1 === undefined ||
    v2 === null ||
    v2 === undefined ||
    typeof v1 === 'string' ||
    typeof v1 === 'number' ||
    typeof v1 === 'boolean'
  ) {
    return v1 === v2;
  }

  //Dates
  if (v1 instanceof Date) {
    if (v2 instanceof Date) {
      return (v1.getTime() === v2.getTime());
    }
    return false;
  }

  //Object IDs
  if (v1 instanceof ObjectId) {
    return v1.equals(onlyId(v2));
  }

  //Full model instance
  if (v1 instanceof Model && v1._id) {
    return v1._id.equals(onlyId(v2));
  }

  //Other objects
  if (typeof v1 === 'object') {
    if (typeof v2 === 'object') {

      //Simplify to plain objects if embedded documents
      if (typeof v1.toObject === 'function') {
        v1 = v1.toObject();
      }
      if (typeof v2.toObject === 'function') {
        v2 = v2.toObject();
      }

      //Check object keys
      const k1 = Object.keys(v1);
      const k2 = Object.keys(v2);
      if (!isSame(k1, k2)) {
        return false;
      }

      //Check properties
      for (const k in v1) {
        /* istanbul ignore else */
        if (v1.hasOwnProperty(k)) {
          if (!isSame(v1[k], v2[k])) {
            return false;
          }
        }
      }

      //Objects are the same
      return true;
    }
    return false;
  }

  //Unexpected input
  throw new Error('Unexpected type for value: ' + v1);
};
