App = {
  web3Provider: null,
  contracts: {},
//init templates for voting causes
  init: function() {
    // Load causes.
    $.getJSON('../causes.json', function(data) {
      var causesRow = $('#causesRow');
      var causeTemplate = $('#causeTemplate');

      for (i = 0; i < data.length; i ++) {
        console.log(data[i].name);

        causeTemplate.find('.panel-title').text(data[i].name);
        causeTemplate.find('img').attr('src', data[i].picture);
        causeTemplate.find('.location').text(data[i].location);
        causeTemplate.find('.description').text(data[i].description);
        causeTemplate.find('.btn-vote').attr('data-id', data[i].id);

        causesRow.append(causeTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance?
if (typeof web3 !== 'undefined') {
  App.web3Provider = web3.currentProvider;
} else {
  // If no injected web3 instance is detected, fall back to Ganache
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

//Belows are functions related to contract
  initContract: function() {
    $.getJSON('Charity.json', function(data) {
  // Get the necessary contract artifact file and instantiate it with truffle-contract
  var CharityArtifact = data;
  App.contracts.Charity = TruffleContract(CharityArtifact);

  // Set the provider for our contract
  App.contracts.Charity.setProvider(App.web3Provider);
  App.initialize();

});

    return App.bindEvents();
  },

  initialize: function() {
    //use web3 to get the user's accounts: what accounts?
     web3.eth.getAccounts(function(error, accounts) {
     if (error) {
       console.log(error);
     }
     web3.eth.getBalance(accounts[0],function(error, balance) {
      $("#balance").text("Your balance: "+web3.fromWei(balance, "ether")+" BTH");
})

     })


  },

//after clicking on vote or donate
  bindEvents: function() {
    $(document).on('click', '.btn-donate', App.handleDonate);
    $(document).on('click', '.btn-vote', App.handleVote);
  },

 handleDonate: function(event) {
   //if this method is called, the default action of the event will not be triggered
   event.preventDefault();

   var amount=document.getElementById("amount").value;
   web3.eth.getAccounts(function(error, accounts) {
   if (error) {
     console.log(error);
   }

   var account = accounts[0]; //how to refer to the user account

   App.contracts.Charity.deployed().then(function(instance) {
     votingInstance = instance;
     // Execute voting as a transaction by sending account
     var value= web3.toWei(amount, "ether");
     votingInstance.donate({from: account, value: value})
     .then(function() {
       //check the charity balance
       votingInstance.getBalance().then(function(res) {
           console.log(res.toString())
       });
     });
   }).then(function(result) {
     //after successfully calling vote function in contract, sync the UI with our newly stored data
   $('.btn-donate').text('Success').attr('disabled', true);
   }).catch(function(err) {
     console.log(err.message);
   });
 });


 },


  handleVote: function(event) {
    //if this method is called, the default action of the event will not be triggered
    event.preventDefault();

    //event.target is button with data-id for a given cause
    var causeId = parseInt($(event.target).data('id'));

    var votingInstance;

 //use web3 to get the user's accounts:
  web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0]; //how to refer to the user account

  App.contracts.Charity.deployed().then(function(instance) {
    votingInstance = instance;
    // Execute voting as a transaction by sending account
    votingInstance.addVoteOption("WWF", "0x1000000000000000000000000000000000000000");
    //votingInstance.vote(0);
  }).then(function(result) {
    //after successfully calling vote function in contract, sync the UI with our newly stored data
  $('.panel-vote').eq(causeId).find('button').text('Success').attr('disabled', true);
  }).catch(function(err) {
    console.log(err.message);
  });
});
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
