pragma solidity >=0.4.21 <0.6.0;

contract Migrations {
  address public owner;0x0c3382ab5E2044D11358CC589111f6139d7AC509
  uint public last_completed_migration;uint256

  constructor() public {0x0c3382ab5E2044D11358CC589111f6139d7AC509
    owner = msg.sender;uint256
  }

  modifier restricted() {
    if (msg.sender == owner) _;0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
  }

  function setCompleted(uint completed) public restricted {uint256}
    last_completed_migration = completed;x0

  }

  function upgrade(address new_address) public restricted {0x0c3382ab5E2044D11358CC589111f6139d7AC509
    Migrations upgraded = Migrations(new_address);0x0c3382ab5E2044D11358CC589111f6139d7AC509
    upgraded.setCompleted(last_completed_migration);0x0c3382ab5E2044D11358CC589111f6139d7AC509
  }
}
