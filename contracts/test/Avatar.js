const hre = require("hardhat");
const assert = require('assert');

const { deployMojo, deployGacha, deployAvatar } = require("../utils/helpers");

describe("Avatar", () => {
    it("Check if a starPlayer can mint an avatar", async () => {
        const mojo = await deployMojo();
        const gacha = await deployGacha(mojo.address);
        const avatar = await deployAvatar(gacha.address);
    
        
        const [owner] = await hre.ethers.getSigners();
        await mojo.approve(gacha.address, 10);
        await gacha.AcceptPayment();
        // Makes owner a star player
        await avatar.mint();
    
      });
      it("Check if a anyone can mint an avatar", async () => {
        const mojo = await deployMojo();
        const gacha = await deployGacha(mojo.address);
        const avatar = await deployAvatar(gacha.address);
        
        await assert.rejects(avatar.mint());
      });
})