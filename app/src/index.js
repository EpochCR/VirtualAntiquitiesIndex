import Web3 from "web3";
import virtualAntiquitiesIndexArtifact from "../../build/contracts/VirtualAntiquitiesIndex.json";

const App = {
  web3: null,
  account: null,
  vai: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = virtualAntiquitiesIndexArtifact.networks[networkId];
      this.vai = new web3.eth.Contract(
        virtualAntiquitiesIndexArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      this.welcome();
      this.owners();
    } catch (error) {
      console.error("Could not connect to Virtual Antiquities Index contract or Ethereum Network.");
    }
  },

  welcome: async function() {
    const welcomeMessageElement = document.getElementsByClassName("welcomeMessage")[0];
    const welcomeMessage = this.vai.methods.welcomeMessage().call((err, result) => { welcomeMessageElement.innerHTML = result })
  },
  owners: async function() {
    const numberOwnersElement = document.getElementsByClassName("numberOwners")[0];
    const ownerNumbers = this.vai.methods.numberOwners().call((err, result) => { numberOwnersElement.innerHTML = result })
  },
    /*
    string memory ownerName, address controllerAddress, uint256 numberControllers,
        bool isPrivateEntity, string memory contactInformation, string memory registrationDate
    * */
  createAntiquitiesOwner: async function() {
    const ownerName = document.getElementById("ownerName").value;
    const controllerAddress = document.getElementById("controllerAddress").value;
    const contactInformation = document.getElementById("contactInformation").value;
    const registrationDate = document.getElementById("registrationDate").value;
    this.setStatus("Creating new Antiquity Owner: " + ownerName + " (please wait)...");
    const { createAntiquityOwner } = this.vai.methods;
    await createAntiquityOwner(ownerName, controllerAddress, contactInformation, registrationDate).send({ from: this.account });
    this.setStatus("Creation completed! " + ownerName + " @ " + controllerAddress + " added to VAI.");
    this.owners();
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:9545"),
    );
  }

  App.start();
});
