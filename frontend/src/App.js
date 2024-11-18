import React, { useState } from "react";
import { AptosClient } from "aptos";
import './App.css';
const client = new AptosClient("https://fullnode.devnet.aptoslabs.com/v1");

function App() {
  const [account, setAccount] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [searchAddress, setSearchAddress] = useState("");
  const [propertiesByOwner, setPropertiesByOwner] = useState([]);
  const [viewedProperty, setViewedProperty] = useState(null); // For storing the property to view

  const handleConnectWallet = async () => {
    if (!window.aptos) {
      alert("Please install the Aptos Wallet!");
      return;
    }
    const walletAccount = await window.aptos.connect();
    setAccount(walletAccount);
  };

  const handleDisconnectWallet = async () => {
    if (window.aptos) {
      await window.aptos.disconnect();
      setAccount(null);
      alert("Wallet disconnected!");
    } else {
      alert("No wallet connected.");
    }
  };

  const handleRegisterProperty = async () => {
    if (!account) {
      alert("Connect wallet first!");
      return;
    }

    if (!title || !description || price <= 0) {
      alert("All fields are required, and price must be greater than 0!");
      return;
    }

    const titleBytes = new TextEncoder().encode(title);
    const descriptionBytes = new TextEncoder().encode(description);

    const payload = {
      type: "entry_function_payload",
      function:
        "0xb07a341a22ce8cc6374004e20598e9889e9efc4d10f068c7dbcb60dfd578333f::PropertyManager::create_property",
      arguments: [titleBytes, descriptionBytes, price],
      type_arguments: [],
    };

    try {
      const transaction = await window.aptos.signAndSubmitTransaction(payload);
      alert("Property registered successfully!");
      return transaction;
    } catch (error) {
      console.error(error);
      alert("Failed to register property");
    }
  };

  const decodeHexStringToText = (hexString) => {
    try {
      const hex = hexString.startsWith("0x") ? hexString.slice(2) : hexString;
      const bytes = new Uint8Array(
        hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
      );
      const decoder = new TextDecoder("utf-8");
      return decoder.decode(bytes);
    } catch (error) {
      console.error("Error decoding hex string:", error);
      return "Decoding error";
    }
  };

  const handleSearchProperties = async () => {
    if (!searchAddress) {
      alert("Please enter an address to search!");
      return;
    }

    try {
      const resource = await client.getAccountResource(
        searchAddress,
        "0xb07a341a22ce8cc6374004e20598e9889e9efc4d10f068c7dbcb60dfd578333f::PropertyManager::Properties"
      );

      console.log("Fetched resource:", resource);

      const decodedProperties = resource.data.user_properties.map((prop) => ({
        title: decodeHexStringToText(prop.title),
        description: decodeHexStringToText(prop.description),
        price: prop.price,
      }));

      setPropertiesByOwner(decodedProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      alert("Failed to fetch properties for the specified address.");
    }
  };

  const handleViewProperty = async (property) => {
    if (!account) {
      alert("Connect wallet first!");
      return;
    }
  
    if (!property.price || property.price <= 0) {
      alert("Invalid property price!");
      return;
    }
  
    try {
      // Payload for payment transaction
      const payload = {
        type: "entry_function_payload",
        function:
          "0x1::coin::transfer", // Aptos standard function for transferring coins
        arguments: [
          searchAddress, // Recipient address (the property owner's address)
          property.price * 1e8, // Amount to send (convert to 8 decimal places for Aptos coins)
        ],
        type_arguments: ["0x1::aptos_coin::AptosCoin"], // Token type
      };
  
      // Sign and submit the transaction
      const transaction = await window.aptos.signAndSubmitTransaction(payload);
  
      console.log("Payment transaction submitted:", transaction);
  
      // Wait for transaction to complete
      const response = await client.waitForTransaction(transaction.hash);
      console.log("Transaction response:", response);
  
      alert("Payment successful! You can now view the property details.");
      setViewedProperty(property);
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Payment failed. Please try again.");
    }
  };
  

  return (
    <div className="App">
      <div className="header">
        <h1>IPLedger</h1>
        <p className="welcome-text">
        Welcome to IPLedger our decentralized platform for managing intellectual property (IP). Our platform enables users to securely register, view, and trade IP assets with transparency and traceability. With a seamless process, users can easily pay a fixed fee to access and view listed IPs, ensuring a safe and efficient experience for all.
      </p>
      </div>
      <div className="wallet-section">
        {!account ? (
          <button className="connect-wallet-btn" onClick={handleConnectWallet}>
            Connect Wallet
          </button>
        ) : (
          <div className="wallet-info">
            <p>Wallet Connected: {account?.address}</p>
            <button className="disconnect-wallet-btn" onClick={handleDisconnectWallet}>
              Disconnect Wallet
            </button>
          </div>
        )}
      </div>
      
      <div className="register-property-section">
        <h2>Register Intellectual Property</h2>
        <input
          className="input-field"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="input-field"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="input-field"
          type="number"
          placeholder="Price (in Aptos coins)"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button className="register-btn" onClick={handleRegisterProperty}>
          Register
        </button>
      </div>
      
      <div className="search-properties-section">
        <h2>Search Properties by Owner Address</h2>
        <input
          className="input-field"
          type="text"
          placeholder="Enter owner address"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearchProperties}>
          Search
        </button>
        
        <table className="properties-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {propertiesByOwner.map((prop, index) => (
              <tr key={index}>
                <td>{prop.title}</td>
                <td>{prop.price}</td>
                <td>
                  <button className="view-btn" onClick={() => handleViewProperty(prop)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {viewedProperty && (
          <div className="property-details">
            <h3>Property Details</h3>
            <table className="property-details-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{viewedProperty.title}</td>
                  <td>{viewedProperty.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
  
}

export default App;
