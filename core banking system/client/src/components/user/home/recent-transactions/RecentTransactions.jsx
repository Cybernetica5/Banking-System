import * as React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './RecentTransactions.css';
import Cookies from 'js-cookie';

export default function TransactionHistoryCard() {
  const [transactions, setTransactions] = useState([]); // State to hold transaction data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  const userId = Cookies.get('userId');
  const customerId = Cookies.get('customerId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/recent_transactions/${customerId}`);
        setTransactions(response.data.map(transaction => ({
          ...transaction,
          amount: parseFloat(transaction.amount) || 0
        })));
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    if(userId){
      fetchData();
    }
  }, [userId]);

  // Display loading or error message
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Card className="transaction-card">
      <CardContent>
        <Typography variant="h6" >
          Recent Transactions
        </Typography>

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
      </CardContent>
    </Card>
  );
}
