# Chai Soft Assertion

[![build](https://github.com/atCarlosGutierrez/cjgs-chaisoft/actions/workflows/continuous-integration.yml/badge.svg)](https://github.com/atCarlosGutierrez/cjgs-chaisoft/actions)

This package extends [Chai](http://chaijs.com/) library to handle soft assertions by including a "soft" property flag

## Instalation

You can use `npm install --save-dev @cjgs/chai-soft-assert`

## Usage

Use as a chai plugin:

```js
//Depending on the chai version you are using
//Chai Common JS (4.)
import chai = require("chai");
import softAssertion = require("@cjgs/chai-soft-assert");

//or
//Chai ESM (5.)
import * as chai from "chai";
import softAssertion from "@cjgs/chai-soft-assert";

//Include @cjgs/chai-soft-assert assertion plugin
chai.use(softAssertion);

//Failing assertion with soft flag will not stop test execution
expect([1, 2, 3]).soft.to.contain(4);

//Following assertion will be executed normally
expect(2).to.equal(2)
```

When using the soft flag, assertion will be executed normally but the failure will be handled internalyl and
wont stop any sequent assertion or process.

Outcome of the previous code block:

```shell
Executing Soft Assertion: contain
Message: expected [ 1, 2, 3 ] to include 4
Actual: [ 1, 2, 3 ]
Expected: 4
Executing Hard assertion equal
.

  1 passing
```

# Supported Methods

- equal, containSubset, include, contain
