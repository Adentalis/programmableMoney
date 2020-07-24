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
        require(freezeContractEnd[msg.sender] <= now);
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 _value) public {
        require(balances[msg.sender] >= _value);
        require(freezeContractEnd[msg.sender] <= now);
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
            FREEZE MONEY
    --------------------------------*/

    mapping(address => FreezeTransaction[5]) freezedTransactions;
    mapping(address => uint256[5]) freezedTransactionOccupied;

    struct FreezeTransaction {
        uint256 date;
        uint256 value;
        string message;
    }

    function createFreezeTranaction(
        uint256 _date,
        uint256 _value,
        string memory _message
    ) public {
        require(allFreezedTransactionsOccupied() == false);
        require(balances[msg.sender] >= _value);
        require(_date > now);
        require(freezeContractEnd[msg.sender] <= now);

        balances[msg.sender] -= _value;
        uint256 nextEmptyIndex = getNextEmptyFreezeTransactionIndex();
        freezedTransactions[msg.sender][nextEmptyIndex] = FreezeTransaction(
            _date,
            _value,
            _message
        );
        freezedTransactionOccupied[msg.sender][nextEmptyIndex] = 1;
    }

    function finishFreezeTransaction(uint256 _index) public {
        require(freezeContractEnd[msg.sender] <= now);
        require(freezedTransactions[msg.sender][_index].date < now);
        balances[msg.sender] += freezedTransactions[msg.sender][_index].value;
        freezedTransactions[msg.sender][_index].value = 0;
        freezedTransactions[msg.sender][_index].date = 0;
        freezedTransactions[msg.sender][_index].message = "";
        freezedTransactionOccupied[msg.sender][_index] = 0;
    }

    function getFreezeTransaction(uint256 _position)
        public
        view
        returns (
            uint256,
            uint256,
            string memory
        )
    {
        require(_position >= 0 && _position <= 5);
        return (
            freezedTransactions[msg.sender][_position].date,
            freezedTransactions[msg.sender][_position].value,
            freezedTransactions[msg.sender][_position].message
        );
    }

    function getNextEmptyFreezeTransactionIndex()
        private
        view
        returns (uint256)
    {
        for (uint256 i = 0; i < 5; i++) {
            if (freezedTransactionOccupied[msg.sender][i] == 0) {
                return i;
            }
        }
    }

    function getFreezedTransactionOccupied(uint256 _index)
        private
        view
        returns (uint256)
    {
        return freezedTransactionOccupied[msg.sender][_index];
    }

    function allFreezedTransactionsOccupied() private view returns (bool) {
        for (uint256 i = 0; i < 5; i++) {
            if (getFreezedTransactionOccupied(i) == 0) {
                return false;
            }
        }
        return true;
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

    /*--------------------------------
            FREEZE CONTRACT
    --------------------------------*/

    mapping(address => uint256) freezeContractEnd;

    function getOwnFreezeContractEnd() public view returns (uint256) {
        return freezeContractEnd[msg.sender];
    }

    function freezeContract(uint256 _timeToFreeze) public {
        require(balances[msg.sender] > 0);
        freezeContractEnd[msg.sender] = now + _timeToFreeze;
    }

    /*
    HELPER FUNCTIONS
    */

    function getCurrentTime() public view returns (uint256) {
        return now;
    }
}
