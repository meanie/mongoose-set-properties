# meanie-mongoose-set-properties

[![npm version](https://img.shields.io/npm/v/meanie-mongoose-set-properties.svg)](https://www.npmjs.com/package/meanie-mongoose-set-properties)
[![node dependencies](https://david-dm.org/meanie/mongoose-set-properties.svg)](https://david-dm.org/meanie/mongoose-set-properties)
[![github issues](https://img.shields.io/github/issues/meanie/mongoose-set-properties.svg)](https://github.com/meanie/mongoose-set-properties/issues)
[![codacy](https://img.shields.io/codacy/e178bf57ecbf469e97c1f03d44a8cca9.svg)](https://www.codacy.com/app/meanie/mongoose-set-properties)


A helper plugin for Mongoose to only set properties on a model that have changed, for use with [Meanie Express Seed](https://github.com/meanie/express-seed) projects

![Meanie](https://raw.githubusercontent.com/meanie/meanie/master/meanie-logo-full.png)

## Installation

You can install this package using `npm`.

```shell
npm install meanie-mongoose-set-properties --save
```

## Usage

The motivation for this plugin was a bug in Mongoose that would improperly mark all fields of a sub document as modified, even if none of the field values in the sub document had actually changed. This issue has since been fixed, but the plugin has some additional features that make comparing sub documents easier.

```js

```

## Issues & feature requests

Please report any bugs, issues, suggestions and feature requests in the [meanie-mongoose-set-properties issue tracker](https://github.com/meanie/mongoose-set-properties/issues).

## Contributing

Pull requests are welcome! If you would like to contribute to Meanie, please check out the [Meanie contributing guidelines](https://github.com/meanie/meanie/blob/master/CONTRIBUTING.md).

## Credits

* Meanie logo designed by [Quan-Lin Sim](mailto:quan.lin.sim+meanie@gmail.com)

## License
(MIT License)

Copyright 2016-2017, [Adam Reis](http://adam.reis.nz)
