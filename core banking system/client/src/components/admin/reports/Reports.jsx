import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';

const Reports = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="reports-container">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
        {/* Customizing color of tabs */}
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="reports tabs"
          centered
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#695CFE', // Change the indicator color
            },
            '& .MuiTab-root': {
              color: '#888888', // Color for inactive tabs
            },
            '& .Mui-selected': {
              color: '#5648CC', // Color for active tab
            },
          }}
        >
          <Tab label="Transaction Report" component={Link} to="transaction-report" />
          <Tab label="Late Loan Payment Report" component={Link} to="late-loan-payment-report" />
        </Tabs>
      </Box>
      <Outlet />
    </div>
  );
};

export default Reports;
