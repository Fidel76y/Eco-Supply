// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    enum Role {
        Owner,
        Manufacturer,
        Distributor,
        Retailer
    }

    struct Participant {
        address id;
        Role role;
        string name;
        string location;
        VerificationStatus verificationStatus;
    }

    enum VerificationStatus {
        NotRequested,
        Pending,
        Approved,
        Rejected
    }

    enum State {
        Manufactured,
        ShippedToDistributor,
        ShippedToRetailer,
        Sold
    }

    struct Item {
        string name;
        string description;
        State state;
        Participant manufacturer;
        Participant distributor;
        Participant retailer;
        uint256 manufacturedTimestamp;
        uint256 shippedToDistributorTimestamp;
        uint256 shippedToRetailerTimestamp;
        uint256 soldTimestamp;
        uint256 id;

        // Participant customer;
    }

    uint256 public itemCount;
    mapping(uint256 => Item) public items;
    mapping(address => Participant) public participants;
    address[] public participantKeys;
    address public owner;

    // Mappings to store items by participant
    mapping(address => uint256[]) private manufacturerItems;
    mapping(address => uint256[]) private distributorItems;
    mapping(address => uint256[]) private retailerItems;

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can perform this action."
        );
        _;
    }

    modifier onlyManufacturer() {
        require(
            participants[msg.sender].role == Role.Manufacturer,
            "Only manufacturers can perform this action."
        );
        _;
    }

    modifier onlyDistributor() {
        require(
            participants[msg.sender].role == Role.Distributor,
            "Only distributors can perform this action."
        );
        _;
    }

    modifier onlyRetailer() {
        require(
            participants[msg.sender].role == Role.Retailer,
            "Only retailers can perform this action."
        );
        _;
    }
    event ItemManufactured(uint256 indexed _itemId);
    event ItemShippedToDistributor(uint256 indexed _itemId);
    event ItemShippedToRetailer(uint256 indexed _itemId);
    event ItemSold(uint256 indexed _itemId);
    event VerificationApproved(address indexed _user);
    event VerificationRejected(address indexed _user);

    constructor() {
        owner = msg.sender;
        participants[owner] = Participant(
            owner,
            Role.Owner,
            "Owner",
            "Earth",
            VerificationStatus.Approved
        );
    }

    function registerUser(
        Role _role,
        string memory _name,
        string memory _location
    ) public {
        require(msg.sender != owner, "Owner cannot register again");
        require(
            participants[msg.sender].role == Role.Owner,
            "User is already registered."
        );
        participants[msg.sender] = Participant(
            msg.sender,
            _role,
            _name,
            _location,
            VerificationStatus.NotRequested
        );
            participantKeys.push(msg.sender); // Add the new participant's address to the keys array

    }

    function requestVerification() public {
        require(
            participants[msg.sender].verificationStatus ==
                VerificationStatus.NotRequested ||
                participants[msg.sender].verificationStatus ==
                VerificationStatus.Rejected,
            "Verification already requested or approved."
        );
        participants[msg.sender].verificationStatus = VerificationStatus
            .Pending;
    }

    function approveVerification(address _user) public onlyOwner {
        require(
            participants[_user].verificationStatus ==
                VerificationStatus.Pending,
            "Verification not requested or already processed."
        );
        participants[_user].verificationStatus = VerificationStatus.Approved;
        emit VerificationApproved(_user);
    }

    function rejectVerification(address _user) public onlyOwner {
        require(
            participants[_user].verificationStatus ==
                VerificationStatus.Pending,
            "Verification not requested or already processed."
        );
        participants[_user].verificationStatus = VerificationStatus.Rejected;
        emit VerificationRejected(_user);
    }

    

    function manufactureItem(
        string memory _itemName,
        string memory _itemDescription
    ) public {
        require(
            participants[msg.sender].role == Role.Manufacturer,
            "Only manufacturers can create items."
        );

        itemCount++;
        Item memory _newItem = Item({
            name: _itemName,
            description: _itemDescription,
            state: State.Manufactured,
            manufacturer: participants[msg.sender],
            distributor: Participant(
                address(0),
                Role.Distributor,
                "",
                "",
                VerificationStatus.NotRequested
            ),
            retailer: Participant(
                address(0),
                Role.Retailer,
                "",
                "",
                VerificationStatus.NotRequested
            ),
            manufacturedTimestamp: block.timestamp, // Store the current timestamp
            shippedToDistributorTimestamp: 0,
            shippedToRetailerTimestamp: 0,
            soldTimestamp: 0,
            id: itemCount
        });
        items[itemCount] = _newItem;
        manufacturerItems[msg.sender].push(itemCount); // Add the item ID to the manufacturer's index
        emit ItemManufactured(itemCount);
    }

    function shipItemToDistributor(uint256 _itemId, address _distributorAddress)
        public
        onlyManufacturer()
    {
        require(
            participants[_distributorAddress].role == Role.Distributor,
            "Invalid distributor address."
        );
        require(
            items[_itemId].state == State.Manufactured,
            "Product cannot be shipped to distributor."
        );
        require(
            items[_itemId].manufacturer.id == msg.sender,
            "Only the manufacturer that created the product can ship to the distributor."
        );
        require(
            _distributorAddress != msg.sender,
            "You cannot ship product to yourself"
        );

        items[_itemId].state = State.ShippedToDistributor;
        items[_itemId].distributor = participants[_distributorAddress];
        distributorItems[_distributorAddress].push(_itemId); // Add the item ID to the distributor's index
        items[_itemId].shippedToDistributorTimestamp = block.timestamp; // Store the current timestamp

        emit ItemShippedToDistributor(_itemId);
    }

    function shipItemToRetailer(uint256 _itemId, address _retailerAddress)
        public
        onlyDistributor()
    {
        require(
            participants[_retailerAddress].role == Role.Retailer,
            "Invalid retailer address."
        );
        require(
            items[_itemId].state == State.ShippedToDistributor,
            "Product cannot be shipped to retailer."
        );
        require(
            items[_itemId].distributor.id == msg.sender,
            "Only the assigned distributor can ship to the retailer."
        );
        require(
            _retailerAddress != msg.sender,
            "You cannot ship product to yourself"
        );

        items[_itemId].state = State.ShippedToRetailer;
        items[_itemId].retailer = participants[_retailerAddress];
        retailerItems[_retailerAddress].push(_itemId); // Add the item ID to the retailer's index
        items[_itemId].shippedToRetailerTimestamp = block.timestamp; // Store the current timestamp

        emit ItemShippedToRetailer(_itemId);
    }

    function sellItem(uint256 _itemId) public onlyRetailer() {
        require(
            items[_itemId].retailer.id == msg.sender,
            "Only the assigned retailer can sell the item."
        );
        require(
            items[_itemId].state == State.ShippedToRetailer,
            "Failed to sell product"
        );
        items[_itemId].state = State.Sold;
        items[_itemId].soldTimestamp = block.timestamp; // Store the current timestamp

        emit ItemSold(_itemId);
    }

    function getItemDetails(uint256 _itemId) public view returns (Item memory) {
        require(_itemId <= itemCount && _itemId > 0, "Invalid item ID");
        return items[_itemId];
    }

    function getManufacturerItems(address _manufacturerAddress)
        public
        view
        returns (Item[] memory)
    {
        uint256[] memory itemIds = manufacturerItems[_manufacturerAddress];
        Item[] memory itemsDetails = new Item[](itemIds.length);

        for (uint256 i = 0; i < itemIds.length; i++) {
            itemsDetails[i] = getItemDetails(itemIds[i]);
        }

        return itemsDetails;
    }

    function getDistributorItems(address _distributorAddress)
        public
        view
        returns (Item[] memory)
    {
        uint256[] memory itemIds = distributorItems[_distributorAddress];
        Item[] memory itemsDetails = new Item[](itemIds.length);

        for (uint256 i = 0; i < itemIds.length; i++) {
            itemsDetails[i] = getItemDetails(itemIds[i]);
        }

        return itemsDetails;
    }

    function getRetailerItems(address _retailerAddress)
        public
        view
        returns (Item[] memory)
    {
        uint256[] memory itemIds = retailerItems[_retailerAddress];
        Item[] memory itemsDetails = new Item[](itemIds.length);

        for (uint256 i = 0; i < itemIds.length; i++) {
            itemsDetails[i] = getItemDetails(itemIds[i]);
        }

        return itemsDetails;
    }

 function getParticipantsWithPendingVerification() public view returns (Participant[] memory) {
    Participant[] memory pendingParticipants = new Participant[](participantKeys.length);

    for (uint256 i = 0; i < participantKeys.length; i++) {
        Participant storage participant = participants[participantKeys[i]];
        if (participant.verificationStatus == VerificationStatus.Pending) {
            pendingParticipants[i] = participant;
        }
    }

    return pendingParticipants;
}

}
