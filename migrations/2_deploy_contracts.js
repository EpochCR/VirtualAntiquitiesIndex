const VirtualAntiquitiesIndex = artifacts.require("VirtualAntiquitiesIndex");
const Owned = artifacts.require("./owned.sol");

module.exports = function(deployer) {
  deployer.deploy(Owned);
  deployer.link(Owned, VirtualAntiquitiesIndex);
  deployer.deploy(VirtualAntiquitiesIndex);
};
