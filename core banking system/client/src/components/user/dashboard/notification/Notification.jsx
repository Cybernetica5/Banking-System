import * as React from 'react';
import { useState } from 'react';
import { Popover, IconButton, Badge, List, ListItem, ListItemText } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBell} from '@fortawesome/free-solid-svg-icons'
import './Notification.css';

// TODO: Implement Notification updates

export default function NotificationBell() {
  const [anchorEl, setAnchorEl] = useState(null);
  // temporary notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New transaction added to your account.' },
    { id: 2, message: 'Your account balance has been updated.' },
    { id: 3, message: 'Loan approval is pending.' }
  ]);
  const [unreadCount, setUnreadCount] = useState(notifications.length);

  // Open popover when the bell icon is clicked
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setUnreadCount(0); // Reset unread count when notifications are viewed
  };

  // Close popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Check if popover is open
  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton className='notification-button' color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
            <FontAwesomeIcon icon={faBell}  className='icon'/>
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List sx={{ width: 300 }}>
          {notifications.length === 0 ? (
            <ListItem>
              <ListItemText primary="No new notifications" />
            </ListItem>
          ) : (
            notifications.map((notification) => (
              <ListItem key={notification.id}>
                <ListItemText primary={notification.message} />
              </ListItem>
            ))
          )}
        </List>
      </Popover>
    </>
  );
}
