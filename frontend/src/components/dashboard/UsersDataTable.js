import React from 'react';
import MUIDataTable from "mui-datatables";
import { Box, Button, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import pro2 from './profileImg/pro1.png';
import pro1 from './profileImg/pro2.png';
import pro3 from './profileImg/pro3.png';
import pro4 from './profileImg/pro4.png';
import pro5 from './profileImg/pro5.png';
import pro6 from './profileImg/pro6.png';

const columns = ["profile", "Name", "Email", "ID", "College", "Major", "Posts", "Actions"];

const data = [
  { 
    profile: <Avatar alt="User Name" src={pro1} sx={{ width: 70, height: 70 }} />, 
    Name: "aisha saleh ", 
    Email: " s12217171@stu.najah.edu", 
    ID: "12217171", 
    College: "College of Engineering and Information Technology",
    Major: "CAP", 
    Posts: 15,
    Actions: 
      <Button
        sx={{ marginBottom: '2%', marginLeft: 0, color: "white", background: "rgb(173, 216, 230)" }}
        variant="outlined"
        component="span"
        startIcon={<DeleteIcon sx={{ color: "black" }} />}
      ></Button>
  },
  { 
    profile: <Avatar alt="User Name" src={pro2} sx={{ width: 70, height: 70 }} />, 
    Name: "dana morgan", 
    Email: " s12258585@stu.najah.edu", 
    ID: "12258585",
    College: "College of Engineering and Information Technology",
    Major: "CAP",
    Posts: 14,
    Actions: 
      <Button
        sx={{ marginBottom: '2%', marginLeft: 0, color: "white", background: "rgb(173, 216, 230)" }}
        variant="outlined"
        component="span"
        startIcon={<DeleteIcon sx={{ color: "black" }} />}
      ></Button>
  },
  { 
    profile: <Avatar alt="User Name" src={pro3} sx={{ width: 70, height: 70 }} />, 
    Name: "tala dwikat", 
    Email: " s122141466@stu.najah.edu", 
    ID: "122141466", 
    College: "College of Engineering and Information Technology",
    Major: "CAP", 
    Posts: 12,
    Actions: 
      <Button
        sx={{ marginBottom: '2%', marginLeft: 0, color: "white", background: "rgb(173, 216, 230)" }}
        variant="outlined"
        component="span"
        startIcon={<DeleteIcon sx={{ color: "black" }} />}
      ></Button>
  },
  { 
    profile: <Avatar alt="User Name" src={pro4} sx={{ width: 70, height: 70 }} />, 
    Name: "abdul-kaream", 
    Email: " s12256564@stu.najah.edu", 
    ID: "12256564", 
    College: "College of Engineering and Information Technology",
    Major: "CAP",
    Posts: 4,
    Actions: 
      <Button
        sx={{ marginBottom: '2%', marginLeft: 0, color: "white", background: "rgb(173, 216, 230)" }}
        variant="outlined"
        component="span"
        startIcon={<DeleteIcon sx={{ color: "black" }} />}
      ></Button>
  },
  { 
    profile: <Avatar alt="User Name" src={pro5} sx={{ width: 70, height: 70 }} />, 
    Name: "momin amrneh", 
    Email: " s1223636@stu.najah.edu", 
    ID: "12236365", 
    College: "College of Engineering and Information Technology",
    Major: "CAP", 
    Posts: 12,
    Actions: 
      <Button
        sx={{ marginBottom: '2%', marginLeft: 0, color: "white", background: "rgb(173, 216, 230)" }}
        variant="outlined"
        component="span"
        startIcon={<DeleteIcon sx={{ color: "black" }} />}
      ></Button>
  },
  { 
    profile: <Avatar alt="User Name" src={pro6} sx={{ width: 70, height: 70 }} />, 
    Name: "adham lahloh", 
    Email: " s122966583@stu.najah.edu", 
    ID: "122966583", 
    College: "College of Engineering and Information Technology",
    Major: "CAP",
    Posts: 0, 
    Actions: 
      <Button
        sx={{ marginBottom: '2%', marginLeft: 0, color: "white", background: "rgb(173, 216, 230)" }}
        variant="outlined"
        component="span"
        startIcon={<DeleteIcon sx={{ color: "black" }} />}
      ></Button>
  }
];

const options = {
  selectableRows: false,
  rowsPerPage: 100,
  rowsPerPageOptions: [25, 50, 75, 100],
};

const UsersDataTable = () => {
  return (
      <Box sx={{   maxWidth: "80%",  marginLeft: "13%", marginTop: "5%", marginRight: "13%", marginBottom: "5%" }}>
        <MUIDataTable
          title={"USERS DATA TABLE"}
          data={data}
          columns={columns}
          options={options}
        />
      </Box>

  );
}

export default UsersDataTable;