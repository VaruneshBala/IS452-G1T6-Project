var Charity = artifacts.require("./Charity.sol")
expect = require("chai").expect;

contract("Test Charity", function(accounts) {
    describe("Deploying Charity test contract", function() {
        it("should catch test contract instance", function() {
            return Charity.new().then(function(instance) {
                testContract = instance;
            });
        });
    });

    describe("Check contract variables", function() {
        it("should have account[0] as owner", function() {
            return testContract.creator().then(function(res) {
                expect(res.toString()).to.be.equal(accounts[0]);
            });
        });
    });

    describe("Testing charity functions", function() {
        it("creator can add WWF as first charity", function() {
            testContract.addVoteOption("WWF", "0x1000000000000000000000000000000000000000");
            testContract.votingOptions(0).then(function(res) {
                expect(res.toString()).to.be.equal("WWF");
            });
            return testContract.votingOptionAddresses(0).then(function(res) {
                expect(res.toString()).to.be.equal("0x1000000000000000000000000000000000000000");
            });
        });
    });
});
