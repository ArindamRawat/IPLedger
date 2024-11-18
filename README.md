# IPLedger- Decentralized Intellectual Property Management on Aptos Blockchain

IPLedger is a decentralized platform designed for managing intellectual property (IP) on the Aptos blockchain. This platform allows users to register, view, and securely trade IP assets, ensuring transparency, security, and traceability. Users can pay a pre-decided amount to view listed IPs.

## Features

- **Blockchain-Based Property Management**: Users can create, update, remove, and view their IP assets directly from their wallets.
- **Immutability & Security**: All actions, such as creating and modifying properties, are recorded immutably on the blockchain, ensuring security and transparency.
- **Decentralized**: The entire system operates on the Aptos blockchain without relying on centralized servers, giving users full control over their IP assets.
- **Property Listing**: Users can list their properties with a title, description, and price.
- **Price Update**: Users can update the price of their listed properties.
- **Property Removal**: Users can remove their properties from the platform.
- **Transparent Transactions**: All transactions related to IP asset creation, updating, and deletion are securely recorded.

## Vision

The vision of PropertyManager is to empower creators and IP owners by providing a decentralized, secure, and transparent platform for managing intellectual property. By leveraging blockchain technology and smart contracts, PropertyManager eliminates the need for centralized systems, ensuring users have complete control over their data and intellectual property. This platform seeks to provide a fair, secure, and traceable environment for the creation, modification, and trading of IP assets.

## Smart Contract Information

The backend of IPLedger is powered by a smart contract written in the Move language and deployed on the Aptos blockchain. Below are the key details of the contract:

### Contract Functions

1. **Create Property**
    - **Function**: `create_property(account: &signer, title: vector<u8>, description: vector<u8>, price: u64)`
    - **Purpose**: Allows users to create a new property for their account.
  
2. **Update Property Price**
    - **Function**: `update_property_price(account: address, title: vector<u8>, new_price: u64)`
    - **Purpose**: Updates the price of an existing property.
  
3. **Remove Property**
    - **Function**: `remove_property(account: address, title: vector<u8>)`
    - **Purpose**: Removes a property from the user's list.
  
4. **Get Properties**
    - **Function**: `get_properties(account: address): vector<Property>`
    - **Purpose**: Retrieves all properties associated with the user's account.

### Contract Details

Deployed on Devnet

- **Transaction Hash**: `0xa317828ee3a3a7db046ff7a74d2cff299d6c553fcf64ef6bcc3f5870c22bc2d6`
- **Sender Address**: `0xb07a341a22ce8cc6374004e20598e9889e9efc4d10f068c7dbcb60dfd578333f`
- **Network**: Aptos
- **Module**: PropertyManager

## Deployment

- **Transaction Hash**: [Link](https://explorer.aptoslabs.com/txn/0xa317828ee3a3a7db046ff7a74d2cff299d6c553fcf64ef6bcc3f5870c22bc2d6?network=devnet)
- **Coin Used**: Aptos Coin (APT)
- **Contract Address**: `0xb07a341a22ce8cc6374004e20598e9889e9efc4d10f068c7dbcb60dfd578333f`
  
The contract utilizes resources such as `Property` and `Properties` to manage user properties. Functions are available for creating, updating, removing, and fetching properties. All actions are securely recorded on the Aptos blockchain.

## Run Locally

Make sure you have the Petra Wallet installed in your web browser. Log in to Petra and switch to devnet in the wallet.

Clone the project

```bash
  git clone 
```

Go to the server of the project directory

```bash
  cd IPLedger/backend
```

Install dependencies

```bash
  npm install
```

Go to the frontend of the project directory

```bash
  cd IPLedger/frontend
```

Install dependencies

```bash
  npm install
```

Start the frontend server

```bash
  npm start
```

## Video Link
[Video Link](https://youtu.be/PqdXdDTysic)

## Images of the Interface

Logo:

![IpLedger](https://github.com/user-attachments/assets/7c4d796a-7bc2-49e5-a8fe-ed93814ea747)

Registration Process
![Screenshot 2024-11-18 191940](https://github.com/user-attachments/assets/c87190b2-4b38-49f8-b601-e7edc7c6ced4)

![Screenshot 2024-11-18 191957](https://github.com/user-attachments/assets/c60df8f7-3bc1-4968-85d5-3d0f25b6e3ed)

Searching Process (current balance is also visible)
![Screenshot 2024-11-18 192101](https://github.com/user-attachments/assets/c3e7dc4c-c91f-4483-8d25-5abfe2b4b83e)

Payment and Viewing Process (new balance after transaction is visible)
![Screenshot 2024-11-18 192120](https://github.com/user-attachments/assets/01b54749-9eed-4a2a-b7d3-68e6105d7a2d)

![Screenshot 2024-11-18 192330](https://github.com/user-attachments/assets/799f7f73-ae94-49a6-b1cb-079826646bdb)

