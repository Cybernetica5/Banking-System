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
          aria-label="employee tabs"
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
          
          <Tab label="Add New Employee" component={Link} to="add-employee" />
          <Tab label="Remove Employee" component={Link} to="remove-employee" />
          <Tab label="Update Staff Details" component={Link} to="update-staff-detail" />
          <Tab label="Update User Details" component={Link} to="update-staff-user-detail" />
          <Tab label="Update Branch Details" component={Link} to="update-staff-branch-detail" />
        </Tabs>
      </Box>
      <Outlet />
    </div>
  );
};

export default Reports;
