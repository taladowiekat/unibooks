import React from 'react';
import MUIDataTable from "mui-datatables"; 
import { Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const columns = [
  "Listing_ID", 
  "User_ID", 
  "Book_Name", 
  "Listing_Type",
  "Notes", 
  "Status",
  "Image",
  "Actions"
];

const data = [
  { 
    Exchange_Book_Name: "xd",
    Listing_ID: 1,
    User_ID: 12217171,
    Book_Name: "dddd",
    Listing_Picture: "eee",
    Listing_Type: "sell",
    Notes: "lalalallalal",
    Status: "done",
    Actions: <>
      <Button
        sx={{ marginBottom: '2%', marginRight: '2%', color: "white", background: "lightgreen" }}
        variant="outlined"
        component="span"
        startIcon={<EditIcon sx={{ color: "black" }} />}
      ></Button>
      <Button
        sx={{ marginBottom: '2%', marginLeft: 0, color: "white", background: "rgb(173, 216, 230)" }}
        variant="outlined"
        component="span"
        startIcon={<DeleteIcon sx={{ color: "black" }} />}
      ></Button>
    </>
  },
  { 
    Listing_ID: 1,
    User_ID: 12217171,
    Book_Name: "dddd",
    Listing_Picture: "eee",
    Listing_Type: "sell",
    Notes: "lalalallalal",
    Status: "done",
    Exchange_Book_Name: "nnnnnnn",
    Actions: <>
      <Button
        sx={{ marginBottom: '2%', marginRight: '2%', color: "white", background: "lightgreen" }}
        variant="outlined"
        component="span"
        startIcon={<EditIcon sx={{ color: "black" }} />}
      ></Button>
      <Button
        sx={{ marginBottom: '2%', marginLeft: 0, color: "white", background: "rgb(173, 216, 230)" }}
        variant="outlined"
        component="span"
        startIcon={<DeleteIcon sx={{ color: "black" }} />}
      ></Button>
    </>
  },
  { 
    Listing_ID: 1,
    User_ID: 12217171,
    Book_Name: "dddd",
    Listing_Picture: "eee",
    Listing_Type: "sell",
    Notes: "lalalallalal",
    Status: "done",
    Exchange_Book_Name: "nnnnnnn",
    Actions: <>
      <Button
        sx={{ marginBottom: '2%', marginRight: '2%', color: "white", background: "lightgreen" }}
        variant="outlined"
        component="span"
        startIcon={<EditIcon sx={{ color: "black" }} />}
      ></Button>
      <Button
        sx={{ marginBottom: '2%', marginLeft: 0, color: "white", background: "rgb(173, 216, 230)" }}
        variant="outlined"
        component="span"
        startIcon={<DeleteIcon sx={{ color: "black" }} />}
      ></Button>
    </>
  },
  { 
    Listing_ID: 1,
    User_ID: 12217171,
    Book_Name: "dddd",
    Listing_Picture: "eee",
    Listing_Type: "sell",
    Notes: "lalalallalal",
    Status: "done",
    Exchange_Book_Name: "nnnnnnn",
    Actions: <>
      <Button
        sx={{ marginBottom: '2%', marginRight: '2%', color: "white", background: "lightgreen" }}
        variant="outlined"
        component="span"
        startIcon={<EditIcon sx={{ color: "black" }} />}
      ></Button>
      <Button
        sx={{ marginBottom: '2%', marginLeft: 0, color: "white", background: "rgb(173, 216, 230)" }}
        variant="outlined"
        component="span"
        startIcon={<DeleteIcon sx={{ color: "black" }} />}
      ></Button>
    </>
  },
  { 
    Listing_ID: 1,
    User_ID: 12217171,
    Book_Name: "dddd",
    Listing_Picture: "eee",
    Listing_Type: "sell",
    Notes: "lalalallalal",
    Status: "done",
    Exchange_Book_Name: "nnnnnnn",
    Actions: <>
      <Button
        sx={{ marginBottom: '2%', marginRight: '2%', color: "white", background: "lightgreen" }}
        variant="outlined"
        component="span"
        startIcon={<EditIcon sx={{ color: "black" }} />}
      ></Button>
      <Button
        sx={{ marginBottom: '2%', marginLeft: 0, color: "white", background: "rgb(173, 216, 230)" }}
        variant="outlined"
        component="span"
        startIcon={<DeleteIcon sx={{ color: "black" }} />}
      ></Button>
    </>
  },
  { 
    Listing_ID: 1,
    User_ID: 12217171,
    Book_Name: "dddd",
    Listing_Picture: "eee",
    Listing_Type: "sell",
    Notes: "lalalallalal",
    Status: "done",
    Exchange_Book_Name: "nnnnnnn",
    Actions: <>
      <Button
        sx={{ marginBottom: '2%', marginRight: '2%', color: "white", background: "lightgreen" }}
        variant="outlined"
        component="span"
        startIcon={<EditIcon sx={{ color: "black" }} />}
      ></Button>
      <Button
        sx={{ marginBottom: '2%', marginLeft: 0, color: "white", background: "rgb(173, 216, 230)" }}
        variant="outlined"
        component="span"
        startIcon={<DeleteIcon sx={{ color: "black" }} />}
      ></Button>
    </>
  },
  { 
    Listing_ID: 1,
    User_ID: 12217171,
    Book_Name: "dddd",
    Listing_Picture: "eee",
    Listing_Type: "sell",
    Notes: "lalalallalal",
    Status: "done",
    Exchange_Book_Name: "nnnnnnn",
    Actions: <>
      <Button
        sx={{ marginBottom: '2%', marginRight: '2%', color: "white", background: "lightgreen" }}
        variant="outlined"
        component="span"
        startIcon={<EditIcon sx={{ color: "black" }} />}
      ></Button>
      <Button
        sx={{ marginBottom: '2%', marginLeft: 0, color: "white", background: "rgb(173, 216, 230)" }}
        variant="outlined"
        component="span"
        startIcon={<DeleteIcon sx={{ color: "black" }} />}
      ></Button>
    </>
  }
];

const options = {
  selectableRows: false,
  rowsPerPage: 100,
  rowsPerPageOptions: [25, 50, 75, 100],
};

const PostsDataTable = () => {
  return (

      <Box  sx={{   maxWidth: "80%",  marginLeft: "13%", marginTop: "5%", marginRight: "13%", marginBottom: "5%" }}>
        <MUIDataTable
        
          title={"Listing DATA TABLE"}
          data={data}
          columns={columns}
          options={options}
        />
      </Box>
  );
}

export default PostsDataTable;