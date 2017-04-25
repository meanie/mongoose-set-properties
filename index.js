'use strict';

/**
 * Dependencies
 */
const setObjectProperties = require('./helpers/set-object-properties');

/**
 * Set properties helper which will set only properties that have changed
 */
module.exports = function setProperties(schema) {
  schema.methods.setProperties = function(data) {
    setObjectProperties.call(this, this, data);
  };
};
