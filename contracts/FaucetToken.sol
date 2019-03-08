pragma solidity 0.5.4;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";

contract FaucetToken is ERC20, ERC20Detailed, ERC20Mintable, ERC20Burnable {
    uint8 public constant DECIMALS = 18;
    uint256 public constant INITIAL_SUPPLY = 10000 * (10 ** uint256(DECIMALS));

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor () public ERC20Detailed("FaucetToken", "FAU", DECIMALS) {
    }

    function() external {
        mint(msg.sender, 1 ether);
    }

    function mint(address to, uint256 value) public returns (bool) {
        require(value <= 10000000 ether, "dont be greedy");
        _mint(to, value);
        return true;
    }

}