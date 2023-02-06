const hre = require("hardhat");
const assert = require('assert');
const { deployMojo } = require("../utils/helpers");

describe("Mojo", () => {
  it("Deploy", async () => {
    const mojo = await deployMojo();
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

    const mojo = await deployMojo();
    
    // make transactions
    const recipts = await Promise.all(tx.map(({address, amount}) => mojo.transfer(address, amount)))
    
    // wait for transactions to mint
    await Promise.all(recipts.map(recipts => recipts.wait()))

    // check balances
    for (const {address, amount} of tx)
        assert.equal(await mojo.balanceOf(address), amount, "Addresses balances are wrong")
  });
  it("Check changeDelay function", async () => {
    const NEW_DELAY = 15;
    const mojo = await deployMojo();

    await mojo.changeDelay(NEW_DELAY);
    const delay = await mojo.blockDelay();

    assert.equal(delay, NEW_DELAY);
  });
  it("Check not owner changeDelay function", async () => {
    const mojo = await deployMojo();

    const [owner, malory] = await hre.ethers.getSigners();
    
    await assert.rejects(mojo.connect(malory).changeDelay(1));
  })
  it("Check mint time restrictions", async () => {
    const mojo = await deployMojo();

    await assert.rejects(mojo.mint("0xceB62238A8F6ef1C8F8BF1BdE49DD9cF461E4e75", 5))
  });
})

