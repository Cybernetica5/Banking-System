import React, { useState, useEffect } from 'react';
import './AccountDetails.css';
import api from '../../../services/api';
import Cookie from 'js-cookie';

const AccountDetails = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const customerID = Cookie.get('customerId');
  const [accounts, setAccounts] = useState({
    savingAccounts: [],
    checkingAccounts: [],
    fixedDeposits: []
  });

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
      <p><strong>Type of Account:</strong> {account.accountType}</p>
      <p><strong>Branch Name:</strong> {account.branchName}</p>
      {account.duration && <p><strong>Duration:</strong> {account.duration}</p>}
      {account.linkedSavingAccount && <p><strong>Linked Saving Account:</strong> {account.linkedSavingAccount}</p>}
    </div>
  );

  return (
    <div className="account-details">
   
      <div className="columns">
        <div className="column">
          <h3>Saving Accounts</h3>
          {accounts.savingAccounts.length > 0 ? (
            accounts.savingAccounts.map((account, index) => (
              <div key={index} className="account-item">
                <div className="account-header">
                  Account Number: {account.accountNumber}
                </div>
                <button className="details-button" onClick={() => handleSelect(account)}>
                  {selectedAccount === account ? 'Hide Details ▲' : 'See Details ▼'}
                </button>
                {selectedAccount === account && renderAccountDetails(account)}
              </div>
            ))
          ) : (
            <p>No Savings Accounts</p>
          )}
        </div>
        <div className="column">
          <h3>Checking Accounts</h3>
          {accounts.checkingAccounts.length > 0 ? (
            accounts.checkingAccounts.map((account, index) => (
              <div key={index} className="account-item">
                <div className="account-header">
                  Account Number: {account.accountNumber}
                </div>
                <button className="details-button" onClick={() => handleSelect(account)}>
                  {selectedAccount === account ? 'Hide Details ▲' : 'See Details ▼'}
                </button>
                {selectedAccount === account && renderAccountDetails(account)}
              </div>
            ))
          ) : (
            <p>No Checking Accounts</p>
          )}
        </div>
        <div className="column">
          <h3>Fixed Deposits</h3>
          {accounts.fixedDeposits.length > 0 ? (
            accounts.fixedDeposits.map((account, index) => (
              <div key={index} className="account-item">
                <div className="account-header">
                  Account Number: {account.accountNumber}
                </div>
                <button className="details-button" onClick={() => handleSelect(account)}>
                  {selectedAccount === account ? 'Hide Details ▲' : 'See Details ▼'}
                </button>
                {selectedAccount === account && renderAccountDetails(account)}
              </div>
            ))
          ) : (
            <p>No Fixed Deposits</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;



// import React, { useState, useEffect } from 'react';
// import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Button } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import api from '../../../services/api';
// import Cookie from 'js-cookie';
// import './AccountDetails.css';

// const AccountDetails = () => {
//   const [selectedAccount, setSelectedAccount] = useState(null);
//   const customerID = Cookie.get('customerId');
//   const [accounts, setAccounts] = useState({
//     savingAccounts: [],
//     checkingAccounts: [],
//     fixedDeposits: []
//   });

//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         const response = await api.post('/account_details', { customerId: customerID });
//         const data = response.data;

//         const savingAccounts = [];
//         const checkingAccounts = [];
//         const fixedDeposits = [];

//         data.forEach(account => {
//           if (account.accountType === 'savings') {
//             savingAccounts.push(account);
//           } else if (account.accountType === 'checking') {
//             checkingAccounts.push(account);
//           } else if (account.accountType === 'fixed deposit') {
//             fixedDeposits.push(account);
//           }
//         });

//         setAccounts({
//           savingAccounts,
//           checkingAccounts,
//           fixedDeposits
//         });
//       } catch (error) {
//         console.error('Error fetching account details:', error);
//       }
//     };

//     fetchAccounts();
//   }, []);

//   const renderAccountDetails = (account) => (
//     <div>
//       <Typography variant="body1"><strong>Account Number:</strong> {account.accountNumber}</Typography>
//       <Typography variant="body1"><strong>Balance:</strong> ${account.balance}</Typography>
//       {account.withdrawalsThisMonth !== undefined && (
//         <Typography variant="body1"><strong>Withdrawals This Month:</strong> {account.withdrawalsThisMonth}</Typography>
//       )}
//       {account.interestRate && (
//         <Typography variant="body1"><strong>Interest Rate:</strong> {account.interestRate}%</Typography>
//       )}
//       <Typography variant="body1"><strong>Type of Account:</strong> {account.accountType}</Typography>
//       <Typography variant="body1"><strong>Branch Name:</strong> {account.branchName}</Typography>
//       {account.duration && (
//         <Typography variant="body1"><strong>Duration:</strong> {account.duration} months</Typography>
//       )}
//       {account.linkedSavingAccount && (
//         <Typography variant="body1"><strong>Linked Saving Account:</strong> {account.linkedSavingAccount}</Typography>
//       )}
//     </div>
//   );

//   const renderAccountCategory = (accounts, title) => (
//     <Grid item xs={12} md={4}>
//       <Typography variant="h7"  gutterBottom>
//         {title}
//       </Typography>
//       {accounts.length > 0 ? (
//         accounts.map((account, index) => (
//           <Accordion
//             key={index}
//             expanded={selectedAccount === account}
//             onChange={() => setSelectedAccount(selectedAccount === account ? null : account)}
//           >
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography>Account Number: {account.accountNumber}</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               {renderAccountDetails(account)}
//             </AccordionDetails>
//           </Accordion>
//         ))
//       ) : (
//         <Typography variant="body2" color="textSecondary">
//           No {title}
//         </Typography>
//       )}
//     </Grid>
//   );

//   return (
//     <div className="account-details">
//       <Typography variant="h6" align="center" gutterBottom>
//         Account Details
//       </Typography>
//       <Grid container spacing={3} justifyContent="center">
//         {renderAccountCategory(accounts.savingAccounts, "Saving Accounts")}
//         {renderAccountCategory(accounts.checkingAccounts, "Checking Accounts")}
//         {renderAccountCategory(accounts.fixedDeposits, "Fixed Deposits")}
//       </Grid>
//     </div>
//   );
// };

// export default AccountDetails;
