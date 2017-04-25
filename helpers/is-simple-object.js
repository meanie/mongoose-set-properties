'use strict';

/**
 * Dependencies
 */
const mongoose = require('mongoose');
const Model = mongoose.Model;
const ObjectId = mongoose.Types.ObjectId;

/**
 * Check if a value is a simple object
 */
module.exports = function isSimpleObject(value) {

  //Easy checks
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  //Non simple objects
  return !(
    value instanceof Date ||
    value instanceof ObjectId ||
    (value instanceof Model && value._id)
  );
};
