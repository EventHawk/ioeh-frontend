import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const AddTab = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ehKey: '',
    ioKey: '',
  });

  const [responseUrls, setResponseUrls] = useState([]);
  const [copySuccess, setCopySuccess] = useState({});
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Make a POST request to your API with formData
      console.log(formData)
      const response = await fetch('http://localhost:3000/api/front-end/add-integration', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setResponseUrls(data.url);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData['error']['message']);
      }
    } catch (error) {
      setError(error);
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
      .catch((err) => console.error('Copy failed:', err));
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
      />
      <TextField
        name="email"
        label="Business Email"
        variant="outlined"
        fullWidth
        value={formData.email}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        name="ehKey"
        label="EH Key"
        variant="outlined"
        fullWidth
        value={formData.ehKey}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        name="ioKey"
        label="IO Key"
        variant="outlined"
        fullWidth
        value={formData.ioKey}
        onChange={handleInputChange}
        margin="normal"
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" onClick={handleSubmit} fullWidth>
        Submit
      </Button>
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
