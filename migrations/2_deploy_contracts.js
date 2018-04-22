var Adoption = artifacts.require("./charity.sol");

module.exports = function(deployer) {
    deployer.deploy(Charity);
};
