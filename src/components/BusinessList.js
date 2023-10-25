import React, { useState, useEffect } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BusinessList = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);

  // Fetch business data from your API
  useEffect(() => {
    axios.get('http://localhost:3000/api/front-end/all-business')
      // .then((response) => response.json())
      .then((response) => {
        console.log(response.data);
        setBusinesses(response.data);
        setFilteredBusinesses(response.data); // Initialize filtered data with all data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleEditClick = (email) => {
    // Navigate to the edit page using React Router
    // history.push(`/edit-business/${businessId}`);
    navigate(`/edit-business?email=${email}`);
  };


  const handleSearch = (e) => {
    const st = e.target.value.toLowerCase().trim(); // Get the input value
    // console.log(st);

    if (st) {
      setSearchTerm(st.toLowerCase()); // Set the lowercase version of the search term
      setCurrentPage(1); // Reset to the first page when searching

      // Filter the data based on the search term
      const filteredData = businesses.filter((business) =>
        business.business_name.toLowerCase().includes(st) ||
        business.business_email.toLowerCase().includes(st)
      );


      // Update the state with the filtered data
      setFilteredBusinesses(filteredData);
    } else {
      // Handle the case when searchTerm is undefined or empty
      // You can clear the filter or show all businesses here
      setSearchTerm(st.toLowerCase()); // Set the lowercase version of the search term
      setCurrentPage(1);
      setFilteredBusinesses(businesses);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBusinesses.slice(indexOfFirstItem, indexOfLastItem);
  // const currentItems = [];

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        margin="normal"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Business Name</TableCell>
              <TableCell>Business Email</TableCell>
              <TableCell>Business Integration Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((business) => (
              <TableRow key={business.id}>
                <TableCell>{business.business_name}</TableCell>
                <TableCell>{business.business_email}</TableCell>
                {/* <TableCell>{business.integration_flag }</TableCell> */}
                <TableCell>
                  {business.integration_flag ? (
                    <Box display="flex" justifyContent="left">
                      <Button
                        variant="contained"
                        color="customGreen"
                        style={{ minWidth: 32, width: 32, height: 32, borderRadius: '50%', marginLeft: '60px' }}
                      >
                        
                      </Button>
                    </Box>
                  ) : (
                    <Box display="flex" justifyContent="left">
                      <Button
                        variant="contained"
                        color="error"
                        style={{ minWidth: 32, width: 32, height: 32, borderRadius: '50%', marginLeft: '60px' }}
                      >
                        
                      </Button>
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(business.business_email)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous Page
        </Button>
        <Button
          disabled={indexOfLastItem >= filteredBusinesses.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default BusinessList;
