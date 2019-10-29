const path = require("path");
const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');

let secrets;

if (fs.existsSync('app/secrets.json')) {
  secrets = JSON.parse(fs.readFileSync('./app/secrets.json', 'utf8'));
}

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    development: {
      network_id: "*",
      host: "127.0.0.1",
      // port: 7545,
      // port: 8545,     // ganache-cli
      port: 9545,        // truffle develop
      network_id: "*" // Match any network id
    },
    production: {
      provider: new HDWalletProvider(secrets.mnemonic, secrets.kaleidoUrl),
      network_id: '*',
      gas: 4700000
    }
  }
};