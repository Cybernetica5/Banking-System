import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import './AccountSummary.css';
import { account_summary } from '../../../../services/auth';
import Cookies from 'js-cookie';

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChartWithCenterLabel() {
  const [data, setData] = useState([]); // State to hold pie chart data
  const [totalAmount, setTotalAmount] = useState(0); // State to hold total amount
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading
  const [chartSize, setChartSize] = useState({ width: 500, height: 250 }); // Responsive chart size
  //const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
  //const customerId = localStorage.getItem('customerId') ? JSON.parse(localStorage.getItem('user')).customer_id : null;
  const userId = Cookies.get('userId');
  const customerId = Cookies.get('customerId');

  const colors = ["#FF7043", "#FFCA28", "#FF8A80"];

  console.log('User ID:', userId);
  console.log('Customer ID:', customerId);
  
  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await account_summary(customerId);
        const fetchedData = response.data;

        // Transform the data
        if (fetchedData.length > 0) {
          const accountData = fetchedData[0];
          const transformedData = [
            { value: parseFloat(accountData.savings_account_balance) || 0, label: 'Savings' },
            { value: parseFloat(accountData.checking_account_balance) || 0, label: 'Checking' },
            { value: parseFloat(accountData.fd_balance) || 0, label: 'Fixed Deposits' }
          ];
          setData(transformedData);

          // Calculate total amount
          const total = transformedData.reduce((sum, entry) => sum + entry.value, 0);
          setTotalAmount(total);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      fetchData();
    }
  }, [customerId]);

  // Adjust chart size based on window size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth < 600 ? window.innerWidth - 40 : 500;
      const height = window.innerWidth < 600 ? 200 : 250;
      setChartSize({ width, height });
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Initial call to set the correct size
    handleResize();

    // Cleanup the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Display loading or error message if any
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Card className="chart-card">
      <CardContent>
        <Typography variant="h6">
          Account Summary
        </Typography>
        <PieChart
          series={[
            {
              data: data.map((entry, index) => ({
                ...entry,
                color: colors[index % colors.length]  // Assign color from the palette
              })),
              innerRadius: 75,
              outerRadius: 100
            }
          ]}
          {...chartSize}
        >
          <PieCenterLabel>{`${totalAmount.toFixed(2)} $`}</PieCenterLabel>
        </PieChart>
      </CardContent>
    </Card>
  );
}
