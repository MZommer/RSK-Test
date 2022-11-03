// contracts/Avatar.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Gacha.sol";
contract Avatar is ERC721 {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    Gacha _gacha;

    constructor(address gachaAddress) ERC721("Avatar", "AVA") {
        _gacha = Gacha(gachaAddress);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://jdnow-api-contentapistoragest.justdancenow.com/avatars/";
    }

    function safeMint(address to) private {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
    function mint(address to) public {
        require(_gacha.hasRole(to, _gacha.STAR_PLAYER), "You must be a star player to mint");
        safeMint(to);
    }
}