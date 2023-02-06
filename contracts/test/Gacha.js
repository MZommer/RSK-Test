const hre = require("hardhat");
const assert = require('assert');

const {deployMojo, deployGacha} = require("../utils/helpers");

describe("Gacha", () => {
    it("Check starPlayer generation", async () => {
        const mojo = await deployMojo();
        const gacha = await deployGacha(mojo.address);
    
        const [owner] = await hre.ethers.getSigners();
    
        await mojo.approve(gacha.address, 10);
        await gacha.AcceptPayment();
        
        assert.ok(gacha.isStarPlayer(owner.address));
      });
})