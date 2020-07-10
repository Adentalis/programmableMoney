import Bank from './contracts/Bank.json'

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://bankosolo.ddns.net:8545'
    }
  },
  contracts: [
    Bank
  ],
  polls: {
    accounts: 1500
  }
}

export default drizzleOptions