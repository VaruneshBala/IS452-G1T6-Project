pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Charity.sol";

contract TestCharity {
    Charity charity = Charity(DeployedAddresses.Charity());

    function testCreatorCanAddVoteOption() public {
        address test_address = 0x1000000000000000000000000000000000000000;
        charity.addVoteOption("WWF", test_address);
        address returnAddr = charity.votingOptionAddresses(0);
        Assert.equal(returnAddr, test_address, "votingOptionAddresses[0] incorrect");
    }
}
