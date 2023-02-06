const hre = require("hardhat");

module.exports = {
  async deployMojo() {
    const Mojo = await hre.ethers.getContractFactory("Mojo");
    const mojo = await Mojo.deploy();
    await mojo.deployed();
    return mojo;
  },
  async deployGacha(mojoAddress) {
    const Gacha = await hre.ethers.getContractFactory("Gacha");
    const gacha = await Gacha.deploy(mojoAddress);
    await gacha.deployed();
    return gacha;
  },
  async deployAvatar(gachaAddress) {
    const Avatar = await hre.ethers.getContractFactory("Avatar");
    const avatar = await Avatar.deploy(gachaAddress);
    await avatar.deployed();
    return avatar;
  },

  async skipBlocks(nbBlocks) {
    await Promise.all(Array(nbBlocks).map(() => ethers.provider.send("evm_mine", [1000])))
  },
};
