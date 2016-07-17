'use strict';

/**
 * Dependencies
 */
let onlyId = require('meanie-mongoose-only-id');
let mongoose = require('mongoose');
let Model = mongoose.Model;
let ObjectId = mongoose.Types.ObjectId;

/**
 * Recursive handler of objects
 */
function setObject(obj, data, parentPath) {

  //Loop all the keys
  for (let key in data) {
    if (data.hasOwnProperty(key)) {

      //Determine path
      let path = parentPath ? (parentPath + '.' + key) : key;

      //If the current value is undefined, we set the data to whatever is given
      if (typeof obj[key] === 'undefined') {
        obj[key] = data[key];
      }

      //If the value is an array, it requires further handling
      else if (Array.isArray(obj[key])) {

        //First, we would expect the data to be an array as well
        if (!Array.isArray(data[key])) {
          throw new Error(
            'Path `' + path + '` in data is expected to be an array`'
          );
        }

        //Simplify the objects
        let current = onlyId(obj[key]);
        let updated = onlyId(data[key]);

        //Find items not present in the current array
        if (updated.some(x => current.indexOf(x) === -1)) {
          obj[key] = data[key];
        }

        //Find items not present in the updated array
        else if (current.some(x => updated.indexOf(x) === -1)) {
          obj[key] = data[key];
        }
      }

      //If it's a date, check if the same
      else if (obj[key] instanceof Date && data[key] instanceof Date) {
        if (obj[key].getTime() !== data[key].getTime()) {
          obj[key] = data[key];
        }
      }

      //If it's an object ID, compare with helper
      else if (obj[key] instanceof ObjectId) {
        let id = onlyId(data[key]);
        if (!obj[key].equals(id)) {
          obj[key] = data[key];
        }
      }

      //If the value is an object, it requires further handling
      else if (typeof obj[key] === 'object') {

        //If one of the values is a full model instance, compare by ID's
        if ((obj[key] instanceof Model && obj[key]._id) ||
            (data[key] instanceof Model && data[key]._id)) {
          let current = onlyId(obj[key]);
          let updated = onlyId(data[key]);
          if (current !== updated) {
            obj[key] = updated;
          }
          continue;
        }

        //If either the current value or the new value are null, it's safe
        //to simply set the replacement value.
        if (obj[key] === null || data[key] === null) {
          obj[key] = data[key];
          continue;
        }

        //Check if the data is an object as well
        if (typeof data[key] !== 'object') {
          throw new Error(
            'Path `' + path + '` in data is expected to be an object`'
          );
        }

        //Recursive object check
        setObject(obj[key], data[key], key);
      }

      //Anything else, check if changed
      else if (obj[key] !== data[key]) {
        obj[key] = data[key];
      }
    }
  }
}

/**
 * Set properties helper which will set only properties that have changed
 * Note that for arrays, it assume primitive values
 */
module.exports = function setProperties(schema) {
  schema.methods.setProperties = function(data) {
    setObject(this, data);
  };
};
