import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper 
} from '@mui/material';

const TransactionHistory = () => {
  // Dummy data for transactions
  const transactions = [
    { id: 1, date: '2023-06-01', description: 'Grocery Store', amount: -50.00, type: 'debit' },
    { id: 2, date: '2023-06-02', description: 'Salary Deposit', amount: 2000.00, type: 'credit' },
    { id: 3, date: '2023-06-03', description: 'Electric Bill', amount: -75.00, type: 'debit' },
    { id: 4, date: '2023-06-04', description: 'Transfer from Savings', amount: 500.00, type: 'credit' },
    { id: 5, date: '2023-06-05', description: 'Online Purchase', amount: -30.00, type: 'debit' },
  ];

  return (
    <div className="transaction-history-container">
      <Typography variant="h4" gutterBottom>
        Transaction History
      </Typography>
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell align="right" style={{ color: transaction.type === 'credit' ? 'green' : 'red' }}>
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </TableCell>
                    <TableCell>{transaction.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionHistory;