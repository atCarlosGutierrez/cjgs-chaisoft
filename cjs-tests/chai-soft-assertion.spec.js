let chai = require("chai");
let {
  softAssertion,
  addSoftMethod,
  getSoftMethods,
  createSoftAssertion,
} = require("../cjs/chai-soft-assertion.js");

beforeEach(function () {
  chai.use(softAssertion);
  this.expect = chai.expect;
});

describe("Normal hard assertion should work", function () {
  it("Should throw error when soft is not used (equal assertion)", function () {
    const fn = () => {
      this.expect(1).to.equal(2);
    };
    this.expect(fn).to.throw(Error, "expected 1 to equal 2");
  });

  it("Should throw error when soft is not used (include assertion)", function () {
    const fn = () => {
      this.expect([1, 2, 3]).to.contain(4);
    };
    this.expect(fn).to.throw(Error, "expected [ 1, 2, 3 ] to include 4");
  });
});

describe("Including soft assertion library should work", function () {
  it("Should continue if soft assert is used with equal assertion", function () {
    this.expect(2).soft.to.equal(3);
    console.log("Test is not stopeed");
  });

  it("Should continue if soft assert is used with include assertion", function () {
    this.expect([1, 2, 3]).soft.to.include(4);
    console.log("Test is not stopeed");
  });
});

describe("Is possible to extend soft assertion methods", function () {
  it("Should do hard assertion if soft assert is used with a non included method", function () {
    //lengthOf is not included in the soft assertion library
    const fn = () => this.expect(5).to.be.within(1, 3);
    this.expect(fn).to.throw(Error, "expected 5 to be within 1..3");
  });

  it("Should be possible to extend soft assertion methods", function () {
    addSoftMethod("within");
    chai.use(createSoftAssertion(getSoftMethods()));
    this.expect = chai.expect;
    this.expect(5).soft.to.be.within(1, 3);
  });
});
