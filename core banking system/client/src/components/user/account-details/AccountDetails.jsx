//import React from "react";
//import "./AccountDetails.css";


// AccountDetails.js
import React, { useState } from 'react';
import { userAccounts } from './mockData';
import './AccountDetails.css';

const calculateInterestReceived = (account) => {
  const startDate = new Date(account.startDate);
  const currentDate = new Date();
  const monthsElapsed = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24 * 30));
  const monthlyInterestRate = parseFloat(account.interestRate) / 100 / 12;
  return (account.balance * monthlyInterestRate * monthsElapsed).toFixed(2);
};

const AccountDetails = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);

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
      {account.startDate && <p><strong>Interest Received:</strong> ${calculateInterestReceived(account)}</p>}
    </div>
  );

  return (
    <div className="account-details">
      <h2 className="heading">Account Details</h2>
      <div className="columns">
        <div className="column">
          <h3>Saving Accounts</h3>
          {userAccounts.savingAccounts.map((account, index) => (
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
          {userAccounts.checkingAccounts.map((account, index) => (
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
          {userAccounts.fixedDeposits.map((account, index) => (
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







// // interest rate, type of account, branch name, and branch ID
// // AccountDetails.js
// import React, { useState } from 'react';
// import { userAccounts } from './mockData';
// import './AccountDetails.css';

// const AccountDetails = () => {
//   const [selectedAccount, setSelectedAccount] = useState(null);

//   const handleSelect = (account) => {
//     setSelectedAccount(selectedAccount === account ? null : account);
//   };

//   const renderAccountDetails = (account) => (
//     <div className="account-info">
//       <p>Account Number: {account.accountNumber}</p>
//       <p>Balance: ${account.balance}</p>
//       <p>Interest Rate: {account.interestRate}</p>
//       <p>Type of Account: {account.accountType}</p>
//       <p>Branch Name: {account.branchName}</p>
//       <p>Branch ID: {account.branchId}</p>
//     </div>
//   );

//   return (
//     <div className="account-details">
//       <h2>Account Details</h2>
//       <div className="columns">
//         <div className="column">
//           <h3>Saving Accounts</h3>
//           {userAccounts.savingAccounts.map((account, index) => (
//             <div key={index} className="account-item">
//               <div className="account-header" onClick={() => handleSelect(account)}>
//                 Account Number: {account.accountNumber}
//               </div>
//               {selectedAccount === account && renderAccountDetails(account)}
//             </div>
//           ))}
//         </div>
//         <div className="column">
//           <h3>Checking Accounts</h3>
//           {userAccounts.checkingAccounts.map((account, index) => (
//             <div key={index} className="account-item">
//               <div className="account-header" onClick={() => handleSelect(account)}>
//                 Account Number: {account.accountNumber}
//               </div>
//               {selectedAccount === account && renderAccountDetails(account)}
//             </div>
//           ))}
//         </div>
//         <div className="column">
//           <h3>Fixed Deposits</h3>
//           {userAccounts.fixedDeposits.map((account, index) => (
//             <div key={index} className="account-item">
//               <div className="account-header" onClick={() => handleSelect(account)}>
//                 Account Number: {account.accountNumber}
//               </div>
//               {selectedAccount === account && renderAccountDetails(account)}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountDetails;







/*......................................*/
// AccountDetails.js

// import React, { useState } from 'react';
// import { userAccounts } from './mockData';
// import './AccountDetails.css';


// const AccountDetails = () => {
//   const [selectedAccount, setSelectedAccount] = useState(null);

//   const handleSelect = (account) => {
//     setSelectedAccount(selectedAccount === account ? null : account);
//   };

//   const renderAccountDetails = (account) => (
//     <div className="account-info">
//       <p>Account Number: {account.accountNumber}</p>
//       <p>Balance: ${account.balance}</p>
//     </div>
//   );

//   return (
//     <div className="account-details">
//       <h2>Account Details</h2>
//       <div className="columns">
//         <div className="column">
//           <h3>Saving Accounts</h3>
//           {userAccounts.savingAccounts.map((account, index) => (
//             <div key={index} className="account-item">
//               <div className="account-header" onClick={() => handleSelect(account)}>
//                 Account Number: {account.accountNumber}
//               </div>
//               {selectedAccount === account && renderAccountDetails(account)}
//             </div>
//           ))}
//         </div>
//         <div className="column">
//           <h3>Checking Accounts</h3>
//           {userAccounts.checkingAccounts.map((account, index) => (
//             <div key={index} className="account-item">
//               <div className="account-header" onClick={() => handleSelect(account)}>
//                 Account Number: {account.accountNumber}
//               </div>
//               {selectedAccount === account && renderAccountDetails(account)}
//             </div>
//           ))}
//         </div>
//         <div className="column">
//           <h3>Fixed Deposits</h3>
//           {userAccounts.fixedDeposits.map((account, index) => (
//             <div key={index} className="account-item">
//               <div className="account-header" onClick={() => handleSelect(account)}>
//                 Account Number: {account.accountNumber}
//               </div>
//               {selectedAccount === account && renderAccountDetails(account)}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountDetails;





// const AccountDetails = () => {
//   const [selectedSavingAccount, setSelectedSavingAccount] = useState(null);
//   const [selectedCheckingAccount, setSelectedCheckingAccount] = useState(null);
//   const [selectedFixedDeposit, setSelectedFixedDeposit] = useState(null);

//   const handleSelect = (type, account) => {
//     if (type === 'saving') {
//       setSelectedSavingAccount(account);
//     } else if (type === 'checking') {
//       setSelectedCheckingAccount(account);
//     } else if (type === 'fixed') {
//       setSelectedFixedDeposit(account);
//     }
//   };

//   return (
//     <div className="account-details">
//       <h2>Account Details</h2>

//       <div className="dropdown">
//         <button className="dropbtn">Saving Accounts</button>
//         <div className="dropdown-content">
//           {userAccounts.savingAccounts.map((account, index) => (
//             <a key={index} onClick={() => handleSelect('saving', account)}>
//               Account Number: {account.accountNumber}, Balance: ${account.balance}
//             </a>
//           ))}
//         </div>
//       </div>

//       <div className="dropdown">
//         <button className="dropbtn">Checking Accounts</button>
//         <div className="dropdown-content">
//           {userAccounts.checkingAccounts.map((account, index) => (
//             <a key={index} onClick={() => handleSelect('checking', account)}>
//               Account Number: {account.accountNumber}, Balance: ${account.balance}
//             </a>
//           ))}
//         </div>
//       </div>

//       <div className="dropdown">
//         <button className="dropbtn">Fixed Deposits</button>
//         <div className="dropdown-content">
//           {userAccounts.fixedDeposits.map((account, index) => (
//             <a key={index} onClick={() => handleSelect('fixed', account)}>
//               Account Number: {account.accountNumber}, Balance: ${account.balance}
//             </a>
//           ))}
//         </div>
//       </div>

//       <div className="account-info">
//         {selectedSavingAccount && (
//           <div>
//             <h3>Selected Saving Account</h3>
//             <p>Account Number: {selectedSavingAccount.accountNumber}</p>
//             <p>Balance: ${selectedSavingAccount.balance}</p>
//           </div>
//         )}
//         {selectedCheckingAccount && (
//           <div>
//             <h3>Selected Checking Account</h3>
//             <p>Account Number: {selectedCheckingAccount.accountNumber}</p>
//             <p>Balance: ${selectedCheckingAccount.balance}</p>
//           </div>
//         )}
//         {selectedFixedDeposit && (
//           <div>
//             <h3>Selected Fixed Deposit</h3>
//             <p>Account Number: {selectedFixedDeposit.accountNumber}</p>
//             <p>Balance: ${selectedFixedDeposit.balance}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AccountDetails;
/*......................................*/

// const AccountDetails = () => {
//   const accounts = [
//     // accounts
//   ]
//   return(
//     <div className="account-details">
//       <div className="main-content">
//         <h1>Account Details</h1>
//         <div id="accounts">
//           {accounts.map((account) => (
//             <div className="account-card" key={account.id}>
//               <h2>{account.accountType} Account - {account.accountNumber}</h2>
//               <p>Account Type: {account.accountType}</p>
//               <p>Current Balance: {account.balance}</p>
//               <p>Interest Rate: {account.interestRate}</p>
//               <p>Withdrawals: {account.withdrawals || "N/A"}</p>
//               {account.linkedAccount && (
//                 <p>Linked Savings Account: {account.linkedAccount}</p>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountDetails;

