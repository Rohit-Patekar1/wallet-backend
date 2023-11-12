# Wallet App API and Database Documentation

This document provides an overview of the API endpoints for the Wallet App. The Wallet App allows users to manage their financial transactions and wallet balance.

## Getting Started

Clone the git repository in your local machine
After cloning is successful 
1)create a `.env` file at root and include `MONGO_URL=mongodb+srv://rohitpatekar936:Rohit1215@cluster0.yldq7rh.mongodb.net/?retryWrites=true&w=majority` 
2)`npm i` first then `npm run build` and finally `npm start`.
With this step you should be able to run the project locally.

## Database Design and Transactions

Our wallet application uses MongoDB as its NoSQL database, leveraging the flexible schema and high performance of MongoDB for handling wallet transactions and balances.

### Transactions in MongoDB

We use MongoDB transactions to ensure that operations on multiple collections are atomic. This means that changes are only permanent if all operations within the transaction are successful. If any operation fails, the transaction is aborted, and the database remains unchanged.

### Transaction Operation Flow

Here is an overview of our transaction operation in the Node.js backend:

1. **Start a MongoDB Session:** 
   We begin by initiating a new session and starting a transaction within that session.

2. **Performing Operations:**
   The transaction consists of several critical steps:
   - **Fetch Wallet Data:** 
     We retrieve the wallet details based on the `walletId` provided in the request parameters.
   - **Validate Transactions:** 
     Before proceeding, we ensure that the wallet exists and that a debit operation will not result in a negative balance.
   - **Creating Transaction Entry:** 
     We generate a new unique identifier for the transaction and calculate the new balance after the transaction.
   - **Insert Transaction Record:** 
     A new transaction record is inserted into the `transactions` collection with details such as wallet ID, date, amount, balance, and type (credit or debit).
   - **Update Wallet Balance:** 
     The wallet's balance is updated in the `wallet` collection to reflect the new balance after the transaction.

3. **Commit or Abort Transaction:**
   - If all operations are successful, we commit the transaction to make the changes permanent.
   - If any operation fails, we catch the exception, abort the transaction, and revert all changes.

## Database Interaction Functions

I have shown a working example of a Mongodb transactions in the video.
In our application, we interact with MongoDB using the following functions to handle wallet transactions:

### `newTransaction(data: ITransaction, options = {})`

This function is responsible for inserting a new transaction record into the `transactions` collection. It uses the `insertOne` method, provided by the MongoDB driver, to add the new transaction document into the database.

Parameters:
- `data`: An object containing the transaction details such as wallet ID, date, amount, balance, description, and transaction type.
- `options`: An optional parameter that includes the session object to execute this operation as part of the transaction.

### `updateWallet(id: String, balance: number, options = {})`

This function updates the balance of the specified wallet by wallet ID. It uses the `updateOne` method to modify the balance field of the wallet document in the `wallet` collection.

Parameters:
- `id`: The unique identifier of the wallet.
- `balance`: The new balance to set for the wallet.
- `options`: An optional parameter that includes the session object to execute this operation within the transaction.

## Handling Errors and Rollbacks

The application ensures data integrity and consistency by using MongoDB transactions. Here's how error handling is implemented:

### Error Handling

If an error occurs during the transaction, we catch the exception and perform the following steps:

1. **Abort Transaction**: We call `session.abortTransaction()` to abort the ongoing transaction. This ensures that no partial changes are made to the database and the state remains consistent.

2. **Error Logging**: We log the error details for debugging purposes, which helps in identifying issues that might occur during the transaction process.

3. **Error Response**: We format the error using a custom error handler and send a response back to the client with the appropriate HTTP status code and error message.

## Non-Transactional Database Queries

In addition to transactional operations, our wallet application also performs non-transactional database operations such as fetching transaction history and managing wallet data.

### Fetching Transaction History

The `fetchTransactions` function retrieves a paginated list of transactions for a particular wallet. It allows sorting and filtering based on the transaction amount or date.

#### Function Details

- **Purpose**: To fetch a list of all transactions for a specific wallet with support for pagination, sorting, and filtering.
- **Parameters**:
  - `id`: The unique identifier of the wallet.
  - `skip`: The number of transactions to skip (for pagination).
  - `limit`: The maximum number of transactions to return.
  - `filter`: A string specifying the sorting order of the results.
- **MongoDB Operations**:
  - Uses an aggregation pipeline to match transactions by wallet ID.
  - Applies sorting based on the filter criteria: transaction amount or date.
  - Implements pagination using the `$skip` and `$limit` stages.
  - Projects specific fields of transactions to be returned in the result.

