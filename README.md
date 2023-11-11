# Wallet App API Documentation

This document provides an overview of the API endpoints for the Wallet App. The Wallet App allows users to manage their financial transactions and wallet balance.

## Getting Started

Clone the git repository in your local machine
After cloning is successful do npm i first then npm run build and finally npm start.
With this step you should be able to run the project locally.


End with an example of getting some data out of the system or using it for a little demo

## Deployed API Endpoints to run on POSTMAN

Below are the available API endpoints and their functionality:

Please use this url in your postman (https://api.postman.com/collections/11436320-0987125b-628e-4944-b1ef-0c7414bff1f2?access_key=PMAT-01HEX6RDTNVESXNWWGWT4S37BC) for details of each API endpoint with their proper request-response structure.

## API Endpoints

### Initialize Wallet

- **Endpoint**: `/setup`
- **Method**: `POST`
- **Description**: Set up a new wallet with an initial balance.
- **Response Body**:
  ```json
  {
    "name": "string",
    "balance": "number"
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
 "total": 6,
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
        },
        {
            "_id": "654f32200ccd0209c8f4b7a9",
            "walletId": "0f4dc3a9-96f5-49c7-a94c-29007d8b0ae1",
            "createdAt": "2023-11-11T07:49:52.641Z",
            "amount": -20.1,
            "balance": 257.7999,
            "description": "Food",
            "type": "DEBIT",
            "transactionId": "84c18e80-0d64-49b2-97c8-2674cc0c72f5"
        }
      ]
  }
