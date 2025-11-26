/* eslint-disable prefer-rest-params */
const softMethods = ["equal", "members", "property", "above", "below", "keys"];
const softChainableMethods = ["include", "contain", "a", "an", "lengthOf"];

interface SoftError {
  matcher: string;
  message: string;
  actual?: unknown;
  expected?: unknown;
}

class SoftAssertionsCollector {
  public errors: SoftError[] = [];

  add(error: SoftError) {
    this.errors.push(error);
  }

  assertAll() {
    if (this.errors.length > 0) {
      const message = this.errors
        .map(
          (e, i) =>
            `#${i + 1} [${e.matcher}]: ${e.message}` +
            (e.actual !== undefined && e.expected !== undefined
              ? `\n  Actual: ${JSON.stringify(
                  e.actual
                )}\n  Expected: ${JSON.stringify(e.expected)}`
              : "")
        )
        .join("\n\n");
      throw new Error(`Soft assertion failures:\n\n${message}`);
    }
  }

  clear() {
    this.errors = [];
  }
}

export const softAssertionsCollector = new SoftAssertionsCollector();

export function addSoftMethod(softMethod: string | string[]) {
  if (Array.isArray(softMethod)) {
    softMethods.push(...softMethod);
  } else {
    softMethods.push(softMethod);
  }
}

export function getSoftMethods() {
  return softMethods;
}

export function addSoftChainableMethod(softChainableMethod: string | string[]) {
  if (Array.isArray(softChainableMethod)) {
    softChainableMethods.push(...softChainableMethod);
  } else {
    softChainableMethods.push(softChainableMethod);
  }
}

export function getSoftChainableMethods() {
  return softChainableMethods;
}

const flagName = "soft";

export function createSoftAssertion(
  newSoftMethods = softMethods,
  newSoftChainableMethods = softChainableMethods
) {
  return function chaiSoftAssertion(chai, utils) {
    //Creates flag to identify when soft asssertion is used
    utils.addProperty(chai.Assertion.prototype, "soft", function () {
      utils.flag(this, flagName, true);
    });

    //Uses an array of methods to overwrite them including soft assertion logic
    newSoftMethods.forEach(function (method) {
      utils.overwriteMethod(
        chai.Assertion.prototype,
        method,
        function (_super) {
          return function (value) {
            if (utils.flag(this, flagName)) {
              try {
                _super.apply(this, arguments);
              } catch (error) {
                softAssertionsCollector.add({
                  matcher: method,
                  message: error.message,
                  actual: error.actual,
                  expected: value,
                });
              }
            } else {
              _super.apply(this, arguments);
            }
          };
        }
      );
    });

    //Uses an array of chainable methods to overwrite them including soft assertion logic
    newSoftChainableMethods.forEach(function (method) {
      utils.overwriteChainableMethod(
        chai.Assertion.prototype,
        method,
        function (_super) {
          return function (value) {
            if (utils.flag(this, flagName)) {
              try {
                _super.apply(this, arguments);
              } catch (error) {
                softAssertionsCollector.add({
                  matcher: method,
                  message: error.message,
                  actual: error.actual,
                  expected: value,
                });
              }
            } else {
              _super.apply(this, arguments);
            }
          };
        },
        function (_super) {
          return function () {
            _super.apply(this, arguments);
          };
        }
      );
    });
  };
}

export const softAssertion = createSoftAssertion(
  softMethods,
  softChainableMethods
);
