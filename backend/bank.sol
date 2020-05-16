pragma solidity 0.6.0;

contract Bank {
    mapping(address => uint256) balances;
    mapping(address => uint256) freezeEnd;
    mapping(address => string) messages;
    
    //@author Daniel Niemczyk
    function deposit()public payable{
    	require(msg.value>0);
        balances[msg.sender]+=msg.value;
    }

    //@author Daniel Niemczyk
    function withdraw() public{
        require(balances[msg.sender] > 0);
        require(freezeEnd[msg.sender] < now);
        msg.sender.transfer(balances[msg.sender]);
        balances[msg.sender]=0;
    }
    
    //@author Daniel Niemczyk
    function sendMoney(uint _amount, address _address) public {
        require(balances[msg.sender] > _amount);
        balances[msg.sender] -= _amount;
        balances[_address] += _amount;
    }

    //@author Daniel Niemczyk
    function freezeMoney(uint _timeToFreeze) public {
        //require(balances[msg.sender]>0);
        freezeEnd[msg.sender]= now + _timeToFreeze;
    }

    //@author Leon Bruckert
    function sendMessage(string memory _message, address _address) public {
        require(bytes(_message).length>0);
        messages[_address]=_message;
    }

    /*
    READ-ONLY(view) functions --------------------------------------------------
    */
    
    //@author Daniel Niemczyk
    function getOwnBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
    
    //@author Daniel Niemczyk
    function getOwnFreezeEnd() public view returns (uint256) {
        return freezeEnd[msg.sender];
    }
    
    //@author Daniel Niemczyk
    function getCurrentTime() public view returns (uint256) {
        return now;
    }
    
    //@author Leon Bruckert
    function getMessage(address _address) public view returns (string memory) {
        return messages[_address];
    }

}