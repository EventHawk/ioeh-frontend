import React, { useState } from 'react';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import { apiBaseUrl, frontendApiBaseUrl } from '../apiConfig';

const AddTab = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    quoteUrl: '',
    ehKey: '',
    ioKey: '',
  });

  const [responseUrls, setResponseUrls] = useState([]);
  const [copySuccess, setCopySuccess] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading]  = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const apiUrl = frontendApiBaseUrl + '/add-integration';
    try {
      setLoading(true);
      setError(null); 
      console.log(formData);
  
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        const data = response.data;
        setResponseUrls(data.url);
        setError(null);
      } else {
        const errorData = response.data;
        // console.log("Iam error",errorData);
        setError(errorData.error.message);
      }
    } catch (error) { 
      setError(error.response.data.error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = (urlKey) => {
    navigator.clipboard.writeText(responseUrls[urlKey])
      .then(() => {
        // Set copy success status for the specific URL
        setCopySuccess((prevCopySuccess) => ({
          ...prevCopySuccess,
          [urlKey]: true,
        }));
      })
      .catch((err) => {
        setError('Copy to clipboard failed.');
        console.error('Copy failed:', err)
      });
  };


  const getLabel = (key) => {
    // Customize the labels based on the key
    switch (key) {
      case 'ehWebhookLink':
        return 'Event Hawk Webhook Link';
      case 'ioWebhookLink':
        return 'IO Webhook Link';
      // Add more cases as needed
      default:
        return key;
    }
  };

  return (
    <div>
      <Typography variant="h6">Add Business</Typography>
      <TextField
        name="name"
        label="Business Name"
        variant="outlined"
        fullWidth
        value={formData.name}
        onChange={handleInputChange}
        margin="normal"
        disabled={loading}
      />
      <TextField
        name="email"
        label="Business Email"
        variant="outlined"
        fullWidth
        value={formData.email}
        onChange={handleInputChange}
        margin="normal"
        disabled={loading}
      />
      <TextField
        name="quoteUrl"
        label="Website URL"
        variant="outlined"
        fullWidth
        value={formData.quoteUrl}
        onChange={handleInputChange}
        margin="normal"
        disabled={loading}
      />
      <TextField
        name="ehKey"
        label="EH Key"
        variant="outlined"
        fullWidth
        value={formData.ehKey}
        onChange={handleInputChange}
        margin="normal"
        disabled={loading}
      />
      <TextField
        name="ioKey"
        label="IO Key"
        variant="outlined"
        fullWidth
        value={formData.ioKey}
        onChange={handleInputChange}
        margin="normal"
        disabled={loading}
      />
      {/* {error && <Typography color="error">{error}</Typography>} */}
      {/* {error ? <Typography color="error">{error}</Typography> : null} */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {error ? <Typography color="error">{error}</Typography> : null}
        <Button variant="contained" onClick={handleSubmit} fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </Box>
      {responseUrls && (
        Object.entries(responseUrls).map(([key, value]) => (
          <Box key={key} mt={2}>
            <Typography variant="subtitle1">{getLabel(key)}:</Typography>
            <Typography>{value}</Typography>
            <Button
              variant="outlined"
              onClick={() => handleCopyToClipboard(key)}
            >
              Copy URL
            </Button>
            {copySuccess[key] && <Typography>URL Copied!</Typography>}          
          </Box>
        ))
      )}
    </div>
  );
};

export default AddTab;
