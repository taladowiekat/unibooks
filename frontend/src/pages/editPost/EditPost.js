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
    Avatar,
} from '@mui/material';
import userImage from './Avatar.png';
import bookImage from './Frame_129.png';
import EditIcon from '@mui/icons-material/Edit';
const EditPost = () => {
    const [operation, setOperation] = useState('Sell');
    const [status, setstatus] = useState('Done');
    const handleRadioChange = (event) => {
        setOperation(event.target.value);
    };
    const handleStatusChange = (event) => {
        setstatus(event.target.value);
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
                        placeholder='Book Name'
                        sx={{
                            fontSize: 'large', width: '90%', marginLeft: " 4%",
                            marginTop: "3%"
                        }}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Notes"
                        variant="outlined"
                        defaultValue="blablablablablabla"
                        placeholder='Notes'
                        multiline
                        rows={4}
                        sx={{
                            fontSize: 'large', marginBottom: '20px', width: '80%', marginLeft: " 4%", marginTop: "4%", width: "90%",
                        }}
                    />
                    <FormControl component="fieldset" margin="normal" fullWidth sx={{ marginLeft: "7%" }}>


                        <FormLabel>Edit the operation</FormLabel>
                        <RadioGroup row aria-label="operation" name="operation" value={operation} onChange={handleRadioChange}>
                            <FormControlLabel value="Sell" control={<Radio />} label="Sell" />
                            <FormControlLabel value="Donate" control={<Radio />} label="Donate" />
                            <FormControlLabel value="Exchange" control={<Radio />} label="Exchange" />

                        </RadioGroup>
                    </FormControl>
                    {operation === 'Exchange' && (
                        <TextField
                            margin="normal"
                            id="preferred-books"
                            name="preferredBooks"
                            label="Book Name"
                            variant="outlined"
                            defaultValue="What kind of books would you like to exchange with?"
                            placeholder="What kind of books would you like to exchange with?"
                            sx={{ width: "90%", marginLeft: "5%" }}
                        />
                    )}

                  
                        <FormControl sx={{ marginLeft: "7%" }}>
                            <FormLabel >
                                Status
                            </FormLabel>
                            <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" value={status} onChange={handleStatusChange} defaultValue="female" name="radio-buttons-group">
                                <FormControlLabel value="Done" control={<Radio />} label="Done" />
                                <FormControlLabel value="Not yet" control={<Radio />} label="Not yet" />
                            </RadioGroup>
                        </FormControl>
                  
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button type="submit" variant="contained" color="primary">Post</Button>
                        <Button type="button" variant="contained" color="error" style={{ marginLeft: 10 }}>Cancel</Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default EditPost;
