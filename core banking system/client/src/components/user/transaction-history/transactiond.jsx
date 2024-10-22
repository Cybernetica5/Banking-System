import * as React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './transactionds.css';

export default function TransactionHistoryCard() {
  const [transactions, setTransactions] = useState([]); // State to hold transaction data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors
  let userId = null;

  try {
    const storedUser = localStorage.getItem('user');
    userId = storedUser ? JSON.parse(storedUser).id : null;
  } catch (err) {
    console.error('Error parsing localStorage user data:', err);
    setError('Failed to load user data');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/transaction_History?customer_id=${userId}`);
        setTransactions(response.data.map(transaction => ({
          ...transaction,
          amount: parseFloat(transaction.amount) || 0,
        })));
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError(`Failed to fetch transactions: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
  
    if (userId) {
      fetchData();
    } else {
      setLoading(false);
      setError('User not found. Please log in.');
    }
  }, [userId]);

  // Display loading or error message
  if (loading) return <div className="loading"><CircularProgress /></div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <Card className="transaction-card">
      <CardContent>
        <Typography variant="h5" className="card-title">
          Transaction History
        </Typography>

        {transactions.length === 0 ? (
          <Typography>No transactions found.</Typography>
        ) : (
          <TableContainer component={Paper} className="transaction-table">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount (LKR)</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell>{transaction.transaction_type}</TableCell>
                    <TableCell>{transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
}
