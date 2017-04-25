'use strict';

/**
 * Dependencies
 */
const isSame = require('./is-same');
const isSimpleObject = require('./is-simple-object');
const normalize = require('./normalize');

/**
 * Recursive handler of objects
 */
module.exports = function setObjectProperties(obj, data, parentPath) {

  //Loop all the keys
  for (const key in data) {
    /* istanbul ignore else */
    if (data.hasOwnProperty(key)) {

      //Determine path and get normalized value
      const path = parentPath ? (parentPath + '.' + key) : key;
      const value = normalize(data[key]);

      //Simple objects
      if (isSimpleObject(obj[key])) {

        //Must have object as data
        if (typeof value !== 'object') {
          throw new Error(
            'Path `' + path + '` in data is expected to be an object.\n' +
            'Got ' + value
          );
        }

        //Set recursively
        setObjectProperties.call(this, obj[key], value, key);
        continue;
      }

      //All else, check if changed
      if (!isSame(obj[key], value)) {

        //Set new value
        obj[key] = value;

        //Mark as modified, as Mongoose doesn't do this for deep paths
        if (parentPath) {
          this.markModified(parentPath);
        }
      }
    }
  }
};
