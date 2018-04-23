# Using Ethereum Smart Contracts to Democratize Charities
Xueshan (Jessie) Bai, William Sun, Xi (Stanley) Wang, and Elaine Wong

## Testing
To run the Truffle tests, first install the node dependencies using `npm install` in the root project directory.

Then, compile the smart contracts using `truffle compile`.

In a new terminal window, run `ganache-cli -p=7545` to start the dummy blockchain. You can also download the Ganache GUI [here](http://truffleframework.com/ganache) and start it up.

Migrate the smart contracts to the contract by running `truffle migrate`.

Run the truffle tests by using `truffle test`.
