const path = require("path");
//connection to Mainnet or Ropsten
const HDWalletProvider = require("@truffle/hdwallet-provider");
//a test mnemonic (private key) and InfuraToken
const mnemonic =
  "vital just maple tomato humble quick horn gorilla cereal access two mom";
const InfuraToken = "f67704ac36e94096807d62b092b874bf";
console.log("Truffle config has started");

module.exports = {
  contracts_build_directory: path.join(__dirname, "frontend/src/contracts"),
  networks: {
    dev_server: {
      network_id: "*",
      host: "bankosolo.ddns.net",
      port: 8545,
    },
    dev_local: {
      network_id: "*",
      host: "localhost",
      port: 8545,
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          "https://ropsten.infura.io/v3/" + InfuraToken
        );
      },
      network_id: 3,
    },
  },
};

/*
--------------------------------------------------------------------------
>>>>>>>>>>>>>>>>>>>>>>>>>> dev_server Accounts: <<<<<<<<<<<<<<<<<<<<<<<<<<
  Available Accounts
  ==================
  (0) 0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1 (10000 ETH)
  (1) 0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0 (10000 ETH)
  (2) 0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b (10000 ETH)
  (3) 0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d (10000 ETH)
  (4) 0xd03ea8624C8C5987235048901fB614fDcA89b117 (10000 ETH)
  (5) 0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC (10000 ETH)
  (6) 0x3E5e9111Ae8eB78Fe1CC3bb8915d5D461F3Ef9A9 (10000 ETH)
  (7) 0x28a8746e75304c0780E011BEd21C72cD78cd535E (10000 ETH)
  (8) 0xACa94ef8bD5ffEE41947b4585a84BdA5a3d3DA6E (10000 ETH)
  (9) 0x1dF62f291b2E969fB0849d99D9Ce41e2F137006e (10000 ETH)

  Private Keys
  ==================
  (0) 0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d
  (1) 0x6cbed15c793ce57650b9877cf6fa156fbef513c4e6134f022a85b1ffdd59b2a1
  (2) 0x6370fd033278c143179d81c5526140625662b8daa446c22ee2d73db3707e620c
  (3) 0x646f1ce2fdad0e6deeeb5c7e8e5543bdde65e86029e2fd9fc169899c440a7913
  (4) 0xadd53f9a7e588d003326d1cbf9e4a43c061aadd9bc938c843a79e7b4fd2ad743
  (5) 0x395df67f0c2d2d9fe1ad08d1bc8b6627011959b79c53d7dd6a3536a33ab8a4fd
  (6) 0xe485d098507f54e7733a205420dfddbe58db035fa577fc294ebd14db90767a52
  (7) 0xa453611d9419d0e56f499079478fd72c37b251a94bfde4d19872c44cf65386e3
  (8) 0x829e924fdf021ba3dbbc4225edfece9aca04b929d6e75613329ca6f1d31c0bb4
  (9) 0xb0057716d5917badaf911b193b12b910811c1497b5bada8d7711f758981c3773
------------------------------------------------------------------------
truffle migrate --network dev_server --reset
*/
