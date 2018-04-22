var Charity = artifacts.require("./Charity.sol");

contract('Charity', function(addVoteOption) {
  it("should add WWF as first option", function() {
    return Charity.deployed().then(function(instance) {
      return instance.addVoteOption.call("WWF", 0x1000000000000000000000000000000000000000);
  }).then(function(votingOptionAddresses) {
      assert.equal(votingOptionAddresses[0], '0x1000000000000000000000000000000000000000', "address incorrect");
    });
  });
});
