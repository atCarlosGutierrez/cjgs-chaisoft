import * as chai from "chai";
import { beforeEach, describe } from "mocha";
import softAssertion from "../dist/chai-soft-assertion";

describe("Normal hard assertion should work", function () {
  chai.use(softAssertion);
  const expect = chai.expect;

  it("Should throw equal error", function () {
    const fn = () => {
      expect(1).to.equal(2);
    };
    expect(fn).to.throw(chai.AssertionError, "expected 1 to equal 2");
  });

  it("Should throw include error", function () {
    const fn = () => {
      expect([1, 2, 3]).to.contain(4);
    };
    expect(fn).to.throw(
      chai.AssertionError,
      "expected [ 1, 2, 3 ] to include 4"
    );
  });
});

describe("Including soft assertion library should work", function () {
  chai.use(softAssertion);
  const expect = chai.expect;

  it("Should soft assert with equal", function () {
    expect(2).soft.to.equal(3);
    console.log("Test is not stopeed")
  });

  it("Should soft assert with include", function () {
    expect([1, 2, 3]).soft.to.contain(4);
    expect(2).to.equal(2)
  });
});
