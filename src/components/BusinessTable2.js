import React, { useEffect, useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';
import FilterComponent from "./FilterComponent";
import '../styles/BusinessTable.css'

const YourTableComponent = props => {
  // Define your table columns
  const columns = [
    {
      name: 'ID',
      selector: 'id',
      sortable: true,
    },
    {
      name: 'Business Name',
      selector: 'businessName',
      sortable: true,
    },
    {
      name: 'Business Email',
      selector: 'businessEmail',
      sortable: true,
    },
    {
      name: 'Integration Status',
      selector: 'integrationStatus',
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        // <button onClick={() => handleEdit(row)}>Edit</button>
        <i className="first fas fa-pen"></i>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Define a function to handle row clicks
  const handleRowClick = (row) => {
    handleEdit(row);
  };

  // Define a function to handle the edit action
  const handleEdit = (row) => {
    // Implement logic to open the edit page with the selected row data
    console.log('Editing row:', row);
  };

  

  // Dummy data for demonstration purposes
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  // const filteredItems = data.filter(
  //   item => item.name && item.name.includes(filterText)
  // );
  const filteredItems = props.data.filter(
    item =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={e => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  

//   // Fetch data from your API (replace with your actual API call)
//   useEffect(() => {
//     // Example API call using fetch:
//     fetch('YOUR_API_ENDPOINT')
//       .then((response) => response.json())
//       .then((data) => setData(data));
//   }, []);



  return (
    
    <div class="table-container">
      <DataTable
        // title="Integrated Business Information"
        columns={columns}
        data={filteredItems}
        noHeader
        pagination
        paginationPerPage={10}
        onRowClicked={handleRowClick}
        highlightOnHover
        striped
        dense
        paginationRowsPerPageOptions={[10, 20, 30]}
        paginationComponentOptions={{
          rowsPerPageText: 'Rows per page:',
        }}
        subHeader
        subHeaderComponent={subHeaderComponent}
      />
    </div>
  );
};

export default YourTableComponent;
