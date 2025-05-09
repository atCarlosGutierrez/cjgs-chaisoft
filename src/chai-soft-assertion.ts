let softMethods = ["equal", "members", "property", "above", "below", "keys"];
let softChainableMethods = ["include", "contain", "a", "an", "lengthOf"];

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
                console.log("Soft error on", method, " assertion");
                console.log("Message:", error.message);
                console.log("Actual:", error.actual, "Expected:", value);
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
                console.log("Soft error on", method, " assertion");
                console.log("Message:", error.message);
                console.log("Actual:", error.actual, "Expected:", value);
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
