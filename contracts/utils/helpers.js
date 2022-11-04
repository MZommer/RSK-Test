const hre = require("hardhat");

module.deployMojo = async () => {
    const Mojo = await hre.ethers.getContractFactory("Mojo");
    const mojo = await Mojo.deploy();
    await mojo.deployed();
    return mojo;
}
module.deployGacha = async (mojoAddress) => {
  const Gacha = await hre.ethers.getContractFactory("Gacha");
  const gacha = await Gacha.deploy(mojoAddress);
  await gacha.deployed();
  return gacha;
}
module.deployAvatar =  async (gachaAddress) => {
  const Avatar = await hre.ethers.getContractFactory("Avatar");
  const avatar = await Avatar.deploy(gachaAddress);
  await avatar.deployed();
  return avatar;
}

module.skipBlocks = async (nbBlocks) => {
  await Promise.all(Array(nbBlocks).map(() => ethers.provider.send("evm_mine", [1000])))
}

