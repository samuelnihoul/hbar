
pragma solidity >=0.4.0;
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol';
contract KM is ERC20Mintable {
  string public name = "Karbon Moneta";
  string public symbol = "KM";
  uint8 public decimals = 3;
}