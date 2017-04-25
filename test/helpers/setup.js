'use strict';

//Load dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const dirtyChai = require('dirty-chai');
const chaiAsPromised = require('chai-as-promised');

//Enable should assertion style for usage with chai-as-promised
chai.should();

//Extend chai
chai.use(dirtyChai);
chai.use(chaiAsPromised);

//Expose globals
global.expect = chai.expect;

//Add plugin
mongoose.plugin(require('../../index'));

//Test schema
mongoose.model('Test', new Schema({
  string: String,
  number: Number,
  boolean: Boolean,
  date: Date,
  objectId: Schema.Types.ObjectId,
  object: {},
  array1: [String],
  array2: [{}],
}));
