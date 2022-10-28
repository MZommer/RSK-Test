const hre = require("hardhat");

async function main() {
  const Mojo = await hre.ethers.getContractFactory("Mojo");
  const mojo = await Mojo.deploy(200);
  mojo.deployed()
      .then(mojo => console.log("Token deployed successfuly"));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
