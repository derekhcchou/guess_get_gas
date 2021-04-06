pragma solidity ^0.6.0;
// pragma experimental ABIEncoderV2;

import "@nomiclabs/buidler/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract TokenFarm is Ownable {
    // string public name = "Dapp Token Farm";
    string public name = "Crypto Gas Earning";
    IERC20 public dappToken;

    struct GameInfo {
        uint256 gameId; // game id
        uint8 answerId; // answer chosen by user
        uint256 amount; // bet amount on this game
        bool isCorrect;
        bool isNotified; // has notified result to the user
    }

    struct UserData {
        address addr; // user wallet address
        uint256 balance; // user balance stored in the contract, including ones in the games
        mapping(uint256 => GameInfo) gameInfoStructs;
    }

    // UserData Map
    mapping(address => UserData) public userDataStructs;
    mapping(address => mapping(uint256 => GameInfo)) public userGameStructs;
    mapping(address => bool) public userList;
    uint256 totalContractBalance;

    /* Get user's available balance */
    function getUserBalance(address addr) public returns (uint256) {
        if (!userList[addr]) {
            userDataStructs[addr].addr = addr;
            userList[addr] = true;
        }
        return userDataStructs[addr].balance;
    }

    /* load balance from user's address to contract */
    function reloadBalance(address addr, uint256 amount)
        public
        returns (uint256)
    {
        uint256 total = userDataStructs[addr].balance + amount;
        userDataStructs[addr].balance = total;
        totalContractBalance = totalContractBalance + amount;
        return total;
    }

    /* withdraw balance from contract to user's balance */
    function withdrawBalance(address addr, uint256 amount)
        public
        returns (uint256)
    {
        uint256 remainding = userDataStructs[addr].balance - amount;
        if (remainding >= 0) {
            userDataStructs[addr].balance = remainding;
            totalContractBalance = totalContractBalance - amount;
        }
        return remainding;
    }

    function getTotalContractBalance()
        public
        returns (uint256 contractBalance)
    {
        return totalContractBalance;
    }

    /* Check if user is currently participating in a game */
    function getUserGameInfo(address addr, uint256 gameId)
        public
        view
        returns (uint8 answerId, uint256 amount)
    {
        return (
            userDataStructs[addr].gameInfoStructs[gameId].answerId,
            userDataStructs[addr].gameInfoStructs[gameId].amount
        );
    }

    /* When user register to participate in a game */
    function addGameInfoToUserData(
        address addr,
        uint256 gameId,
        uint8 answerId,
        uint256 amount
    ) public returns (bool success) {
        if (userDataStructs[addr].balance >= amount) {
            userDataStructs[addr].balance =
                userDataStructs[addr].balance -
                amount;
            userDataStructs[addr].gameInfoStructs[gameId].gameId = gameId;
            userDataStructs[addr].gameInfoStructs[gameId].answerId = answerId;
            userDataStructs[addr].gameInfoStructs[gameId].amount = amount;
            userDataStructs[addr].gameInfoStructs[gameId].isCorrect = false;
            userDataStructs[addr].gameInfoStructs[gameId].isNotified = false;
            return true;
        }
        return false;
    }

    // issueReward

    // Deposit Balance (stakeToken -> Deposit tokan)
    function stakeTokens(uint256 amount, address tokenAddress) public {
        require(amount > 0, "Amount cannot be 0");
        // only allow certain token to be deposit
        if (isTokenAllowed(tokenAddress)) {
            updateUniqueTokensStake(msg.sender, tokenAddress);

            // token flow: user address to smart contract
            // because contract does not own the token, use TransferFrom
            IERC20(tokenAddress).transferFrom(
                msg.sender,
                address(this),
                amount
            );

            // get the original/current balance and add in the new stake amount
            stakingBalance[tokenAddress][msg.sender] =
                stakingBalance[tokenAddress][msg.sender] +
                amount;

            // New staker
            if (uniqueTokensStaked[msg.sender] == 1) {
                stakers.push(msg.sender);
            }
        }
    }

    // token addresses -> mapping of user address -> amounts
    // **need to change it to have more info
    mapping(address => mapping(address => uint256)) public stakingBalance;
    //
    mapping(address => uint256) public uniqueTokensStaked;
    //
    mapping(address => address) public tokenPriceFeedMapping;

    // store: token allowed to be deposit
    address[] allowedTokens;

    // store all the stakers
    address[] public stakers;

    constructor(address _dappTokenAddress) public {
        // interface to set ERC20
        dappToken = IERC20(_dappTokenAddress);
    }

    // Withdraw Balance (unstakeTokens -> Withdraw token)
    function unstakeTokens(address token) public {
        uint256 balance = stakingBalance[token][msg.sender];
        require(balance > 0, "Staking balance cannot be 0");

        // token flow: contract to user address
        // because contract DOES  own the token, use Transfer
        IERC20(token).transfer(msg.sender, balance);

        // withdraw all balance
        stakingBalance[token][msg.sender] = 0;
        uniqueTokensStaked[msg.sender] = uniqueTokensStaked[msg.sender] - 1;
    }

    // Issue Rewards (issueTokens -> Issue Rewards)
    function issueTokens() public onlyOwner {
        for (
            uint256 stakersIndex = 0;
            stakersIndex < stakers.length;
            stakersIndex++
        ) {
            address recipient = stakers[stakersIndex];
            dappToken.transfer(recipient, getUserTotalValue(recipient));
        }
    }

    function setPriceFeedContract(address token, address priceFeed)
        public
        onlyOwner
    {
        tokenPriceFeedMapping[token] = priceFeed;
    }

    function updateUniqueTokensStake(address user, address token) internal {
        if (stakingBalance[token][user] <= 0) {
            uniqueTokensStaked[user] = uniqueTokensStaked[user] + 1;
        }
    }

    // Checking if the token user's sending is valid for our app
    // update it to mapping so less gas will be charged
    function isTokenAllowed(address token) public returns (bool) {
        for (
            uint256 allowedTokensIndex = 0;
            allowedTokensIndex < allowedTokens.length;
            allowedTokensIndex++
        ) {
            if (allowedTokens[allowedTokensIndex] == token) {
                return true;
            }
        }
        return false;
    }

    // Add allowed tokens (can only be modified/called by the onwer)
    function addAllowedTokens(address token) public onlyOwner {
        allowedTokens.push(token);
        // allowedTokens[token]=true; for mapping
    }

    function getUserTotalValue(address user) public view returns (uint256) {
        uint256 totalValue = 0;
        if (uniqueTokensStaked[user] > 0) {
            for (
                uint256 allowedTokensIndex = 0;
                allowedTokensIndex < allowedTokens.length;
                allowedTokensIndex++
            ) {
                totalValue =
                    totalValue +
                    getUserStakingBalanceEthValue(
                        user,
                        allowedTokens[allowedTokensIndex]
                    );
            }
        }
        return totalValue;
    }

    function getUserStakingBalanceEthValue(address user, address token)
        public
        view
        returns (uint256)
    {
        // user does not have token
        if (uniqueTokensStaked[user] <= 0) {
            return 0;
        }
        return
            (stakingBalance[token][user] * getTokenEthPrice(token)) / (10**18);
    }

    function getTokenEthPrice(address token) public view returns (uint256) {
        address priceFeedAddress = tokenPriceFeedMapping[token];
        AggregatorV3Interface priceFeed =
            AggregatorV3Interface(priceFeedAddress);
        (
            uint80 roundID,
            int256 price,
            uint256 startedAt,
            uint256 timeStamp,
            uint80 answerdInRound
        ) = priceFeed.latestRoundData();
        return uint256(price);
    }
}
