/* eslint-disable @typescript-eslint/no-unused-expressions */
import * as chai from "chai";
import { beforeEach, describe } from "mocha";
import { softAssertionsCollector } from "../esm/chai-soft-assertion.mjs";

describe("SoftAssertionsCollector", () => {
  let collector: typeof softAssertionsCollector;

  beforeEach(() => {
    collector = softAssertionsCollector;
    //Soft Collectors keeps all session run, we need a wait to support parallel runs
    collector.clear();
  });

  it("should start with no errors", () => {
    chai.expect(collector.errors).to.be.an("array").that.is.empty;
  });

  it("should add errors", () => {
    collector.add({
      matcher: "equal",
      message: "expected 1 to equal 2",
      actual: 1,
      expected: 2,
    });
    chai.expect(collector.errors).to.have.lengthOf(1);
    chai.expect(collector.errors[0]).to.include({
      matcher: "equal",
      message: "expected 1 to equal 2",
      actual: 1,
      expected: 2,
    });
  });

  it("should clear errors", () => {
    collector.add({ matcher: "equal", message: "fail" });
    collector.clear();
    chai.expect(collector.errors).to.be.empty;
  });

  it("should throw with all error messages on assertAll", () => {
    collector.add({
      matcher: "equal",
      message: "expected 1 to equal 2",
      actual: 1,
      expected: 2,
    });
    collector.add({
      matcher: "above",
      message: "expected 1 to be above 5",
      actual: 1,
      expected: 5,
    });
    chai
      .expect(() => collector.assertAll())
      .to.throw(
        /Soft assertion failures:[\s\S]*expected 1 to equal 2[\s\S]*expected 1 to be above 5/
      );
  });

  it("should not throw if there are no errors on assertAll", () => {
    chai.expect(() => collector.assertAll()).to.not.throw();
  });
});
