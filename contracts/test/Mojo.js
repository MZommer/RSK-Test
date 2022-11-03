const hre = require("hardhat");
const assert = require('assert');

async function deploy(contract = "Mojo") {
    const _contract = await hre.ethers.getContractFactory(contract);
    const instance = await _contract.deploy();
    await instance.deployed();
    return instance;
}

describe("Mojo", () => {
  it("Deploy", async () => {
    const mojo = await deploy();
    // checks msg.sender balance is 100
    const [owner] = await hre.ethers.getSigners();
    assert.equal(await mojo.balanceOf(owner.address), 100, "The owner balance should be 100");
  });
  it("Make transactions", async () => {
    // random addresses
    const tx = [{
        address: "0xdb5892B33b2587Fc94D0fb6b484efA99Ab280779",
        amount: 10,
    },{
        address: "0x85E3aeaf4d29deF5d87E2C7dc936aDe69F0f461c",
        amount: 20,
    },{
        address: "0x3615eba8b7A015C7214d1e5589C82C0111855619",
        amount: 30,
    }];

    const mojo = await deploy();
    
    // make transactions
    await Promise.all(tx.map(({address, amount}) => mojo.transfer(address, amount)))

    // check balances
    for (const {address, amount} of tx)
        assert.equal(await mojo.balanceOf(address), amount, "Addresses balances are wrong")
  });
  it("Check changeDelay function", async () => {
    const NEW_DELAY = 15;
    const mojo = await deploy();

    await mojo.changeDelay(NEW_DELAY);
    const delay = await mojo.blockDelay();

    assert.equal(delay, NEW_DELAY);
  });
  it("Check mint time restrictions", async () => {
    const mojo = await deploy();

    const failedMint = false;
    await mojo.mint(5, "0xceB62238A8F6ef1C8F8BF1BdE49DD9cF461E4e75"); // Random adresses
    await mojo.mint(5, "0xC50F44e32d4Caf9Eb3bAD6A0497b5a405479DfC5")
              .catch(err => failedMint = true);
    assert.ok(failedMint);
  });
  it("Check starPlayer generation", async () => {
    const mojo = await deploy();
    const gacha = await deploy("Gacha");

    

  })
})

