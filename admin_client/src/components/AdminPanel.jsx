import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

function AdminPanel() {
  return (
    <div>
      <Typography variant="h3">Admin Panel</Typography>
      <List>
        <ListItem button component={Link} to="/admin/instructors">
          <ListItemText primary="View Instructors" />
        </ListItem>
        <ListItem button component={Link} to="/admin/courses">
          <ListItemText primary="Add Course" />
        </ListItem>
      </List>
    </div>
  );
}

export default AdminPanel;
