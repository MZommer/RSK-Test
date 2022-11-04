// contracts/Mojo.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Mojo is ERC20, Ownable {
    uint32 public blockDelay = 5;
    uint256 public lastMinedBlock = 0; // Using blocks as a time measurement as time wont be accurate

    //uint32 public timeDelay = 1000; // 1 second
    //uint32 public lastMintedTimestamp = 0; 

    constructor() ERC20("Mojo", "JD") {
        _mint(msg.sender, 100); // mint unsafe
        
    }
    function mint(address to, uint256 amount) public { // safe mint
        require(block.number < lastMinedBlock+blockDelay 
                //&& msg.sender != owner() // Owner can mint when they want
             , "You need to wait for minting tokens");
        /*require(block.timestamp <= lastMintedTimestamp+timeDelay
                //&& msg.sender != owner() // Owner can mint when they want
                , "You need to wait for minting tokens");*/

        _mint(to, amount);
        lastMinedBlock = block.number;
        //lastMintedTimestamp = block.timestamp;
    }

    function changeDelay(uint32 newDelay) public onlyOwner{
        blockDelay = newDelay;
        //timeDelay = newDelay;
    }
}