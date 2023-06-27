import React, { useEffect, useState } from "react";
import { transactions } from "./constant";
import './App.css';

// Mock API call
function getTransactions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transactions);
    }, 1000);
  });
}

// Calculate the reward points for a single transaction
function calculatePointsForTransaction(amount) {
  if (amount >= 100) {
    return 2 * (amount - 100) + 50;
  } else if (amount >= 50) {
    return amount - 50;
  } else {
    return 0;
  }
}

// Calculate the reward points for all transactions
function calculateRewardPoints(transactions) {
  const rewardPoints = {};

  for (const transaction of transactions) {
    const { customerId, amount, month } = transaction;

    if (!rewardPoints[customerId]) {
      rewardPoints[customerId] = {};
    }

    if (!rewardPoints[customerId][month]) {
      rewardPoints[customerId][month] = 0;
    }

    rewardPoints[customerId][month] += calculatePointsForTransaction(amount);
  }

  return rewardPoints;
}

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate the API call
    getTransactions().then((transactions) => {
      // Process the transactions
      const rewardPoints = calculateRewardPoints(transactions);
      setData(rewardPoints);
    });
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  // Render the data
  return (
    <div className="App">
      {Object.entries(data).map(([customerId, customerData]) => (
        <div key={customerId}>
          <h2>{customerId}</h2>
          {Object.entries(customerData).map(([month, points]) => (
            <p key={month}>
              {month}: {points} points
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
