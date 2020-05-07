pragma solidity 0.6.0;

contract Bank {
    mapping(address => uint256) balances;
    mapping(address => string) messages;
    
    //@author Daniel Niemcyzk
    function deposit()public payable{
    	require(msg.value>0);
        balances[msg.sender]+=msg.value;
    }

    //@author Daniel Niemcyzk
    function withdraw() public{
        require(balances[msg.sender]>0);
        msg.sender.transfer(balances[msg.sender]);
        balances[msg.sender]=0;
    }

    //@author Daniel Niemcyzk
    function getOwnBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    //@author Leon Bruckert
    function sendMessage(string memory _message, address _address) public {
        require(bytes(_message).length>0);
        messages[_address]=_message;
    }
    
    //@author Leon Bruckert
    function getMessage(address _address) public view returns (string memory) {
        return messages[_address];
    }
}
