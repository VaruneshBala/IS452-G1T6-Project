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
    $.getJSON('Adoption.json', function(data) {
  // Get the necessary contract artifact file and instantiate it with truffle-contract
  var AdoptionArtifact = data;
  App.contracts.Adoption = TruffleContract(AdoptionArtifact);

  // Set the provider for our contract
  App.contracts.Adoption.setProvider(App.web3Provider);

  // Use our contract to retrieve and mark the adopted pets
  return App.markAdopted();
});

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  markAdopted: function(adopters, account) {
  var adoptionInstance;

  App.contracts.Adoption.deployed().then(function(instance) {
    adoptionInstance = instance;

    return adoptionInstance.getAdopters.call();
  }).then(function(adopters) {
    for (i = 0; i < adopters.length; i++) {
      //Ethereum initializes the array with 16 empty addresses; that's why we check for empty address instead of null/false
      if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
        $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
      }
    }
  }).catch(function(err) {
    console.log(err.message);
  });
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));

    var adoptionInstance;

 //use web3 to get the user's accounts
  web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  App.contracts.Adoption.deployed().then(function(instance) {
    adoptionInstance = instance;

    // Execute adopt as a transaction by sending account
    return adoptionInstance.adopt(petId, {from: account});
  }).then(function(result) {
    //sync the UI with our newly stored data
    return App.markAdopted();
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
