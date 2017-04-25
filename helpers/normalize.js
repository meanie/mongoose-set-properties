'use strict';

/**
 * Normalize a value
 */
module.exports = function normalize(value) {
  if (value && typeof value === 'object' && value._isAMomentObject) {
    return value.toDate();
  }
  return value;
};
