import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Avatar, Typography, Button, Box, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router-dom';
function PostCard({ userAvatar, userName, bookName, bookType, image, typeoperation ,onDelete}) {
    const [anchorEl, setAnchorEl] = useState(null);
 
    const open = Boolean(anchorEl);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    const handleClose = () => {
      setAnchorEl(null);
    };
 
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: '1rem', flexDirection: 'column' }}>
            <Card sx={{ maxWidth: 360, borderRadius: '16px', boxShadow: 3 }}>
            <Button
                    sx={{ marginLeft: "80%" }}
                    id="basic-button"
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                >
                    {<MoreVertIcon />}
                </Button>
                <Menu
                      sx={{ marginLeft:"2%" }}
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                          <MenuItem onClick={handleClose}  component={Link} to='EditPost'>   {
                            <Button sx={{ color: "black" }}>
                          {<EditIcon  sx={{ color: "black", marginRight:"22%"}} />}
                          Edit
                            </Button>
                        }</MenuItem>
                    <MenuItem     onClick={handleClose}
>
                        {
                            <Button sx={{ color: "black" }}>
                          {<DeleteIcon sx={{ color: "black", marginRight:"20%" }}/>}
                          delete
                            </Button>
                        }
                    </MenuItem>
                </Menu>
                <CardMedia
                    component="img"
                    sx={{
                        height: 180,
                        objectFit: 'cover',
                    }}
                    image={image}
                    alt={bookName}
                />
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                            src={userAvatar}
                            alt={userName}
                            sx={{ width: 50, height: 50 }}
                        />
                        <Typography variant="subtitle1" component="div">
                            {userName}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        {bookName} / {bookType}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <IconButton color="primary" sx={{ mr: 1 }}>
                            <ChatIcon />
                        </IconButton>
                        <Button variant="contained" sx={{ backgroundColor: 'black' }}>
                            {typeoperation}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
export default PostCard;