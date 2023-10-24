import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button, Typography, useTheme, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const EditBusiness = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get('email');
  const [businessData, setBusinessData] = useState({
    id: '',
    businessName: '',
    businessEmail: '',
    ehKey: '',
    ioKey: '',
    updatedAt: '',
    ehWebhookLink: '',
    ioWebhookLink: '',
  });
  const [ehMessage, setEHMessage] = useState('');
  const [ioMessage, setIOMessage] = useState('');

  useEffect(() => {
    // Make a GET request to fetch business data based on the email
    fetch(`http://localhost:3000/api/front-end/get-integration?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        setBusinessData({
          id: data.id,  
          businessName: data.businessName,
          businessEmail: data.businessEmail,
          ehKey: data.ehKey,
          ioKey: data.ioKey,
          updatedAt: data.updatedAt,
          ehWebhookLink: data.url.ehWebhookLink,
          ioWebhookLink: data.url.ioWebhookLink,
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusinessData({
      ...businessData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      // Make a PUT request to update the business data using the API
      // Use businessData to send the updated fields
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateEHKey = async () => {
    try {
      // Make a PUT request to update the EH Key using the API
      const response = await fetch('http://localhost:3000/api/front-end/update-eh-api-key', {
        method: 'POST',
        body: JSON.stringify({
          id: businessData.id, // Replace with actual business ID
          key: businessData.ehKey,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setEHMessage('EH Key updated successfully');
      } else {
        setEHMessage('Error updating EH Key');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateIOKey = async () => {
    try {
      // Make a PUT request to update the IO Key using the API
      const response = await fetch('http://localhost:3000/api/front-end/update-io-api-key', {
        method: 'POST',
        body: JSON.stringify({
          id: businessData.id, // Replace with actual business ID
          key: businessData.ioKey,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIOMessage('IO Key updated successfully');
      } else {
        setIOMessage('Error updating IO Key');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ width: 1100, margin: 'auto', padding: 2 }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Typography variant="h6">Edit Business</Typography>
      </div>
      <TextField
        name="businessName"
        label="Business Name"
        variant="outlined"
        fullWidth
        value={businessData.businessName}
        margin="normal"
        disabled
      />
      <TextField
        name="businessEmail"
        label="Business Email"
        variant="outlined"
        fullWidth
        value={businessData.businessEmail}
        margin="normal"
        disabled
      />
      <TextField
        name="ehKey"
        label="EH Key"
        variant="outlined"
        fullWidth
        value={businessData.ehKey}
        onChange={handleInputChange}
        margin="normal"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {ehMessage && (
            <Typography variant="caption" sx={{ color: ehMessage.startsWith('Error') ? 'red' : 'green' }}>
                {ehMessage}
            </Typography>
        )}
        <Button variant="contained" onClick={handleUpdateEHKey} fullWidth>
          Update EH Key
        </Button>
      </Box>
      <TextField
        name="ioKey"
        label="IO Key"
        variant="outlined"
        fullWidth
        value={businessData.ioKey}
        onChange={handleInputChange}
        margin="normal"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {ioMessage && (
            <Typography variant="caption" sx={{ color: ioMessage.startsWith('Error') ? 'red' : 'green' }}>
                {ioMessage}
            </Typography>
        )}
        <Button variant="contained" onClick={handleUpdateIOKey} fullWidth>
          Update IO Key
        </Button>
      </Box>
      <TextField
        name="updatedAt"
        label="Updated At"
        variant="outlined"
        fullWidth
        value={businessData.updatedAt}
        margin="normal"
        disabled
      />
      <TextField
        name="ehWebhookLink"
        label="EH Webhook Link"
        variant="outlined"
        fullWidth
        value={businessData.ehWebhookLink}
        onChange={handleInputChange}
        margin="normal"
        disabled
      />
      <TextField
        name="ioWebhookLink"
        label="IO Webhook Link"
        variant="outlined"
        fullWidth
        value={businessData.ioWebhookLink}
        onChange={handleInputChange}
        margin="normal"
        disabled
      />
      
    {/* </div> */}
    </Paper>
  );
};

export default EditBusiness;
