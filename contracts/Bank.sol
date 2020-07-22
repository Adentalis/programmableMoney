pragma solidity >=0.4.21 <0.7.0;

contract Bank {
    /*--------------------------------
            MONEY SECTION
    --------------------------------*/
    mapping(address => uint256) balances;
    mapping(address => Transaction) lastReceivedTransaction;
    mapping(address => Transaction) lastSendTransaction;

    event NewTransaction(address sender, address receiver, uint256 value);

    struct Transaction {
        address sender;
        address receiver;
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

        Transaction memory transaction = Transaction(
            msg.sender,
            _address,
            _value,
            getCurrentTime()
        );

        lastSendTransaction[msg.sender] = transaction;
        lastReceivedTransaction[_address] = transaction;

        emit NewTransaction(msg.sender, _address, _value);
    }

    function getOwnBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function getLastReceivedTransaction()
        public
        view
        returns (
            address,
            uint256,
            uint256
        )
    {
        return (
            lastReceivedTransaction[msg.sender].sender,
            lastReceivedTransaction[msg.sender].value,
            lastReceivedTransaction[msg.sender].time
        );
    }

    function getLastSendTransaction()
        public
        view
        returns (
            address,
            uint256,
            uint256
        )
    {
        return (
            lastSendTransaction[msg.sender].receiver,
            lastSendTransaction[msg.sender].value,
            lastSendTransaction[msg.sender].time
        );
    }

    /*--------------------------------
            MESSAGE SECTION
    --------------------------------*/

    mapping(address => Message[5]) messagesSend;
    mapping(address => Message[5]) messagesReceived;

    mapping(address => uint256) messagesSendCounter;
    mapping(address => uint256) messagesReceivedCounter;

    struct Message {
        address sender;
        address receiver;
        string message;
        uint256 time;
    }

    function sendMessage(string memory _message, address _address) public {
        require(bytes(_message).length > 0);
        require(_address != msg.sender);

        Message memory message = Message(
            msg.sender,
            _address,
            _message,
            getCurrentTime()
        );

        messagesSend[msg.sender][messagesSendCounter[msg.sender] % 5] = message;
        messagesSendCounter[msg.sender] += 1;

        messagesReceived[_address][messagesReceivedCounter[_address] %
            5] = message;
        messagesReceivedCounter[_address] += 1;
    }

    function getSendMessages(uint256 _position)
        public
        view
        returns (
            address,
            string memory,
            uint256
        )
    {
        require(_position >= 0 && _position <= 5);
        return (
            messagesSend[msg.sender][_position].receiver,
            messagesSend[msg.sender][_position].message,
            messagesSend[msg.sender][_position].time
        );
    }

    function getReceivedMessages(uint256 _position)
        public
        view
        returns (
            address,
            string memory,
            uint256
        )
    {
        require(_position >= 0 && _position <= 5);
        return (
            messagesReceived[msg.sender][_position].sender,
            messagesReceived[msg.sender][_position].message,
            messagesReceived[msg.sender][_position].time
        );
    }

    /*
    HELPER FUNCTIONS
    */
    mapping(address => uint256) freezeEnd;

    function getOwnFreezeEnd() public view returns (uint256) {
        return freezeEnd[msg.sender];
    }

    function freezeMoney(uint256 _timeToFreeze) public {
        require(balances[msg.sender] > 0);
        freezeEnd[msg.sender] = now + _timeToFreeze;
    }

    function getCurrentTime() public view returns (uint256) {
        return now;
    }
}
