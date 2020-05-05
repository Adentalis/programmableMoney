pragma solidity 0.6.0;

contract Bank {
    mapping(address => uint256) balances;

    function deposit()public payable{
    	require(msg.value>0);
        balances[msg.sender]+=msg.value;
    }

    function withdraw() public{
        require(balances[msg.sender]>0);
        msg.sender.transfer(balances[msg.sender]);
        balances[msg.sender]=0;
    }

    function getOwnBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
