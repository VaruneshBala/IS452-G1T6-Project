pragma solidity ^0.4.18;

contract Charity {

    string public name;
    address public creator; // TODO extension: multiple creators/admins?
    mapping (address => uint) public donations; //TODO make it easier to see everyone's donations
    string[] public votingOptions;
    address[] public votingOptionAddresses;
    uint[] public votingOptionVotes;
    uint public votingOptionsCount;

    uint public endTime;

    event optionAdded(string option, address optionAddress);
    event donated(address donor, uint donationAmount);

    // Constructor
    function Charity(string _name) public {
        name = _name;
        creator = msg.sender;

        endTime = 2**256 - 1;
    }

    // The creator can add voting options. Must be done one at a time due to limitations in Solidity (?)
    function addVoteOption(string option, address optionAddress) public {
        if (msg.sender == creator && now < endTime) {
            if (votingOptions.length <= votingOptionsCount) {
                votingOptions.push("");
                votingOptionAddresses.push(0);
                votingOptionVotes.push(0);
            }
            votingOptions[votingOptionsCount] = option;
            votingOptionAddresses[votingOptionsCount] = optionAddress;
            votingOptionVotes[votingOptionsCount] = 0;
            votingOptionsCount++;
            emit optionAdded(option, optionAddress);
        }
    }

    // Locks in the options and allows donors to start voting
    // @param duration: time that voting will be allowed, in seconds TODO confirm it's seconds
    function startVoting(uint duration) {
        if (msg.sender == creator && now < endTime) {
            endTime = now + duration;
        }
    }


    // Allows one to vote for one of the choices, which will be weighted
    function vote(uint option) public {
        uint temp = donations[msg.sender];
        donations[msg.sender] = 0;
        votingOptionVotes[option] += temp;
    }

    // Can be called by anyone after the current voting period ends, to donate to the voted for cause
    function disperse() public returns (bool){
        // https://ethereum.stackexchange.com/questions/3373/how-to-clear-large-arrays-without-blowing-the-gas-limit
        if (now >= endTime) {
            uint maxVotes = 0;
            uint maxIndex = 2 ** 256 - 1;
            for (uint i = 0; i < votingOptionsCount; i++) {
                if (votingOptionVotes[i] > maxVotes) {
                    maxIndex = i;
                    maxVotes = votingOptionVotes[i];
                }
            }
            votingOptionsCount = 0;
            endTime = 2 ** 256 - 1;
            if (maxIndex == 2 ** 256 - 1) {
                // No one voted, TODO handle
            } else {
                votingOptionAddresses[maxIndex].transfer(address(this).balance);
            }
            return true;
        }
        return false;
    }

    // Allows any individual to donate ethereum to this charity.
    function donate() public payable {
        donations[msg.sender] += msg.value;
        emit donated(msg.sender, msg.value);
    }

    function getBalance () public constant returns (uint) {
        return address(this).balance;
    }

    function getVotingOption (uint index) public constant returns (string, address) {
        if (index < votingOptionsCount) {
            return (votingOptions[index], votingOptionAddresses[index]);
        } else {
            return ("null", 0);
        }
    }
}
