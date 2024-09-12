import React from 'react';
import Graph2 from './account-summary/AccountSummary';
import TransactionHistory from './recent-transactions/RecentTransactions';

const Dashboard = () => {
  return (
    <div className="home-container">
        <Graph2 />
        <TransactionHistory />
    </div>
  );
}

export default Dashboard;
