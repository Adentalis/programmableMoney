const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: { 
    dev_server: { 
      network_id: "*", 
      host: 'bankosolo.ddns.net', 
      port: 8545 
    },
	  dev_local: { 
      network_id: "*", 
      host: 'localhost', 
      port: 8545 
    } 
  }
};


/*
--------------------------------------------------------------------------
>>>>>>>>>>>>>>>>>>>>>>>>>> dev_server Accounts: <<<<<<<<<<<<<<<<<<<<<<<<<<

    Available Accounts
    ==================

    (0) 0x1562200173ab4ea485c692b88716a0e2F88d3768 (100 ETH)
    (1) 0x2E319ADA378cd5c0321D025ff00fE9D3f0B61D4c (100 ETH)
    (2) 0xA112c2ffe5810Be814d2F4d600efEB2D51e583F1 (100 ETH)
    (3) 0x39F2aaA4AE2717B03c4E92c31D5a66060CDdcc73 (100 ETH)
    (4) 0xc46064ec60fC3cc095b786F1E4C5a9b2d5dCcBf0 (100 ETH)
    (5) 0x3c571a1b4A79D08FC272Cb8143C98E0E250E08Eb (100 ETH)
    (6) 0x62dE4B10c5f7beE6c7FD820f5ac1e0BCf04C8FDF (100 ETH)
    (7) 0xd2F266D3d272FdBeAdd1dEDF6Bb51C3A6c5C42E1 (100 ETH)
    (8) 0x5bD191472BA2fafE2f3ceA94c0Dc36A6A1E4dA67 (100 ETH)
    (9) 0x73ebeB2fAB61806Adbc53536c33533369F6436d3 (100 ETH)

    Private Keys
    ==================
    (0) 0x2ec3522a923052f3aba85126abaecb215560df4c4804b3c441891efaa199b4b2
    (1) 0xf0fc1e0bf9c11bab995c1a2d410ecab2778632ea6db00bd344f71b3e8a73f252
    (2) 0x30b71cd3f622d1ba6520dd4e83417fae4441e3da94fa821d37bcec4e0debf63d
    (3) 0x7ce6758ccf5e0d8610f8538ba6ead3ca86b2147a46068f58dec693093b82f899
    (4) 0xf3241dd2d8de74183b43fc0f524ea8a33bb976afad2be8542d5fffca4d6e093e
    (5) 0xfdfb2a6f1f045db30f5c662441bf66fa0634a7d0965bb0fe202d8c9bb9ab3b22
    (6) 0xa50f639b5067756c387843c30c16167ce5efc30c8ed78d4de850df0d16a29638
    (7) 0xd1eae525a7a206a1d6c80fdc46787420f1a894803fe6666eaa42924252d4b59d
    (8) 0x9795aa20e27fc5b7b5df12e0cc612a449162cfc7dcdb6d215a1d0c53ccd70ede
    (9) 0xe761f139d99707b3b2d93f1bf1d6c51b6630fcdc09f9d54c6248a75ef1cedb77
    ----------------------------------------------------------------------
*/