# mirage-openapi
[![npm version](https://badge.fury.io/js/mirage-openapi.svg)](https://badge.fury.io/js/mirage-openapi)
[![Build Status](https://travis-ci.org/jlegrone/mirage-openapi.svg?branch=develop)](https://travis-ci.org/jlegrone/mirage-openapi)
[![codecov](https://codecov.io/gh/jlegrone/mirage-openapi/branch/develop/graph/badge.svg)](https://codecov.io/gh/jlegrone/mirage-openapi)

> WARNING: This is a work in progress and is not yet meant for real-world use.  Please feel free to file an issue or open a pull request if you come across any bugs.

**mirage-openapi** is a plugin for ember-cli-mirage that consumes openAPI/swagger documentation and mocks endpoints at runtime.

## Install

```
$ npm install --dev mirage-openapi
```

You'll also need to install `ember-browserify` and `ember-cli-mirage` if not already present:

```
$ ember install ember-browserify ember-cli-mirage
```

## Usage Examples

#### Consume swagger schema:

```javascript
// ./mirage/config.js

import mirageOpenAPI from 'npm:mirage-openapi';

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

#### Override routes defined in swagger schema:

```javascript
// ./mirage/config.js

import mirageOpenAPI from 'npm:mirage-openapi';

export default function() {
  // Custom handler for /pet/:id route
  this.get("/pet/:id", function(schema, request) {
    return schema.pets.find(request.params.id);
  });

  mirageOpenAPI({
    server: this,
    configs: [{
      definition: "http://petstore.swagger.io/v2/swagger.yaml",
      namespace: "/"
    }]
  });
}
```
