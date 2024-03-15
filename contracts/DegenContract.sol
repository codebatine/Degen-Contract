// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

contract DegenContract {
    uint nextId = 0;
    uint public numberOfDegens = 0;

    struct Degen {
        uint id;
        string nickname;
        string tagline;
        bool isHodler;
    }

    event DegenCreated(uint id);
    event DegenDeleted(uint id);
    event DegensIndex(uint[] ids);

    mapping(uint => Degen) public degens;
    uint[] public degenList;

    function createDegen(
        string memory _nickname,
        string memory _tagline,
        bool _isHodler
    ) public {
        nextId++;
        numberOfDegens++;
        degens[nextId] = Degen(nextId, _nickname, _tagline, _isHodler);
        degenList.push(nextId);
        emit DegenCreated(nextId);
    }

    function removeDegen(uint id) public {
        numberOfDegens--;
        delete degens[id];
        emit DegenDeleted(id);
    }

    function getIndexList() public view returns (uint[] memory) {
        return degenList;
    }

    constructor() {
        createDegen("Peco", "make crypto scary again", true);
    }
}
