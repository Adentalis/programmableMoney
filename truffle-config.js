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
=================
(0) 0xEB3AdF61738D0B8eC89bb4B515EfC3e1d30932A5 (1000 ETH)
(1) 0x02DF913798eAf34e0239e1a8610ccB53897Ec97A (1000 ETH)
(2) 0x3231C3a55061cDCC9Cb53Afb19B124a6DCE6ed72 (1000 ETH)
(3) 0x6E71CdD9FDF98D621b6004121F08d8D4366f52d4 (1000 ETH)
(4) 0xc7c8DD2932C107D2270559368BDC177F47DD6113 (1000 ETH)
(5) 0x616fB83133E88c25f23F092D71a4813501eC8c12 (1000 ETH)
(6) 0x84087a9f296F0a0cb3A2c6B31f0d9CF45AD4E50e (1000 ETH)
(7) 0x652Ca937797bE77a42394EC0867445084C39AE9b (1000 ETH)
(8) 0xECC6E5aF0A19d42079927D3C1807D5f72FBC9bd4 (1000 ETH)
(9) 0x18F58593Ff0774b62f9C7B9849102cEAf151616d (1000 ETH)

Private Keys
==================
(0) 0xb9e3691be477246389738d6a447edb4161a746fff5faf557bb015ceb9a1b2bf7
(1) 0x50bb677b6c91d3fc1fa18ea686eb911efd39b44e6963919c562767834bf381a4
(2) 0x9addccc2c4bdf367aa40c530ea2fa8199ab3bfc0995033e165388d03ee640f92
(3) 0x9c5ea8105efc92075a608286c5d42ca01bad18ea4a8cd8eea2fc2f86c3a32274
(4) 0x98ab9ee1a05fcd567c8ff6967cc3044f5175a2981b8f50d10a262dddba0ada42
(5) 0xf335dd6c7df052c5687feb16edae1aa2581de5578f53afc9ff4481bc2c93227a
(6) 0x602b8619c866f1cde9e9fb8e4209b43831a0f753869904d1adf34e11f3b6f88a
(7) 0xb5e976d1146030f7df6045d92b99a3dc4d0a0e387858bfbcc274a48b360fbc78
(8) 0x742ab0a69beb8a6fc9cc05fad4cf425c83256ae5d3d70e179be75f3f8d46f897
(9) 0xe8f3cc84d1d5f73c7bd9a4dd812e0cb82ad1ac3eba591ab953a922579ed295cf
-------------------------------------------------------------------------
*/
