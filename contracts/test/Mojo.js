const hre = require("hardhat");
const { assert } = require("chai");

async function deploy() {
    const Mojo = await hre.ethers.getContractFactory("Mojo");
    const mojo = await Mojo.deploy();
    await mojo.deployed();
    return mojo;
}

describe("Mojo", () => {
  it("Deploy", async () => {
    const mojo = await deploy();
    // checks msg.sender balance is 100
    const [owner] = await hre.ethers.getSigners();
    console.log(await mojo.balanceOf(owner))
    assert.equal(await mojo.balanceOf(owner), 100);
  });
  it("Make transactions", async () => {
    // random addresses
    const tx = [{
        address: "0x29D7d1dd5B6f9C864d9db560D72a247c178aE86B",
        amount: 10,
    },{
        address: "0xf07ba2229b4da47895ce0a4ab4298ad7f8cb3a4d",
        amount: 20,
    },{
        address: "0x29d7d1dd5b6f9c864d9db560d72a247c178ae86b",
        amount: 30,
    }];

    const mojo = await deploy();
    
    for(const {address, ammount} of tx)  // maybe a better aproach could be with Promises.all([transactions])
        await mojo.transfer(address, ammount);

    // check balances
    for(const {address, ammount} of tx)
        assert.equal(await mojo.balanceOf(address), ammount)
  })
})

