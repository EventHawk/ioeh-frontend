// BusinessList.js
import React, { useState, useEffect } from 'react';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; 

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // const history = useHistory();

  const handleEditClick = (businessId) => {
    // Navigate to the edit page using React Router
    // history.push(`/edit-business/${businessId}`);
  };

  // Fetch business data from your API
  useEffect(() => {
    // Implement your API fetch logic here
    // Update the 'businesses' state with the fetched data
  }, []);

  const filteredBusinesses = businesses.filter((business) =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBusinesses.slice(indexOfFirstItem, indexOfLastItem);

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
              <TableCell>Action</TableCell> {/* New column for Action */}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems.map((business) => (
              <TableRow key={business.id}>
                <TableCell>{business.name}</TableCell>
                <TableCell>{business.email}</TableCell>
                <TableCell>{business.integrationStatus}</TableCell> {/* New column for Integration Status */}
                <TableCell>
                  <IconButton
                    onClick={() => handleEditClick(business.id)} // Handle edit click to navigate to another page
                  >
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
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous Page
        </Button>
        <Button
          disabled={indexOfLastItem >= filteredBusinesses.length}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default BusinessList;
