// AddTab.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const AddTab = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessEmail: '',
    ehKey: '',
    ioKey: '',
  });

  const dummyResponseUrls = [
    'https://example.com/url1',
    'https://example.com/url2',
  ];

  const [responseUrls, setResponseUrls] = useState([]);
  const [copySuccess, setCopySuccess] = useState(false);

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
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setResponseUrls(data.urls);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCopyToClipboard = (url) => {
    navigator.clipboard.writeText(url)
      .then(() => setCopySuccess(true))
      .catch((err) => console.error('Copy failed:', err));
  };

  return (
    <div>
      <Typography variant="h6">Add Business</Typography>
      <TextField
        name="businessName"
        label="Business Name"
        variant="outlined"
        fullWidth
        value={formData.businessName}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        name="businessEmail"
        label="Business Email"
        variant="outlined"
        fullWidth
        value={formData.businessEmail}
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
      <Button variant="contained" onClick={handleSubmit} fullWidth>
        Submit
      </Button>
      {/* {responseUrls.map((url, index) => ( */}
      {dummyResponseUrls.map((url, index) => (
        <Box key={index} mt={2}>
          <Typography variant="subtitle1">URL {index + 1}:</Typography>
          <Typography>{url}</Typography>
          <Button
            variant="outlined"
            onClick={() => handleCopyToClipboard(url)}
          >
            Copy URL
          </Button>
          {copySuccess && <Typography>URL Copied!</Typography>}
        </Box>
      ))}
    </div>
  );
};

export default AddTab;
