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
  const [copySuccess, setCopySuccess] = useState(false);
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
        setResponseUrls([data['token']]);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData['error']['message']); 
        console.error('Error:', errorData['error']['message']);
      }
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
      {Array.isArray(responseUrls) ? (
        responseUrls.map((url, index) => (
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
        ))
      ) : (
        <Typography>No URLs available</Typography>
      )}
    </div>
  );
};

export default AddTab;
