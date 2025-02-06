# Chai Soft Assertion

[![build](https://github.com/atCarlosGutierrez/cjgs-chaisoft/actions/workflows/continuous-integration.yml/badge.svg)](https://github.com/atCarlosGutierrez/cjgs-chaisoft/actions)

This package extends [Chai](http://chaijs.com/) library to handle soft assertions by including a "soft" property flag

## Instalation

You can use `npm install --save-dev chai-soft-assert`

## Usage

Use as a chai plugin:

```js
//Depending on the chai version you are using
//Chai Common JS (4.X)
import chai = require("chai");
import softAssertion = require("chai-soft-assert");

//or
//Chai ESM (5.X)
import * as chai from "chai";
import softAssertion from "chai-soft-assert";

//Include @cjgs/chai-soft-assert assertion plugin
chai.use(softAssertion);

//Failing assertion with soft flag will not stop test execution
chai.expect([1, 2, 3]).soft.to.contain(4);

//Following assertion will be executed normally
chai.expect(2).to.equal(2)
```

When using the soft flag, assertion will be executed normally but the failure will not pop-up an error and
wont stop any sequent assertion or process.

Outcome of the previous code block using mocha:

```shell
Executing Soft Assertion: contain
Message: expected [ 1, 2, 3 ] to include 4
Actual: [ 1, 2, 3 ]
Expected: 4
Executing Hard assertion equal
...
```

# Supported Methods

- equal, containSubset, include, contain
