declare global {
  namespace Chai {
    interface Assertion {
      soft: Assertion;
    }
  }
}

declare const softAssertion: Chai.ChaiPlugin;
export = softAssertion;
