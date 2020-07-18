pragma solidity >=0.4.21 <0.7.0;

contract Bank {
    mapping(address => uint256) balances;
    mapping(address => uint256) freezeEnd;
    mapping(address => string) messages;
    mapping(address => Transaction) lastTransaction;

    /* TODO
    - modifier für isMoneyFreezed & receiverNotSender
    */

    event NewTransaction(address sender, address receiver, uint256 value);

    struct Transaction {
        address sender;
        uint256 value;
        uint256 time;
    }

    function deposit() public payable {
        require(msg.value > 0);
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 _value) public {
        require(balances[msg.sender] > _value);
        require(freezeEnd[msg.sender] < now);
        msg.sender.transfer(_value);
        balances[msg.sender] -= _value;
    }

    function sendMoney(address _address, uint256 _value) public {
        require(balances[msg.sender] > _value);
        require(_address != msg.sender);
        balances[msg.sender] -= _value;
        balances[_address] += _value;
        lastTransaction[_address] = Transaction(
            msg.sender,
            _value,
            getCurrentTime()
        );
        emit NewTransaction(msg.sender, _address, _value);
    }

    function freezeMoney(uint256 _timeToFreeze) public {
        require(balances[msg.sender] > 0);
        freezeEnd[msg.sender] = now + _timeToFreeze;
    }

    function sendMessage(string memory _message, address _address) public {
        require(bytes(_message).length > 0);
        require(_address != msg.sender);
        messages[_address] = _message;
    }

    /*
    READ-ONLY(view) functions --------------------------------------------------
    */

    function getOwnBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function getOwnFreezeEnd() public view returns (uint256) {
        return freezeEnd[msg.sender];
    }

    function getCurrentTime() public view returns (uint256) {
        return now;
    }

    function getMessage() public view returns (string memory) {
        return messages[msg.sender];
    }

    function getLastTransaction()
        public
        view
        returns (
            address,
            uint256,
            uint256
        )
    {
        return (
            lastTransaction[msg.sender].sender,
            lastTransaction[msg.sender].value,
            lastTransaction[msg.sender].time
        );
    }
}
