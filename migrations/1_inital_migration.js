// "Migrations" is the contract name provided in ./build/contracts/Migrations.json
const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
  // Deploy the Migrations contract as our only task
  deployer.deploy(Migrations);
};