### Creation and Updation of Wallet

We have two functions for managing wallets: `createWallet` for creating new wallets and `fetchWalletDetail` for retrieving details of an existing wallet.

#### `createWallet(data: IWallet)`

- **Purpose**: To create a new wallet with initial data.
- **Parameters**:
  - `data`: An object containing the initial wallet data such as name and balance.
- **MongoDB Operations**:
  - Inserts a new document into the `wallet` collection with the provided data.

#### `fetchWalletDetail(id: String)`

- **Purpose**: To fetch details of a specific wallet.
- **Parameters**:
  - `id`: The unique identifier of the wallet to fetch.
- **MongoDB Operations**:
  - Retrieves a single document from the `wallet` collection matching the provided wallet ID.
  - Projects specific fields such as name, creation date, wallet ID, and balance to be returned in the result.





## Deployed API Endpoints to run on POSTMAN

Below are the available API endpoints and their functionality:

Please use this url in your postman (https://api.postman.com/collections/11436320-0987125b-628e-4944-b1ef-0c7414bff1f2?access_key=PMAT-01HEX6RDTNVESXNWWGWT4S37BC) for details of each API endpoint with their proper request-response structure.

## API Endpoints

### Initialize Wallet

- **Endpoint**: `http://localhost:3000/api/setup`
- **Method**: `POST`
- **Description**: Set up a new wallet with an initial balance.
- **Request Body**:
  ```json
  {
    "name":"High Level",
    "balance":300
  }
- **Response Body**
  ```json
  {
    "id": "912998c9-fd84-45ec-be1d-9b0f5b1b9b04",
    "balance": 300,
    "transactionId": "c16cdf6e-0234-4d9c-89e5-ab91d2da6a82",
    "name": "High Level",
    "date": "2023-11-11T08:03:21.281Z",
    "description": "Initial amount setup amount"
  }

- **Endpoint**: `http://localhost:3000/api/wallet/0f4dc3a9-96f5-49c7-a94c-29007d8b0ae1`
- **Method**: `GET`
- **Description**: Get wallet details.
- **Response Body**:
  ```json
  {
  "walletData": {
        "_id": "654e736a0ccd0209c8f4b7a5",
        "name": "HighLevel",
        "createdAt": "2023-11-10T18:16:10.538Z",
        "balance": 297.9999
    }
  }

- **Endpoint**: `http://localhost:3000/api/transact/0f4dc3a9-96f5-49c7-a94c-29007d8b0ae1`
- **Method**: `POST`
- **Description**: To do debit transactions. Negative amount indicates debit transaction
- **Request Body**:
  ```json
  {
  "description":"Food",
  "amount":-20.1
  }
- **Response Body**:
  ```json
  {
    "balance": 257.7999,
    "transactionId": "84c18e80-0d64-49b2-97c8-2674cc0c72f5"
  }

- **Endpoint**: `http://localhost:3000/api/transact/0f4dc3a9-96f5-49c7-a94c-29007d8b0ae1`
- **Method**: `POST`
- **Description**: To do credit transactions. Positive amount indicated credit transaction
- **Request Body**:
  ```json
  {
    "description":"Deposit money",
    "amount":20
  }
- **Response Body**:
  ```json
  {
   "balance": 297.7999,
   "transactionId": "d37ff760-5d67-4c8b-af22-99b190285ba8"
  }

- **Endpoint**: `http://localhost:3000/api/transactions?walletId=0f4dc3a9-96f5-49c7-a94c-29007d8b0ae1&skip=0&limit=10&filter=date_earliest`
- **Method**: `GET`
- **Description**: Fetch transaction
- **Response Body**:
  ```json
  {
      "total": 2,
      "transactions": [
        {
            "_id": "654f33730ccd0209c8f4b7ab",
            "walletId": "0f4dc3a9-96f5-49c7-a94c-29007d8b0ae1",
            "createdAt": "2023-11-11T07:55:31.683Z",
            "amount": 20,
            "balance": 297.7999,
            "description": "Deposit money",
            "type": "CREDIT",
            "transactionId": "d37ff760-5d67-4c8b-af22-99b190285ba8"
        },
        {
            "_id": "654f334c0ccd0209c8f4b7aa",
            "walletId": "0f4dc3a9-96f5-49c7-a94c-29007d8b0ae1",
            "createdAt": "2023-11-11T07:54:52.938Z",
            "amount": 20,
            "balance": 277.7999,
            "description": "Deposit money",
            "type": "CREDIT",
            "transactionId": "8e64c9c5-4b6c-4d72-8c8b-14cb1cade5ee"
        }]
  }
