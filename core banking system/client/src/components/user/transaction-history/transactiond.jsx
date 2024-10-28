import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  CircularProgress,
  TablePagination
} from '@mui/material';
import axios from 'axios';
import './transactionds.css';

export default function TransactionHistoryCard() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ type: 'all', dateRange: 'all' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const storedUser = localStorage.getItem('user');
  const userId = storedUser ? JSON.parse(storedUser)?.id : null;

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setError('User not found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8800/transaction_History?customer_id=${userId}`);
        const data = response.data.map(transaction => ({
          ...transaction,
          amount: parseFloat(transaction.amount) || 0,
          date: new Date(transaction.date)
        }));
        setTransactions(data);
        setFilteredTransactions(data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError(`Failed to fetch transactions: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const applyFilters = (transactions, filter) => {
    const now = new Date();

    return transactions.filter(transaction => {
      const typeMatch = filter.type === 'all' || transaction.transaction_type === filter.type;
      const dateMatch = (() => {
        switch (filter.dateRange) {
          case 'week':
            return (now - transaction.date) / (1000 * 60 * 60 * 24) <= 7;
          case 'month':
            return transaction.date.getMonth() === now.getMonth() && transaction.date.getFullYear() === now.getFullYear();
          case 'year':
            return transaction.date.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      })();

      return typeMatch && dateMatch;
    });
  };

  useEffect(() => {
    setFilteredTransactions(applyFilters(transactions, filter));
    setPage(0);
  }, [filter, transactions]);

  const handleTypeFilterChange = (type) => {
    setFilter(prev => ({ ...prev, type }));
  };

  const handleDateRangeFilterChange = (dateRange) => {
    setFilter(prev => ({ ...prev, dateRange }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) return <div className="loading"><CircularProgress /></div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="transaction-container">
      <div className="button-group">
        <button className={`filter-button ${filter.type === 'withdrawal' ? 'active' : ''}`} onClick={() => handleTypeFilterChange('withdrawal')}>Withdrawal</button>
        <button className={`filter-button ${filter.type === 'deposit' ? 'active' : ''}`} onClick={() => handleTypeFilterChange('deposit')}>Deposit</button>
        <button className={`filter-button ${filter.type === 'transfer' ? 'active' : ''}`} onClick={() => handleTypeFilterChange('transfer')}>Transfer</button>
        <button className={`filter-button ${filter.type === 'all' ? 'active' : ''}`} onClick={() => handleTypeFilterChange('all')}>All types</button>
      </div>

      <div className="button-group">
        <button className={`filter-button ${filter.dateRange === 'week' ? 'active' : ''}`} onClick={() => handleDateRangeFilterChange('week')}>This week</button>
        <button className={`filter-button ${filter.dateRange === 'month' ? 'active' : ''}`} onClick={() => handleDateRangeFilterChange('month')}>This month</button>
        <button className={`filter-button ${filter.dateRange === 'year' ? 'active' : ''}`} onClick={() => handleDateRangeFilterChange('year')}>This year</button>
        <button className={`filter-button ${filter.dateRange === 'all' ? 'active' : ''}`} onClick={() => handleDateRangeFilterChange('all')}>All transactions</button>
      </div>

      <Card className="transaction-card">
        <CardContent>
          <Typography variant="h5" className="card-title">
            Transaction History
          </Typography>
          {filteredTransactions.length === 0 ? (
            <Typography>No transactions found.</Typography>
          ) : (
            <>
              <TableContainer component={Paper}>
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
                    {filteredTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
                          <TableCell>{transaction.transaction_type}</TableCell>
                          <TableCell>{transaction.amount.toFixed(2)}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={filteredTransactions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
