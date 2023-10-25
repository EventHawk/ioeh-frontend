import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button, Typography, useTheme, Box, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


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
    integrationFlag: '',
    updatedAt: '',
    ehWebhookLink: '',
    ioWebhookLink: '',
  });
  const [ehMessage, setEHMessage] = useState('');
  const [ioMessage, setIOMessage] = useState('');
  const [integrationStatusMessage, setIntegrationstatusMessage] = useState('');
  const [loadingIOKey, setLoadingIOKey] = useState(false);
  const [loadingEHKey, setLoadingEHKey] = useState(false);
  const [loadingIntegrationStatus, setLoadingIntegrationstatus] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/front-end/get-integration?email=${email}`);
        const data = response.data;
        setBusinessData({
          id: data.id,
          businessName: data.businessName,
          businessEmail: data.businessEmail,
          ehKey: data.ehKey,
          ioKey: data.ioKey,
          integrationFlag: data.integrationFlag,
          updatedAt: data.updatedAt,
          ehWebhookLink: data.url.ehWebhookLink,
          ioWebhookLink: data.url.ioWebhookLink,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusinessData({
      ...businessData,
      [name]: value,
    });
  };


  const handleUpdateEHKey = async () => {
    try {
        setLoadingEHKey(true);
        setEHMessage(false);
        const response = await axios.post('http://localhost:3000/api/front-end/update-eh-api-key', {
        id: businessData.id, // Replace with actual business ID
        key: businessData.ehKey,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        setEHMessage('EH Key updated successfully');
      } else {
        setEHMessage('Error updating EH Key');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
        setLoadingEHKey(false);
    }
  };
  
  const handleUpdateIOKey = async () => {
    try {
        setLoadingIOKey(true);
        setIOMessage(false);
        const response = await axios.post('http://localhost:3000/api/front-end/update-io-api-key', {
        id: businessData.id, // Replace with actual business ID
        key: businessData.ioKey,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        setIOMessage('IO Key updated successfully');
      } else {
        setIOMessage('Error updating IO Key');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
        setLoadingIOKey(false); // Reset loading state after the request is complete
    }
  };

  const handleIntegrationStatusChange = (event) => {
    setBusinessData({
      ...businessData,
      integrationFlag: event.target.value,
    });
  };

  const handleUpdateIntegrationStatus = async () => {
    try {
      setLoadingIntegrationstatus(true);
      setIntegrationstatusMessage(false);
      const response = await axios.post('http://localhost:3000/api/front-end/update-integration-status', {
        id: businessData.id,
        status: businessData.integrationFlag,
      },{
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setIntegrationstatusMessage('Integration status updated successfully');
      } else {
        setIntegrationstatusMessage('Error updating Integration status');
      }
    } catch (error) {
      console.error('Error:',error);
    } finally {
      setLoadingIntegrationstatus(false);
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
        disabled={loadingEHKey}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {ehMessage && (
            <Typography variant="caption" sx={{ color: ehMessage.startsWith('Error') ? 'red' : 'green' }}>
                {ehMessage}
            </Typography>
        )}
        <Button 
            variant="contained" 
            onClick={handleUpdateEHKey} 
            fullWidth
            disabled={loadingEHKey} // Disable the button when loadingEHKey is true
        >
            {loadingEHKey ? 'Updating...' : 'Update EH Key'} {/* Show "Updating..." while loadingEHKey is true */}
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
        disabled={loadingIOKey}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {ioMessage && (
            <Typography variant="caption" sx={{ color: ioMessage.startsWith('Error') ? 'red' : 'green' }}>
                {ioMessage}
            </Typography>
        )}
        <Button 
            variant="contained" 
            onClick={handleUpdateIOKey} 
            fullWidth
            disabled={loadingIOKey} // Disable the button when loadingIOKey is true
        >
          {loadingIOKey ? 'Updating...' : 'Update IO Key'} {/* Show "Updating..." while loadingIOKey is true */}
        </Button>
      </Box>
      {/* <TextField
        name="integrationStatus"
        label="integration status"
        variant="outlined"
        fullWidth
        value={businessData.integrationFlag ? 'On' : 'Off'}
        onChange={handleInputChange}
        margin="normal"
        disabled={loadingIntegrationStatus}
      /> */}
      <RadioGroup
        name="integrationStatus"
        value={businessData.integrationFlag.toString()}
        onChange={handleIntegrationStatusChange}
      >
        <FormControlLabel
          value="true"
          control={<Radio />}
          label="On"
        />
        <FormControlLabel
          value="false"
          control={<Radio />}
          label="Off"
        />
      </RadioGroup>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {integrationStatusMessage && (
            <Typography variant="caption" sx={{ color: ioMessage.startsWith('Error') ? 'red' : 'green' }}>
                {integrationStatusMessage}
            </Typography>
        )}
        <Button 
            variant="contained" 
            onClick={handleUpdateIntegrationStatus} 
            fullWidth
            disabled={loadingIntegrationStatus} // Disable the button when loadingIOKey is true
        >
          {loadingIOKey ? 'Updating...' : 'Update Integration Status'} {/* Show "Updating..." while loadingIOKey is true */}
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
