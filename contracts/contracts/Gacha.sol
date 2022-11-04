// contracts/Gacha.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Gacha is AccessControl {    
    bytes32 public constant STAR_PLAYER = keccak256("STAR_PLAYER");
    uint16 public minStarPlayerBalance = 10;
    IERC20 token;
    mapping(address => uint256) private _balances;
    constructor(IERC20 pToken) {
        token = pToken;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function isStarPlayer(address addr) public view returns(bool) {
        return hasRole(STAR_PLAYER, addr);
    }

    function balanceOf(address addr) public view returns(uint256) {
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
       token.transfer(msg.sender, _tokenamount);
       makeStarPlayer(msg.sender);
       return true;
    }
    // https://dapp-world.com/smartbook/accept-an-erc20-token-as-payment-in-smart-contract-zsqV
   
}