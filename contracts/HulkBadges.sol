// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HulkBadges is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    mapping(address => mapping(uint256 => bool)) public mintedBadge;

    struct BadgeMeta {
        string name;
        string description;
        string image;
    }
    mapping(uint256 => BadgeMeta) public badgeMetas;

    constructor() ERC721("HulkBadge", "HLKB") Ownable(msg.sender) {}

    function setBadgeMeta(uint256 badgeId, string memory name, string memory description, string memory image) public onlyOwner {
        badgeMetas[badgeId] = BadgeMeta(name, description, image);
    }

    function mintBadge(uint256 badgeId) external {
        require(!mintedBadge[msg.sender][badgeId], "Already minted this badge");
        BadgeMeta memory meta = badgeMetas[badgeId];
        require(bytes(meta.name).length > 0, "Badge metadata not set");
        uint256 tokenId = nextTokenId++;
        _safeMint(msg.sender, tokenId);
        string memory json = string(abi.encodePacked(
            '{',
                '"name":"', meta.name, '",',
                '"description":"', meta.description, '",',
                '"image":"', meta.image, '"',
            '}'
        ));
        string memory tokenURI = string(abi.encodePacked("data:application/json;base64,", base64(bytes(json))));
        _setTokenURI(tokenId, tokenURI);
        mintedBadge[msg.sender][badgeId] = true;
    }

    // Base64 encoding for metadata
    function base64(bytes memory data) internal pure returns (string memory) {
        string memory TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        uint256 len = data.length;
        if (len == 0) return "";
        string memory result = new string(4 * ((len + 2) / 3));
        bytes memory res = bytes(result);
        uint256 i = 0;
        uint256 j = 0;
        for (; i + 3 <= len; i += 3) {
            (res[j], res[j+1], res[j+2], res[j+3]) = encode3(
                uint8(data[i]), uint8(data[i+1]), uint8(data[i+2]), TABLE
            );
            j += 4;
        }
        if (i + 2 == len) {
            (res[j], res[j+1], res[j+2], res[j+3]) = encode2(
                uint8(data[i]), uint8(data[i+1]), TABLE
            );
        } else if (i + 1 == len) {
            (res[j], res[j+1], res[j+2], res[j+3]) = encode1(
                uint8(data[i]), TABLE
            );
        }
        return string(res);
    }
    function encode3(uint8 a, uint8 b, uint8 c, string memory TABLE) private pure returns (bytes1, bytes1, bytes1, bytes1) {
        return (
            bytes(TABLE)[a >> 2],
            bytes(TABLE)[((a & 3) << 4) | (b >> 4)],
            bytes(TABLE)[((b & 15) << 2) | (c >> 6)],
            bytes(TABLE)[c & 63]
        );
    }
    function encode2(uint8 a, uint8 b, string memory TABLE) private pure returns (bytes1, bytes1, bytes1, bytes1) {
        return (
            bytes(TABLE)[a >> 2],
            bytes(TABLE)[((a & 3) << 4) | (b >> 4)],
            bytes(TABLE)[(b & 15) << 2],
            "="
        );
    }
    function encode1(uint8 a, string memory TABLE) private pure returns (bytes1, bytes1, bytes1, bytes1) {
        return (
            bytes(TABLE)[a >> 2],
            bytes(TABLE)[(a & 3) << 4],
            "=",
            "="
        );
    }
}
