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
  (0) 0x1206128fCb0FCEBf0e42C81499D451F33AF06D65 (100 ETH)
  (1) 0xcaCbd1688B8a3cf6310d35B99C04c537f2c33849 (100 ETH)
  (2) 0x72E50e9D5356540DA2369961Ac7F44C4f9242EaD (100 ETH)
  (3) 0xcA5F60587fbb86ccB24CaafA2477ef63083821c8 (100 ETH)
  (4) 0x8C8b799514edD8D21940B1553c568645CFC773F9 (100 ETH)
  (5) 0x3cDb1391784D992d6f0F252C63A81513eF0fd34b (100 ETH)
  (6) 0x7982596c14A9d683908ee97b199903562D596974 (100 ETH)
  (7) 0x390F42F1bc37998D166Ed5f8017BCc0b0a0d74a3 (100 ETH)
  (8) 0x007Df14Cb4afbEC53eEDB0F79d88D090DBB8985E (100 ETH)
  (9) 0x59CdFef394Bf62D3854dbd46f0524dED70FD409b (100 ETH)

  Private Keys
  ==================
  (0) 0x0ba2496f981af1254f26eccc846d4646d41542b55c708b73698e913d43a7f56a
  (1) 0x4c37284ab1170402b5cfbd3f2e0877d6a244c2a773f78e4e16792ead7d7b5991
  (2) 0x99bcd5cbfe75b560e1672ceb5f98e2afc9d432096c9c51f83bac927b894c1433
  (3) 0x8f42cd2a5466d0a4b85fbbc967aee2847361eb89d6c14cd45f0e707214bf765d
  (4) 0xeacb175e66def9bc495fdd7a5c87a0890ae77c667a680e5c626bbcce894c5cf9
  (5) 0xb7cc30e8a187179fea5b52a9862d249bfaab4ff9f7e85a5205d95aae96eba577
  (6) 0x201f81b1d346fd4554aab10625c9bdb5a2e2d367cba2b2e6f0093fb83cc29f0f
  (7) 0xc90ed60dbae74b793a58969fe3e6cfa8f4116bc4829b7bb514712c05182aefef
  (8) 0x622d0185eb9e19b5c114876cf0e755833dc6db6136d4771d40b3aa3896903a89
  (9) 0x447b717a0473d04164ee49868667e9abf41712a72cd8db787b0a1760d7c23a55
--------------------------------------------------------------------------
*/
