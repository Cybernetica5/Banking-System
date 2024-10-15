import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Button, Checkbox, FormControlLabel, Modal, CircularProgress, TextField, Box } from '@mui/material';
import api from '../../../services/api';

const LoanSummary = ({ loanAmount, loanDuration, loanReason, onClose }) => {
  const interestRate = 0.1; // Assuming a 10% interest rate
  const totalInterest = loanAmount * interestRate;
  const totalPaybackAmount = loanAmount + totalInterest;
  const monthlyPayment = totalPaybackAmount / loanDuration;

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
          <Typography>Purpose of Loan: {loanReason}</Typography> {/* Display loanReason */}
          <Typography>Loan Amount: ₦{loanAmount}</Typography>
          <Typography>Interest Rate: 10%</Typography>
          <Typography>Monthly Payment: ₦{monthlyPayment.toFixed(2)}</Typography>
          <Typography>No of Payments: {loanDuration}</Typography>
          <Typography>Total Payback Amount: ₦{totalPaybackAmount.toFixed(2)}</Typography>

          <FormControlLabel
            control={<Checkbox />}
            label={
              <>
                I agree to the <a href="#terms">Terms & Conditions</a> and <a href="#policy">Policy</a>.
              </>
            }
            sx={{ mt: 2 }}
          />

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Accept
          </Button>
          <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 1 }} onClick={onClose}>
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
  const [loanReason, setLoanReason] = useState('');
  const [creditLimit, setCreditLimit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const fetchCreditLimit = async () => {
      try {
        const userId = localStorage.getItem('userId');
        console.log('Fetching credit limit...');
        console.log('User ID:', userId);

        const response = await api.get(`/credit-limit`, { params: { userId } });
        const creditLimit = response.data.creditLimit;
        setCreditLimit(creditLimit);
      } catch (error) {
        console.error('Error fetching credit limit:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreditLimit();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowSummary(true);
    console.log('Loan Amount:', loanAmount);
    console.log('Loan Duration:', loanDuration);
    console.log('Loan Reason:', loanReason);
    console.log('Credit Limit:', creditLimit);
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Card sx={{width: 969, margin: 'auto', mt: 10}}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Apply for a Loan
        </Typography>

        {creditLimit !== null && (
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Your credit limit based on your fixed deposit is: <strong>{creditLimit}</strong>
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
        <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 2,  // Adds space between fields
  }}
>
  <TextField
    label="Reason"
    variant="outlined"
    fullWidth
    margin="normal"
    value={loanReason}
    onChange={(e) => setLoanReason(e.target.value)}
    required
    type="text"
    InputProps={{ sx: { width: '100%' } }} // Ensures full width
  />

  <TextField
    label="Loan Amount"
    variant="outlined"
    fullWidth
    margin="normal"
    value={loanAmount}
    onChange={(e) => setLoanAmount(e.target.value)}
    required
    type="number"
    inputProps={{
      max: creditLimit, // Set max limit
    }}
    helperText={
      <span style={{ whiteSpace: 'nowrap' }}>
        The maximum loan amount you can apply for is Rs.{creditLimit}
      </span>
    }
    InputProps={{ sx: { width: '100%' } }} // Ensures full width
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
    InputProps={{ sx: { width: '100%' } }} // Ensures full width
  />
</Box>


          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit Application
          </Button>
        </form>

        {showSummary && (
          <LoanSummary
            loanAmount={parseFloat(loanAmount)}
            loanDuration={parseInt(loanDuration, 10)}
            loanReason={loanReason}  // Pass loanReason as a prop
            onClose={handleCloseSummary}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ApplyLoan;