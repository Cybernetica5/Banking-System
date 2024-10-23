import React, { useState } from 'react';
import { Typography, Card, CardContent, TextField, Button, Modal, FormControlLabel, Checkbox } from '@mui/material';

const FdSummary = ({ fdAmount, fdDuration, accountNumber, onClose }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const interestRate = 0.1; // Assuming a 10% interest rate
  const totalInterest = fdAmount * interestRate;
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + fdDuration);

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
          <Typography>Deposit Amount: Rs. {fdAmount}</Typography>
          <Typography>Interest Rate: 10%</Typography>
          <Typography>Total Interest: Rs. {totalInterest.toFixed(2)}</Typography>
          <Typography>Start Date: {startDate.toLocaleDateString()}</Typography>
          <Typography>End Date: {endDate.toLocaleDateString()}</Typography>

          <FormControlLabel
            control={<Checkbox checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)} />}
            label={
              <>
                I agree to the <a href="#terms">Terms & Conditions</a> and <a href="#policy">Policy</a>.
              </>
            }
            sx={{ mt: 2 }}
          />

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={onClose} disabled={!isAgreed}>
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

const ApplyFixedDeposit = () => {
  const [name, setName] = useState('');
  const [fdAmount, setfdAmount] = useState('');
  const [fdDuration, setfdDuration] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [showSummary, setShowSummary] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowSummary(true);
    console.log('Deposit Amount:', fdAmount);
    console.log('Deposit Duration:', fdDuration);
    console.log('Account Number:', accountNumber);
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  return (
    <Card sx={{ width: 969, margin: 'auto', mt: 10 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Apply for a Fixed Deposit
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            type="text"
          />
          <TextField
            label="Account Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
            type="text"
          />
          <TextField
            label="Deposit Amount"
            variant="outlined"
            fullWidth
            margin="normal"
            value={fdAmount}
            onChange={(e) => setfdAmount(e.target.value)}
            required
          />
          <TextField
            label="Fixed Deposit Duration (in months)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={fdDuration}
            onChange={(e) => setfdDuration(e.target.value)}
            required
          />
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
          <FdSummary
            fdAmount={parseFloat(fdAmount)}
            fdDuration={parseInt(fdDuration, 10)}
            accountNumber={accountNumber}
            onClose={handleCloseSummary}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ApplyFixedDeposit;