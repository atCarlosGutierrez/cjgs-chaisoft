/// <reference types="chai" />

declare global {
  namespace Chai {
    interface Assertion {
      soft: Assertion;
    }
  }
}

declare const softAssertion: Chai.ChaiPlugin;
export default softAssertion;
