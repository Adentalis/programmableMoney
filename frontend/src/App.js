import React, { Component } from "react";

import NavigationBar from "./component/NavigationBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import FreezeContainer from "./component/container/FreezeContainer/FreezeContainer.js";
import MessageContainer from "./component/container/MessageContainer/MessageContainer.js";
import InfoContainer from "./component/container/InfoContainer/InfoContainer.js";
import SendContainer from "./component/container/SendContainer/SendContainer.js";

import NameContract from "./contracts/NameContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = {
    name: "",
    newName: "",
    web3: null,
    network: null,
    accounts: null,
    balance: null,
    contract: null,
  };

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
        deployedNetwork && deployedNetwork.address
      );

      this.setState({ web3, network, accounts, balance, contract: instance });
      //this.setState({ web3, network, accounts, balance, contract: instance }, this.runExample);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  handleChange(event) {
    this.setState({ newName: event.target.value });
  }

  async handleAccounsChanged() {
    const { web3 } = this.state;

    const accounts = await web3.wth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);

    this.setState({ balance });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const { web3, accounts, contract } = this.state;
    await contract.methods
      .setName(this.state.newName)
      .send({ from: accounts[0] });
    const response = await contract.methods.getName().call();
    const balance = await web3.eth.getBalance(accounts[0]);

    this.setState({ name: response, balance });
  }

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
        <Router>
          <NavigationBar
            account={this.state.accounts[0]}
            balance={this.state.balance / 1000000000000000000}
            network={this.state.network}
          />
          <div className="content">
            <div className="left">
              <Switch>
                <Route path="/message" component={MessageContainer} />
                <Route path="/send" component={SendContainer} />
                <Route path="/freeze" component={FreezeContainer}/>
              </Switch>
            </div>
            <div className="right">
              <InfoContainer />
            </div>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
