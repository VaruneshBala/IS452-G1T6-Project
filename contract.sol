pragma solidity ^0.4.18;
contract Charity {

    string public name;
    address public creator; // TODO multiple creators/admins?
    mapping (address => uint) public donations;
    string[] public votingOptions;
    address[] public votingOptionAddresses;

    event optionAdded(string option, address optionAddress);
    event donated(address donor, uint donationAmount);

    // Constructor
    function Charity(string _name) public {
    name = _name;
    creator = msg.sender;
    }

    function addVoteOption(string option, address optionAddress) public {
        if (msg.sender == creator) {
            votingOptions.push(option);
            votingOptionAddresses.push(optionAddress);
            emit optionAdded(option, optionAddress);
        }
    }

    // // Locks in the options and allows donors to start voting
    // function startVoting() {

    // }


    // // Allows one to vote for one of the choices, which will be weighted
    // function vote() public {

    // }

    // // Can be called by anyone after the current voting period ends, to donate to the voted for cause
    // function disperse() public {

    // }

    // Allows any individual to donate ethereum to this charity.
    function donate() public payable {
        donations[msg.sender] += msg.value;
        emit donated(msg.sender, msg.value);
    }

    function getBalance () public constant returns (uint) {
        return address(this).balance;
    }

    function getVotingOption (uint index) public constant returns (string, address) {
        return (votingOptions[index], votingOptionAddresses[index]);
    }
}