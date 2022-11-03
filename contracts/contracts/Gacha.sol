// contracts/Gacha.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Roles.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./Mojo.sol";

contract Gacha is AccessControl {
    using Roles for Roles.Role;
    Roles.Role private _starPlayers;
    
    bytes32 public constant STAR_PLAYER = keccak256("STAR_PLAYER");
    uint16 public minStarPlayerBalance = 10;
    Mojo token;
    mapping(address => uint256) private _balances;
    constructor(address mojoAddress) {
        token = Mojo(mojoAddress);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function deposit() payable external {
        // record the value sent 
        // to the address that sent it
        _balances[msg.sender] += msg.value;
    }
    function balanceOf(address addr) view {
        return _balances[addr];
    }
    function makeStarPlayer(address addr) private {
        _grantRole(STAR_PLAYER, addr);
    }
    function GetAllowance() public view returns(uint256){
       return token.allowance(msg.sender, address(this));
    }
   
   function AcceptPayment(uint256 _tokenamount) public returns(bool) {
       require(_tokenamount > GetAllowance(), "Please approve tokens before transferring");
       token.transfer(address(this), _tokenamount);
       return true;
    }
    // https://dapp-world.com/smartbook/accept-an-erc20-token-as-payment-in-smart-contract-zsqV
   
}