import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Button, Checkbox, FormControlLabel, Modal, CircularProgress, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import api from '../../../services/api';
import Cookies from 'js-cookie';

const LoanSummary = ({ accountNumber, loanAmount, loanDuration, loanType, onClose }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  let interestRate;
  if (loanType === 'personal') {
    if (loanDuration <= 12) {
      interestRate = 0.05;
    } else if (loanDuration > 12 && loanDuration <= 36) {
      interestRate = 0.045;
    } else {
      interestRate = 0.04;
    }
  } else if (loanType === 'business') {
    if (loanDuration <= 12) {
      interestRate = 0.06;
    } else if (loanDuration > 12 && loanDuration <= 36) {
      interestRate = 0.055;
    } else {
      interestRate = 0.05;
    }
  }

  const totalInterest = loanAmount * interestRate;
  const totalPaybackAmount = loanAmount + totalInterest;
  const monthlyPayment = totalPaybackAmount / loanDuration;

  const handleAccept = () => {
    const customerId = Cookies.get('customerId');
    const loanStartDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(loanStartDate);
    startDate.setMonth(startDate.getMonth() + loanDuration);
    const loanEndDate = startDate.toISOString().split('T')[0];
    
    api.post('/apply_loan', { accountNumber, customerId, loanType, loanAmount, loanStartDate, loanEndDate })
      .then(() => {
        console.log('Loan Submitted For Processing');
        onClose();
      })
      .catch((error) => {
        console.error('Error submitting loan:', error);
      });
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Card sx={{ p: 3, maxWidth: 400, margin: 'auto', mt: 10 }}>
        <CardContent>
          <Typography variant="h6">Congrats! You are eligible.</Typography>
          <Typography variant="body2" gutterBottom>
            Kindly allow 3-4hrs for the amount to reflect in your bank account.
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Transaction Summary</strong>
          </Typography>
          <Typography>Account Number: {accountNumber}</Typography>
          <Typography>Purpose of Loan: {loanType === 'personal' ? 'Personal' : 'Business'}</Typography>
          <Typography>Loan Amount: Rs. {loanAmount}</Typography>
          <Typography>Interest Rate: {interestRate * 100}%</Typography>
          <Typography>Monthly Payment: Rs. {monthlyPayment.toFixed(2)}</Typography>
          <Typography>No of Payments: {loanDuration}</Typography>
          <Typography>Total Payback Amount: Rs. {totalPaybackAmount.toFixed(2)}</Typography>

          <FormControlLabel
            control={<Checkbox checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} />}
            label={
              <>
                I agree to the <a href="#terms">Terms & Conditions</a> and <a href="#policy">Policy</a>.
              </>
            }
            sx={{ mt: 2 }}
          />

          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAccept} disabled={!isAgreed}>
            Accept
          </Button>
          <Button variant="outlined" color="secondary" sx={{ mt: 1 }} onClick={onClose}>
            Decline
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
};

const ApplyLoan = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [loanDuration, setLoanDuration] = useState('');
  const [loanType, setLoanType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountNumbers, setAccountNumbers] = useState([]);
  const [creditLimit, setCreditLimit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const fetchCreditLimitAndAccounts = async () => {
      try {
        const userId = Cookies.get('userId'); // Get the user ID from the user object
        const customerId = Cookies.get('customerId'); // Get the customer ID from the user object
        console.log('Fetching credit limit and account numbers...');
        console.log('user ID:', userId);
        console.log('customer ID:', customerId);

        const [creditLimitResponse, accountsResponse] = await Promise.all([
          api.get(`/credit-limit`, { params: { userId } }),
          api.get(`/user_accounts`, { params: { customerId } })
        ]);

        console.log('Credit Limit Response:', creditLimitResponse.data); // Log the credit limit response
        console.log('Accounts Response:', accountsResponse.data); // Log the entire accounts response

        setCreditLimit(creditLimitResponse.data.creditLimit);
        setAccountNumbers(accountsResponse.data.map(account => account.account_number));
      } catch (error) {
        console.error('Error fetching credit limit or account numbers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreditLimitAndAccounts();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowSummary(true);
    console.log('Loan Amount:', loanAmount);
    console.log('Loan Duration:', loanDuration);
    console.log('Loan Type:', loanType);
    console.log('Account Number:', accountNumber);
    console.log('Credit Limit:', creditLimit);
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Card sx={{ maxWidth: '800px', margin: 'auto', padding: '20px', borderRadius: 4, marginTop: '20px'}}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Apply for a Loan
        </Typography>

        {creditLimit !== null && (
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Your credit limit based on your fixed deposit is: <strong>{creditLimit}</strong>
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Loan Type</InputLabel>
            <Select
              value={loanType}
              onChange={(e) => setLoanType(e.target.value)}
              label="Loan Type"
              align="left"
            >
              <MenuItem value="personal">Personal</MenuItem>
              <MenuItem value="business">Business</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Account Number</InputLabel>
            <Select
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              label="Account Number"
              align="left"
            >
              {accountNumbers.map((account) => (
                <MenuItem key={account} value={account}>
                  {account}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Loan Amount"
            variant="outlined"
            fullWidth
            margin="normal"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            required
            type="number"
            sx={{
              height: '56px', 
              '& input': { 
                height: '56px',
                fontSize: '16px'
                }
            }}
            inputProps={{
              max: creditLimit, // Set the max limit as the credit limit
            }}
          />
          <TextField
            label="Loan Duration (in months)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={loanDuration}
            onChange={(e) => setLoanDuration(e.target.value)}
            required
            type="number"
            sx={{
              height: '56px', 
              '& input': { 
                height: '56px',
                fontSize: '16px'
                }
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit Application
          </Button>
        </form>

        {showSummary && (
          <LoanSummary
            accountNumber={accountNumber}
            loanAmount={parseFloat(loanAmount)}
            loanDuration={parseInt(loanDuration, 10)}
            loanType={loanType}  // Pass loanType as a prop
            onClose={handleCloseSummary}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ApplyLoan;