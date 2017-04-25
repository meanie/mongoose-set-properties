'use strict';

/**
 * Dependencies
 */
const onlyId = require('meanie-mongoose-only-id');
const mongoose = require('mongoose');
const Model = mongoose.Model;
const ObjectId = mongoose.Types.ObjectId;

/**
 * Helper to check if two values are the same
 */
module.exports = function isSame(v1, v2) {

  //Arrays
  if (Array.isArray(v1)) {
    if (Array.isArray(v2)) {
      if (v1.length !== v2.length) {
        return false;
      }
      return v1.every(item1 => v2.some(item2 => isSame(item1, item2)));
    }
    return false;
  }

  //Simple comparisons
  if (
    v1 === null ||
    v1 === undefined ||
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
  if (typeof v1 === 'object' && v1 !== null) {
    if (typeof v2 === 'object' && v2 !== null) {
      const k1 = Object.keys(v1);
      const k2 = Object.keys(v2);
      if (!isSame(k1, k2)) {
        return false;
      }
      for (const k in v1) {
        if (v1.hasOwnProperty(k) && !isSame(v1[k], v2[k])) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  //Unexpected input
  throw new Error('Unexpected type for value: ' + v1);
};
