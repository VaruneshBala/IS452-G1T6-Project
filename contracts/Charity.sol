pragma solidity ^0.4.18;

contract Charity {

    address public creator; // TODO: multiple creators/admins?
    mapping (address => uint) public donations; // TODO: make it easier to see everyone's donations
    string[] public votingOptions;  // TODO: Convert to bytes32
    address[] public votingOptionAddresses;
    uint[] public votingOptionVotes;
    uint public votingOptionsCount;
    uint public startTime;
    uint public endTime;

    event optionAdded(string option, address optionAddress);
    event donated(address donor, uint donationAmount);

    // Constructor
    function Charity() public {
        creator = msg.sender;
        startTime = 2**256 - 1;
        endTime = 2**256 - 1;
    }

    // The creator can add voting options before voting starts
    // @param option: the name of the charity being added
    // @param address: the address of the charity's wallet
    function addVoteOption(string option, address optionAddress) public {
        if (msg.sender == creator && startTime == (2**256 - 1)) {
            // TODO: Make this less susceptible to gas attacks; we need a max # of charities
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
    // @param duration: time that voting will be allowed, in seconds
    // TODO: confirm it's seconds
    function startVoting(uint duration) public {
        if (msg.sender == creator && now < endTime) {
            startTime = now;
            endTime = now + duration;
        }
    }

    // Allows one to vote for one of the choices, which will be weighted; remove voter's balance
    // @param option: the index of the option to vote for
    function vote(uint option) public {
        if (isVotingActive() && option < votingOptionsCount) {
            uint temp = donations[msg.sender];
            donations[msg.sender] = 0;
            votingOptionVotes[option] += temp;
        }
    }

    function isVotingActive() public returns (bool) {
        return (now >= startTime && now <= endTime);
    }

    // Called after the current voting period ends to donate to the majority vote cause
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
            startTime = 2 ** 256 - 1;
            endTime = 2 ** 256 - 1;
            if (maxIndex == 2 ** 256 - 1) {
                // TODO: Handle case where no one voted
            } else {
                votingOptionAddresses[maxIndex].transfer(address(this).balance);
            }
            return true;
        }
        return false;
    }

    // Allows any individual to donate ethereum to this charity
    function donate() public payable {
        donations[msg.sender] += msg.value;
        emit donated(msg.sender, msg.value);
    }

    function getBalance() public constant returns (uint) {
        return address(this).balance;
    }

    // Get which charity is at a certain index
    // @param index: the index of the voting option
    function getVotingOption (uint index) public constant returns (string, address) {
        if (index < votingOptionsCount) {
            return (votingOptions[index], votingOptionAddresses[index]);
        } else {
            return ("null", 0);
        }
    }
}
