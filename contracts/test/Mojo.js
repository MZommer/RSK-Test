const hre = require("hardhat");
const assert = require('assert');

const {deployMojo, deployGacha, deployAvatar, skipBlocks} = require("../utils/helpers");

//provider.send('evm_mine', [])
//provider.send('evm_increaeTime', [1000])
//https://ethereum.stackexchange.com/questions/86633/time-dependent-tests-with-hardhat

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
  it("Check starPlayer generation", async () => {
    const mojo = await deployMojo();
    const gacha = await deployGacha(mojo.address);

    const [owner] = await hre.ethers.getSigners();

    await mojo.approve(gacha.address, 10);
    await gacha.AcceptPayment();
    
    assert.ok(gacha.isStarPlayer(owner.address));
  });
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

