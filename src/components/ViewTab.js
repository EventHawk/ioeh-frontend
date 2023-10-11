// ViewTab.js
import React from 'react';
import { Typography } from '@mui/material';
import BusinessList from './BusinessList';

const ViewTab = ({ addedText }) => {
  return (
    <div>
      <BusinessList />
    </div>
  );
};

export default ViewTab;
