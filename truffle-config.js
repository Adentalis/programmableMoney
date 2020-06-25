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
    (0) 0x75C13238A6ae3ACAE4b81Caa4bd16B16BdF0BeB5 (100 ETH)
    (1) 0xaEb030665a6cC90ce4583D3c838404127D4b37Cb (100 ETH)
    (2) 0x058431320e1821a82Dc0273d5A47Eb0De1038A8F (100 ETH)
    (3) 0x1385aa200E4b82E63BF3c0728a92651A666CEAC0 (100 ETH)
    (4) 0x2aC7FAD1F354739A63D9DA100de4B62242332B83 (100 ETH)
    (5) 0x91ce96D567A351a7E8945910c659a6fdCE4F04d7 (100 ETH)
    (6) 0xeE155f1b69D022938D39242849607c6E5DdE907F (100 ETH)
    (7) 0x63fde282C7fC7334455Ef4c0E4CB2EC676E6f606 (100 ETH)
    (8) 0x998Eb3eE7617bA865A916866271aB964c3b2E984 (100 ETH)
    (9) 0xe10D8bBAD1cca221fE4353208b9d8f085FfFC1d6 (100 ETH)
    
    Private Keys
    ==================
    (0) 0xfa7fdef8e95f355bf36567a3795caf55e735ceebf57cc5803ac3fb26f3dbe416
    (1) 0x25fd5300618efc8530cf99aebebadc70dc23adbbf5b2ddc9b961d964be5f5acc
    (2) 0x8f68c03ac416666064c00dd9ea8a5a9543c7251cfcf66f9ccf6e7db9557784cc
    (3) 0x4251e46cab0ac4bfed195f9f85e12e1537f2da5b49205ed6518f47a9b5c604a9
    (4) 0x882ed1c0c3e5add5ec87ae75137a8aa7b24e3610e4c08605230f90654c5009cf
    (5) 0xfb49d17db27e16c68ae38b3d7dcf9f5e77d73476d1cd86551882c10a42233dfd
    (6) 0xfed5d2867176676e55978332d8c2ad5fbe80822eb329d31680bcafa2db0dbb7c
    (7) 0xea1c000ed0d15cf26c2aad57a5befea218a0da8b4100c7b6b27ee12a8a220d5a
    (8) 0xd40f4f1ffc654598f99667e139273566d1ec402a0d354e949f819a68d851d2c9
    (9) 0x6702c076263fcf15cdb184d6b0a8d7a72089075a9f385f95174e86b8a7c73cb5

    ----------------------------------------------------------------------
*/