// contracts/Mojo.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Mojo is ERC20 {
    constructor() ERC20("Mojo", "JD") {
        _mint(msg.sender, 100);
    }
}