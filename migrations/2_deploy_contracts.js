const LotteryFactory = artifacts.require("LotteryFactory");

module.exports = function(deployer) {
  deployer.deploy(LotteryFactory);
};
