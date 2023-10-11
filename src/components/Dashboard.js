import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, Box, useTheme } from '@mui/material';
import ViewTab from './ViewTab'; // Import the ViewTab component
import AddTab from './AddTab';   // Import the AddTab component

const TabbedPaper = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('view');
  const [addedText, setAddedText] = useState([]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddText = (text) => {
    setAddedText([...addedText, text]);
  };

  return (
    <Paper elevation={3} sx={{ width: 1100, margin: 'auto', padding: 2 }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant={activeTab === 'view' ? 'contained' : 'outlined'}
          style={{ margin: theme.margins.margin1x }}
          onClick={() => handleTabClick('view')}
        >
          View
        </Button>
        <Button
          variant={activeTab === 'add' ? 'contained' : 'outlined'}
          style={{ margin: theme.margins.margin1x }}
          onClick={() => handleTabClick('add')}
        >
          Add
        </Button>
      </div>
      <Box p={2}>
        {activeTab === 'view' && (
          <ViewTab addedText={addedText} />
        )}
        {activeTab === 'add' && (
           <AddTab onAddText={handleAddText} />
        )}
      </Box>
    </Paper>
  );
};

export default TabbedPaper;
