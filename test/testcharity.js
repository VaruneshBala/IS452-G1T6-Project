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
        it("creator can add new charity", function() {
            testContract.addVoteOption("WWF", "0x1000000000000000000000000000000000000000");
            testContract.votingOptions(0).then(function(res) {
                expect(res.toString()).to.be.equal(
                    "0x5757460000000000000000000000000000000000000000000000000000000000");
            });
            return testContract.votingOptionAddresses(0).then(function(res) {
                expect(res.toString()).to.be.equal("0x1000000000000000000000000000000000000000");
            });
        });
        it("non-creator cannot add new charity", function() {
            testContract.addVoteOption("RedCross", "0x2000000000000000000000000000000000000000",
                                       {from: accounts[1]});
            return testContract.votingOptionsCount().then(function(res) {
                expect(res.toString()).to.be.equal("1");
            });
        });
        it("donations go to correct address", function() {
            testContract.donate({from: accounts[1], value: 100});
            testContract.getBalance().then(function(res) {
                expect(res.toString()).to.be.equal("100");
            });
            return testContract.donations(accounts[1]).then(function(res) {
                expect(res.toString()).to.be.equal("100");
            });
        });
        it("voting cannot proceed without creator calling startVoting", function() {
            testContract.startVoting(100000000, {from: accounts[1]});
            testContract.vote(0, {from: accounts[1]});
            return testContract.votingOptionVotes(0).then(function(res) {
                expect(res.toString()).to.be.equal("0");
            });
        });
    });
});
