import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import NameContract from "./contracts/NameContract.json";
import NavBar from './NavBar';
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { name: "", newName: "", web3: null, network: null, accounts: null, balance: null, contract: null };

  componentDidMount = async () => {
    try {
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleAccounsChanged = this.handleAccounsChanged.bind(this);

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      const network = await web3.eth.net.getNetworkType();      
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      const balance = await web3.eth.getBalance(accounts[0]);

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = NameContract.networks[networkId];
      const instance = new web3.eth.Contract(
        NameContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      // this.setState({ web3, accounts, contract: instance }, this.runExample); // Wenn Diese Zeile dabei ist, wird direkt am anfang der Letzte Wert gezogen! :)
      this.setState({ web3, network, accounts, balance, contract: instance }, this.runExample);

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleChange(event){
    this.setState({newName: event.target.value});
  }

  async handleAccounsChanged(){
    const { web3 } = this.state;

    const accounts = await web3.wth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);

    this.setState({balance});
  }

  async handleSubmit(event){
    event.preventDefault();

    const { web3, accounts, contract } = this.state;
    await contract.methods.setName(this.state.newName).send({from: accounts[0]});
    const response = await contract.methods.getName().call();
    const balance = await web3.eth.getBalance(accounts[0]);

    this.setState({name: response, balance});
  }

  //window.ethereum.on('accountsChanged', function (accounts){
    //this.runExample();
    //this.setState({accounts});
  //})

  runExample = async () => {
    const { contract } = this.state;

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getName().call();

    // Update state with the result.
    this.setState({ name: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <React.Fragment>
        <NavBar account={this.state.accounts[0]} balance={this.state.balance / 1000000000000000000} network={this.state.network}/>
        <div className="App">
          <h1>Test Project!</h1>
          <div>Der gespeicherte Name lautet: {this.state.name}</div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.newName} onChange={this.handleChange} />
            <input type="submit" value="Ändern" />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
