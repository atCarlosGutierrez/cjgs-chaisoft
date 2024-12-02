import * as chai from "chai";
import { beforeEach, describe } from "mocha";
import softAssertion from "../dist/chai-soft-assertion";

beforeEach(function () {
  chai.use(softAssertion);
  this.expect = chai.expect;
});

describe("Normal hard assertion should work", function () {
  it("Should throw equal error", function () {
    const fn = () => {
      this.expect(1).to.equal(2);
    };
    this.expect(fn).to.throw(chai.AssertionError, "expected 1 to equal 2");
  });

  it("Should throw include error", function () {
    const fn = () => {
      this.expect([1, 2, 3]).to.contain(4);
    };
    this.expect(fn).to.throw(
      chai.AssertionError,
      "expected [ 1, 2, 3 ] to include 4"
    );
  });
});

describe("Including soft assertion library should work", function () {
  it("Should soft assert with equal", function () {
    this.expect(2).soft.to.equal(3);
    console.log("Test is not stopeed");
  });

  it("Should soft assert with include", function () {
    this.expect([1, 2, 3]).soft.to.include(4);
    this.expect(2).to.equal(2);
  });
});
