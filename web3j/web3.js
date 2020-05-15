//https://medium.com/swlh/interacting-with-smartcontracts-via-web3-js-367ea980652c TUTORIAL

const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/f67704ac36e94096807d62b092b874bf");
const web3 = new Web3(provider);
web3.eth.net.isListening()
   .then(() => console.log('web3 is connected'))
   .catch(e => console.log('Wow. Something went wrong'));
const abi=[
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_timeToFreeze",
				"type": "uint256"
			}
		],
		"name": "freezeMoney",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "sendMessage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCurrentTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getMessage",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwnBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwnFreezeEnd",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contract_Address="0x66ffB4d233c7EB2B802Cc90956c843e50d9556f1";
const contract = new web3.eth.Contract(abi, contract_Address);
contract.methods.getCurrentTime().call().then(console.log);

console.log("Hallo");

