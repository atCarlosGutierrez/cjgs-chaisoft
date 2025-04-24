const softMethods = ["equal", "containSubset"];
const softChainableMethods = ["include", "contain"];

const flagName = "soft";

function softAssertion(chai, utils) {
  //Creates flag to identify when soft asssertion is used
  utils.addProperty(chai.Assertion.prototype, "soft", function () {
    utils.flag(this, flagName, true);
  });

  //Uses an array of methods to overwrite them including soft assertion logic
  softMethods.forEach(function (method) {
    utils.overwriteMethod(chai.Assertion.prototype, method, function (_super) {
      return function (value) {
        if (utils.flag(this, flagName)) {
          try {
            console.log("Executing Soft Assertion:", method);
            _super.apply(this, arguments);
          } catch (error) {
            console.log("Message:", error.message);
            console.log("Actual:", error.actual);
            console.log("Expected:", value);
          }
        } else {
          console.log("Executing Hard assertion", method);
          _super.apply(this, arguments);
        }
      };
    });
  });

  //Uses an array of chainable methods to overwrite them including soft assertion logic
  softChainableMethods.forEach(function (method) {
    utils.overwriteChainableMethod(
      chai.Assertion.prototype,
      method,
      function (_super) {
        return function (value) {
          if (utils.flag(this, flagName)) {
            try {
              console.log("Executing Soft Assertion:", method);
              _super.apply(this, arguments);
            } catch (error) {
              console.log("Message:", error.message);
              console.log("Actual:", error.actual);
              console.log("Expected:", value);
            }
          } else {
            console.log("Executing Hard assertion", method);
            _super.apply(this, arguments);
          }
        };
      },
      function (_super) {
        return function () {
          console.log("Hard assertion");
          _super.apply(this, arguments);
        };
      }
    );
  });
}

export default softAssertion as Chai.ChaiPlugin;
