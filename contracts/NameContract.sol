pragma solidity >=0.4.21 <0.7.0;

contract NameContract {
  string name;

  function setName(string memory x) public {
    name = x;
  }

  function getName() public view returns (string memory) {
    return name;
  }
}
