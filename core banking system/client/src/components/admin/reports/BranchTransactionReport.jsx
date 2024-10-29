import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button, Card, CircularProgress
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { Bar } from 'react-chartjs-2'; // Import Bar chart from react-chartjs-2
import api from '../../../services/api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Cookies from 'js-cookie';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const branchId = Cookies.get('branchId');

const TransactionsReport = () => {
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState('');  // State for the start date
  const [endDate, setEndDate] = useState('');      // State for the end date
  const [loading, setLoading] = useState(false);   // Loading state
  const [error, setError] = useState(null);        // Error state
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);  // Total withdrawals
  const [totalDeposits, setTotalDeposits] = useState(0);        // Total deposits
  const [showChart, setShowChart] = useState(false);  // Flag to conditionally render the chart

  // Fetch data based on the selected date range
  const fetchReport = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates");
      return;
    }
    
    setLoading(true);  // Set loading to true before the API call
    setError(null);    // Clear previous errors

    try {
      const response = await api.post('/report/transaction', { startDate, endDate, branchId });
      const transactions = response.data.transactions;
      console.log('Transactions:', transactions);
      setReportData(transactions);

      // Calculate total withdrawals and deposits
      const withdrawals = transactions
        .filter((transaction) => transaction.transaction_type === 'withdrawal')
        .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

      const deposits = transactions
        .filter((transaction) => transaction.transaction_type === 'deposit')
        .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

      console.log('Withdrawals:', withdrawals);
      console.log('Deposits:', deposits);

      setTotalWithdrawals(withdrawals);
      setTotalDeposits(deposits);
      setShowChart(true);  // Set flag to true when data is fetched successfully
    } catch (error) {
      console.error('Error fetching report:', error);
      setError('Error fetching report. Please try again later.');
      setShowChart(false);  // Reset the chart flag in case of error
    } finally {
      setLoading(false);  // Set loading to false after the API call
    }
  };

  // Data for the bar chart
  const chartData = {
    labels: ['Withdrawals', 'Deposits'],  // Labels for the chart
    datasets: [
      {
        label: 'Amount',
        data: [totalWithdrawals, totalDeposits],  // Data for withdrawals and deposits
        backgroundColor: ['#FF6384', '#36A2EB'], // Colors for the bars
        borderColor: ['#FF6384', '#36A2EB'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Withdrawals vs Deposits',
      },
    },
  };

  return (
    <div>
      <Card style={{ padding: '16px', margin: '16px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
        <Typography variant="h6">Transaction Report</Typography>

        {/* Date Range Inputs */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px', marginBottom: '16px', width: 'auto' }}>
          <TextField
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)} // Update start date
              fullWidth
              style={{ flexGrow: 1 }}
          />
          <TextField
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)} // Update end date
              fullWidth
              style={{ flexGrow: 1 }}
          />
          <Button
              variant="contained"
              endIcon={<DescriptionIcon />}
              sx={{ backgroundColor: '#695CFE', ':hover': { backgroundColor: '#5648CC' } }}
              onClick={fetchReport} 
              style={{ flexShrink: 0 }}
          >
              Get Report
          </Button>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <CircularProgress />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <Typography color="error" variant="body1" style={{ textAlign: 'center', marginBottom: '16px' }}>
            {error}
          </Typography>
        )}

        {/* No Data Message */}
        {!loading && !error && reportData.length === 0 && (
          <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '16px' }}>
            No transactions found for the selected date range.
          </Typography>
        )}

        {/* Table to display transactions */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Transaction Type</TableCell>
                <TableCell>Account Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.map((transaction) => (
                <TableRow key={transaction.transaction_id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.transaction_type}</TableCell>
                  <TableCell>{transaction.account_number}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Conditionally render the chart after data is fetched */}
        {showChart && (
          <div style={{ marginTop: '16px', textAlign: 'center', width: '100%', height: '400px' }}>
            <Bar data={chartData} options={options} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default TransactionsReport;
