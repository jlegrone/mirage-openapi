# mirage-openapi
[![npm version](https://badge.fury.io/js/mirage-openapi.svg)](https://badge.fury.io/js/mirage-openapi)
[![Build Status](https://travis-ci.org/jlegrone/mirage-openapi.svg?branch=develop)](https://travis-ci.org/jlegrone/mirage-openapi)
[![codecov](https://codecov.io/gh/jlegrone/mirage-openapi/branch/develop/graph/badge.svg)](https://codecov.io/gh/jlegrone/mirage-openapi)

> WARNING: This is a work in progress and is not yet meant for real-world use.  Please feel free to file an issue or open a pull request if you come across any bugs.

## Install

```
$ npm install --dev mirage-openapi
```

## Usage Example:

```javascript
// ./mirage/config.js

import mirageOpenAPI from 'mirage-openapi';

export default function() {
  mirageOpenAPI({
    server: this,
    configs: [{
      definition: "http://petstore.swagger.io/v2/swagger.json",
      namespace: "http://petstore.swagger.io/v2"
    }]
  });
}
```
