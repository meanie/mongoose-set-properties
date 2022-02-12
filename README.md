# @meanie/mongoose-set-properties

[![npm version](https://img.shields.io/npm/v/@meanie/mongoose-set-properties.svg)](https://www.npmjs.com/package/@meanie/mongoose-set-properties)
[![github issues](https://img.shields.io/github/issues/meanie/mongoose-set-properties.svg)](https://github.com/meanie/mongoose-set-properties/issues)

A plugin for Mongoose to deep check and only set properties on a model that have changed

## 🚨 DEPRECATED 🚨 
This package is deprecated and no longer maintained

## Installation

You can install this package using `yarn` or `npm`.

```shell
#yarn
yarn add @meanie/mongoose-set-properties

#npm
npm install @meanie/mongoose-set-properties --save
```

## Usage

Setup as a global plugin for all Mongoose schema's:

```js
const mongoose = require('mongoose');
const setProperties = require('@meanie/mongoose-set-properties');

mongoose.plugin(setProperties);
```

Or for a specific (sub) schema:

```js
const mongoose = require('mongoose');
const setProperties = require('@meanie/mongoose-set-properties');
const {Schema} = mongoose;

const MySchema = new Schema({});
MySchema.plugin(setProperties);
```

Then use when setting updated properties on your documents:

```js
//Get document
const myDoc = await mongoose.model('MyModel').find({});

//Get updated data
const data = {some: 'New', or: 'Updated', properties: [1, 2, 3]};

//Only modify properties that have changed
myDoc.setProperties(data);

//Check modified paths to verify
const modified = myDoc.modifiedPaths();

//Save
await myDoc.save()
```

For more details around behaviour, see the source code and test cases of the [internal helpers](https://github.com/meanie/mongoose-set-properties/tree/master/helpers).

## Background

The motivation for this plugin was a bug in Mongoose that would improperly mark all fields of a sub document as modified, even if none of the field values in the sub document had actually changed. This issue has since been fixed, but Mongoose still doesn't do a deep equality check, and the plugin has some additional features that make comparing sub documents easier.

## Issues & feature requests

Please report any bugs, issues, suggestions and feature requests in the [@meanie/mongoose-set-properties issue tracker](https://github.com/meanie/mongoose-set-properties/issues).

## Contributing

Pull requests are welcome! If you would like to contribute to Meanie, please check out the [Meanie contributing guidelines](https://github.com/meanie/meanie/blob/master/CONTRIBUTING.md).

## Sponsor

This package has been kindly sponsored by [Hello Club](https://helloclub.com?source=meanie), an [all in one club and membership management solution](https://helloclub.com?source=meanie) complete with booking system, automated membership renewals, online payments and integrated access and light control. Check us out if you happen to belong to any kind of club or if you know someone who helps run a club!

## License

(MIT License)

Copyright 2016-2022, Adam Reis
