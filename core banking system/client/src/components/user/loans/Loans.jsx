import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Tabs, Tab, Box } from '@mui/material';

const Loans = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="loans-container">
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange} aria-label="loan tabs">
          <Tab label="Apply Loan" component={Link} to="apply" />
          <Tab label="Loan Payment" component={Link} to="payment" />
          <Tab label="Loan Details" component={Link} to="details" />
        </Tabs>
      </Box>
      <Outlet />
    </div>
  );
};

export default Loans;