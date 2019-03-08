const FaucetToken = artifacts.require("FaucetToken");

module.exports = function(deployer) {
  deployer.deploy(FaucetToken)
};
