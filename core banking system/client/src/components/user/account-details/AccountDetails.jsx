import React, { useState, useEffect } from 'react';
import './AccountDetails.css';
import api from '../../../services/api';

const customerID = 1;

const AccountDetails = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState({
    savingAccounts: [],
    checkingAccounts: [],
    fixedDeposits: []
  });

  // useEffect(() => {
  //   const fetchAccounts = async () => {
  //     try {
  //       const response = await api.post('/account_details', { "customerId": customerID });
  //       // const response = await fetch('/api/getAccountDetails', customerID);
  //       console.log(response.data);
  //       // const data = await response.json();
  //       // setAccounts(data);
  //     } catch (error) {
  //       console.error('Error fetching account details:', error);
  //     }
  //   };

  //   fetchAccounts();
  // }, []);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.post('/account_details', { customerId: customerID });
        const data = response.data;
  
        // Initialize empty arrays
        const savingAccounts = [];
        const checkingAccounts = [];
        const fixedDeposits = [];
  
        // Categorize accounts based on accountType
        data.forEach(account => {
          if (account.accountType === 'savings') {
            savingAccounts.push(account);
          } else if (account.accountType === 'checking') {
            checkingAccounts.push(account);
          } else if (account.accountType === 'fixed deposit') {
            fixedDeposits.push(account);
          }
        });
  
        // Update state
        setAccounts({
          savingAccounts,
          checkingAccounts,
          fixedDeposits
        });
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };
  
    fetchAccounts();
  }, []);
  

  const handleSelect = (account) => {
    setSelectedAccount(selectedAccount === account ? null : account);
  };

  const renderAccountDetails = (account) => (
    <div className="account-info">
      <p><strong>Account Number:</strong> {account.accountNumber}</p>
      <p><strong>Balance:</strong> ${account.balance}</p>
      {account.withdrawalsThisMonth !== undefined && <p><strong>Withdrawals This Month:</strong> {account.withdrawalsThisMonth}</p>}
      {account.interestRate && <p><strong>Interest Rate:</strong> {account.interestRate}</p>}
      {account.minBalance && <p><strong>Minimum Balance:</strong> ${account.minBalance}</p>}
      <p><strong>Type of Account:</strong> {account.accountType}</p>
      <p><strong>Branch Name:</strong> {account.branchName}</p>
      <p><strong>Branch ID:</strong> {account.branchId}</p>
      {account.duration && <p><strong>Duration:</strong> {account.duration}</p>}
      {account.linkedSavingAccount && <p><strong>Linked Saving Account:</strong> {account.linkedSavingAccount}</p>}
      {/*account.startDate && <p><strong>Interest Received:</strong> ${calculateInterestReceived(account)}</p>*/}
    </div>
  );

  return (
    <div className="account-details">
      <h2 className="heading">Account Details</h2>
      <div className="columns">
        <div className="column">
          <h3>Saving Accounts</h3>
          {accounts.savingAccounts.map((account, index) => (
            <div key={index} className="account-item">
              <div className="account-header">
                Account Number: {account.accountNumber}
              </div>
              <button className="details-button" onClick={() => handleSelect(account)}>
                {selectedAccount === account ? 'Hide Details ▲' : 'See Details ▼'}
              </button>
              {selectedAccount === account && renderAccountDetails(account)}
            </div>
          ))}
        </div>
        <div className="column">
          <h3>Checking Accounts</h3>
          {accounts.checkingAccounts.map((account, index) => (
            <div key={index} className="account-item">
              <div className="account-header">
                Account Number: {account.accountNumber}
              </div>
              <button className="details-button" onClick={() => handleSelect(account)}>
                {selectedAccount === account ? 'Hide Details ▲' : 'See Details ▼'}
              </button>
              {selectedAccount === account && renderAccountDetails(account)}
            </div>
          ))}
        </div>
        <div className="column">
          <h3>Fixed Deposits</h3>
          {accounts.fixedDeposits.map((account, index) => (
            <div key={index} className="account-item">
              <div className="account-header">
                Account Number: {account.accountNumber}
              </div>
              <button className="details-button" onClick={() => handleSelect(account)}>
                {selectedAccount === account ? 'Hide Details ▲' : 'See Details ▼'}
              </button>
              {selectedAccount === account && renderAccountDetails(account)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;





// //import React from "react";
// //import "./AccountDetails.css";


// // AccountDetails.js
// import React, { useState } from 'react';
// import { userAccounts } from './mockData';
// import './AccountDetails.css';

// // const calculateInterestReceived = (account) => {
// //   const startDate = new Date(account.startDate);
// //   const currentDate = new Date();
// //   const monthsElapsed = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 30));
// //   const monthlyInterestRate = parseFloat(account.interestRate) / 100 / 12;
// //   return (account.balance * monthlyInterestRate * monthsElapsed).toFixed(2);
// // };

// const AccountDetails = () => {
//   const [selectedAccount, setSelectedAccount] = useState(null);

//   const handleSelect = (account) => {
//     setSelectedAccount(selectedAccount === account ? null : account);
//   };

//   const renderAccountDetails = (account) => (
//     <div className="account-info">
//       <p><strong>Account Number:</strong> {account.accountNumber}</p>
//       <p><strong>Balance:</strong> ${account.balance}</p>
//       {account.withdrawalsThisMonth !== undefined && <p><strong>Withdrawals This Month:</strong> {account.withdrawalsThisMonth}</p>}
//       {account.interestRate && <p><strong>Interest Rate:</strong> {account.interestRate}</p>}
//       {account.minBalance && <p><strong>Minimum Balance:</strong> ${account.minBalance}</p>}
//       <p><strong>Type of Account:</strong> {account.accountType}</p>
//       <p><strong>Branch Name:</strong> {account.branchName}</p>
//       <p><strong>Branch ID:</strong> {account.branchId}</p>
//       {account.duration && <p><strong>Duration:</strong> {account.duration}</p>}
//       {account.linkedSavingAccount && <p><strong>Linked Saving Account:</strong> {account.linkedSavingAccount}</p>}
//       {account.startDate && <p><strong>Interest Received:</strong> ${calculateInterestReceived(account)}</p>}
//     </div>
//   );

//   return (
//     <div className="account-details">
//       <h2 className="heading">Account Details</h2>
//       <div className="columns">
//         <div className="column">
//           <h3>Saving Accounts</h3>
//           {userAccounts.savingAccounts.map((account, index) => (
//             <div key={index} className="account-item">
//               <div className="account-header">
//                 Account Number: {account.accountNumber}
//               </div>
//               <button className="details-button" onClick={() => handleSelect(account)}>
//                 {selectedAccount === account ? 'Hide Details ▲' : 'See Details ▼'}
//               </button>
//               {selectedAccount === account && renderAccountDetails(account)}
//             </div>
//           ))}
//         </div>
//         <div className="column">
//           <h3>Checking Accounts</h3>
//           {userAccounts.checkingAccounts.map((account, index) => (
//             <div key={index} className="account-item">
//               <div className="account-header">
//                 Account Number: {account.accountNumber}
//               </div>
//               <button className="details-button" onClick={() => handleSelect(account)}>
//                 {selectedAccount === account ? 'Hide Details ▲' : 'See Details ▼'}
//               </button>
//               {selectedAccount === account && renderAccountDetails(account)}
//             </div>
//           ))}
//         </div>
//         <div className="column">
//           <h3>Fixed Deposits</h3>
//           {userAccounts.fixedDeposits.map((account, index) => (
//             <div key={index} className="account-item">
//               <div className="account-header">
//                 Account Number: {account.accountNumber}
//               </div>
//               <button className="details-button" onClick={() => handleSelect(account)}>
//                 {selectedAccount === account ? 'Hide Details ▲' : 'See Details ▼'}
//               </button>
//               {selectedAccount === account && renderAccountDetails(account)}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountDetails;

