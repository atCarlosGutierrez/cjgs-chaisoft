# Chai Soft Assertion

[![build](https://github.com/atCarlosGutierrez/cjgs-chaisoft/actions/workflows/continuous-integration.yml/badge.svg)](https://github.com/atCarlosGutierrez/cjgs-chaisoft/actions)

This package extends [Chai](http://chaijs.com/) library to handle soft assertions by including a "soft" property flag

## Instalation

You can use `npm install --save-dev chai-soft-assert`

## Usage

When using the soft flag, assertion will be executed normally but the failure will not trigger an error and
stop any sequent assertion or process in the test.

Use as a chai plugin:

```js
//Depending on the chai version you are using
//Chai Common JS (4.X)
import chai = require("chai");
import softAssertion = require("chai-soft-assert").default;

//or
//Chai ESM (5.X)
import * as chai from "chai";
import {softAssertion} from "chai-soft-assert";

//Include chai-soft-assert assertion plugin
chai.use(softAssertion);

//Failing assertion with soft flag will not stop test execution
chai.expect([1, 2, 3]).soft.to.contain(4);

//Following assertion will be executed normally
chai.expect(2).to.equal(2)
```

Example console output of a soft assertion:

```shell
Error on: keys soft assertion
Message: expected { a: 1, b: 2 } to have keys 'a', 'b', and 'c'
Actual: [ 'a', 'b' ] Expected: a
...
```

For more examples of use [CommonJS example](https://github.com/atCarlosGutierrez/cjgs-chaisoft/blob/main/cjs-tests/chai-soft-assertion.spec.js)
[ESM example](https://github.com/atCarlosGutierrez/cjgs-chaisoft/blob/main/esm-tests/chai-soft-assertion.spec.ts)

# Supported Methods

- equal, members, property, above, below, keys, include, contain, a, an, lengthOf

# Customized Methods

This plugin allows to extend the supported methods, this is usefull if need to support soft assertion for a third party plugin or additional methods not listed.

For example we can extend soft functionality for "within" assertion:

```javascript
addSoftMethod("within"); //Use addSoftMethod to include a method or multiple methods in the allowed list
chai.use(createSoftAssertion(getSoftMethods())); //Use the customized softMethods
this.expect = chai.expect;
this.expect(5).soft.to.be.within(1, 3); //Use the new added method

//Other examples
addSoftMethod(["within", "containSubset"]);
addSoftChainableMethod("a");
chai.use(createSoftAssertion(getSoftMethods(), getSoftChainableMethods()));
```

\*Caution: Chai differentiates between chainable and non-chainable methods, be carefull where to include the new methods using 'addSoftChainableMethod' or 'addSoftMethod'
