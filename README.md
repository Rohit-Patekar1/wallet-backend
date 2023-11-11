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
- **Request Body**:
  ```json
  {
    "name": "string",
    "balance": "number"
  }

- **Endpoint**: `http://localhost:3000/api/wallet/0f4dc3a9-96f5-49c7-a94c-29007d8b0ae1`
- **Method**: `GET`
- **Description**: Get wallet details.
- **Request Body**:
  ```json
  {
  "walletData": {
        "_id": "654e736a0ccd0209c8f4b7a5",
        "name": "HighLevel",
        "createdAt": "2023-11-10T18:16:10.538Z",
        "balance": 297.9999
    }
  }

- **Endpoint**: `/setup`
- **Method**: `POST`
- **Description**: Set up a new wallet with an initial balance.
- **Request Body**:
  ```json
  {
    "name": "string",
    "balance": "number"
  }

- **Endpoint**: `/setup`
- **Method**: `POST`
- **Description**: Set up a new wallet with an initial balance.
- **Request Body**:
  ```json
  {
    "name": "string",
    "balance": "number"
  }

- **Endpoint**: `/setup`
- **Method**: `POST`
- **Description**: Set up a new wallet with an initial balance.
- **Request Body**:
  ```json
  {
    "name": "string",
    "balance": "number"
  }
