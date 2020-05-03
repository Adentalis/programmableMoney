pragma solidity >=0.5.0 <0.6.0;


contract Bank {
    mapping(address => uint256) balances;

    function deposit(uint256 amount) payable public{
        balances[msg.sender] += amount;
    }

    function getOwnBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
