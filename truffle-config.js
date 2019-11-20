const path = require("path");
const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');

let secrets;

if (fs.existsSync('./app/secrets.json')) {
  secrets = JSON.parse(fs.readFileSync('./app/secrets.json', 'utf8'));
}

module.exports = {
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    truffle: {
      network_id: "*",
      host: "127.0.0.1",
      port: 9545,        // truffle develop
    },
    ganache: {
      network_id: "*",
      host: "127.0.0.1",
      port: 8545,     // ganache-cli
    },
    production: {
      provider: new HDWalletProvider(secrets.mnemonic, secrets.kaleidoUrl),
      network_id: '*',
      gas: 4700000
    }
  }
};