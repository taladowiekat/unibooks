import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    Radio,
    RadioGroup,
    TextField,
    Typography,
    Avatar,
} from '@mui/material';
import userImage from './Avatar.png';
import bookImage from './Frame_129.png';
import EditIcon from '@mui/icons-material/Edit';
import './EditPost.css';

const EditPost = () => {
    const [operation, setOperation] = useState('null');

    const handleRadioChange = (event) => {
        setOperation(event.target.value);
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Card id="EditPostFormBoxCardId" sx={{ maxWidth: 600, width: '100%', m: 2 }}>
                <CardHeader
                    avatar={<Avatar alt="User Name" src={userImage} sx={{ width: 70, height: 70 }} />}
                    title="User Name"
                    titleTypographyProps={{ variant: 'h6' }}
                />
                <IconButton aria-label="settings" sx={{ marginLeft: '90%', marginTop: 0 }}>
                    <EditIcon src={userImage} />
                </IconButton>
                <CardMedia
                    component="img"
                    image={bookImage}
                    alt="Book Cover"
                    sx={{ minHeight: '20vh', maxWidth: '90%', marginLeft: '5%' }}
                />
                <CardContent>
                        <TextField
                            id="outlined-basic"
                            label="Book Name"
                            variant="outlined"
                            defaultValue="Book Name"
                            sx={{ fontSize: 'large', width: '80%',marginLeft:" 4%",
                            marginTop: "3%"
                             }}
                        />
                        
                        <TextField
                            id="outlined-basic"
                            label="Notes"
                            variant="outlined"
                            defaultValue="blablablablablabla"
                            sx={{ fontSize: 'large', marginBottom: '20px', width: '80%',marginLeft:" 4%",   marginTop: "4%" }}
                        />
                        <FormControl component="fieldset" margin="normal" fullWidth sx={{marginLeft: "10%"}}>


                            <FormLabel sx={{ color: 'blue' }} component="legend">
                                Edit the operation
                            </FormLabel>
                            <RadioGroup row aria-label="operation" name="operation" value={operation} onChange={handleRadioChange}>
                                <FormControlLabel value="exchange" control={<Radio />} label="Exchange" />
                                <FormControlLabel value="donate" control={<Radio />} label="Donate" />
                                <FormControlLabel value="sell" control={<Radio />} label="Sell" />
                            </RadioGroup>
                        </FormControl>
                        {operation === 'exchange' && (
                            <TextField
                                margin="normal"
                                fullWidth
                                id="preferred-books"
                                name="preferredBooks"
                                label="Book Name"
                                variant="outlined"
                                defaultValue="What kind of books would you like to exchange with?"
                            />
                        )}
                   
                    <div id="EditPostFormInterfaceStatus">
                        <FormControl sx={{ marginLeft: "10%"}}>
                            <FormLabel id="demo-radio-buttons-group-label" sx={{ color: 'blue' }}>
                                Status
                            </FormLabel>
                            <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                                <FormControlLabel value="Done" control={<Radio />} label="Done" />
                                <FormControlLabel value="Not yet" control={<Radio />} label="Not yet" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div id="EditPostFormContaner">
                        <Button
                            variant="contained"
                            sx={{
                                marginRight: '10px',
                                color: 'black',
                                backgroundColor: 'rgba(211, 47, 47, 1)',
                                border: '5px',
                                paddingTop: '10px',
                                paddingBottom: '10px',
                                fontSize: 'larger',
                                marginLeft: '400px',
                                paddingLeft: '50px',
                                paddingRight: '40px',
                            }}
                        >
                            cancel
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                marginRight: '10px',
                                color: 'black',
                                backgroundColor: 'rgba(77, 168, 204, 1)',
                                border: '5px',
                                paddingTop: '10px',
                                paddingBottom: '10px',
                                paddingLeft: '30px',
                                paddingRight: '30px',
                                fontSize: 'larger',
                                width: '20%',
                            }}
                        >
                            save
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Box>
    );
};

export default EditPost;