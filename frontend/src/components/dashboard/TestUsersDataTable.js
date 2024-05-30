import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Button } from '@mui/material/';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TestUsersDataTable = () => {
    const [users, setUsers] = useState(null);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/user/getAllUsers');
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);

    return (!users ? <div>Data did not load yet </div> :
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell color='green' align="center"> action </TableCell>
                        <TableCell color='green' align="center"> profilePicture </TableCell>
                        <TableCell color='green' align="center"> _id </TableCell>
                        <TableCell color='green' align="center"> studentID </TableCell>
                        <TableCell color='green' align="center"> firstname </TableCell>
                        <TableCell color='green' align="center"> lastname </TableCell>
                        <TableCell color='green' align="center"> email </TableCell>
                        <TableCell color='green' align="center"> password </TableCell>
                        <TableCell color='green' align="center"> college </TableCell>
                        <TableCell color='green' align="center"> gender </TableCell>
                        <TableCell color='green' align="center"> role </TableCell>
                        <TableCell color='green' align="center"> createdAt </TableCell>
                        <TableCell color='green' align="center"> updatedAt </TableCell>
                        <TableCell color='green' align="center"> __v </TableCell>
                        <TableCell color='green' align="center"> sendCode </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user.studentID}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center" >
                                <Button
                                    sx={{ marginBottom: '2%', marginLeft: 0, color: "white", background: "rgb(173, 216, 230)" }}
                                    variant="outlined"
                                    component="span"
                                    startIcon={<DeleteIcon sx={{ color: "black" }} />}
                                ></Button>
                            </TableCell>
                            <TableCell align="center">
                                <Avatar alt="User Name" src={user.profilePicture} sx={{ width: 70, height: 70 }} />
                            </TableCell>
                            <TableCell align="center">{user._id}</TableCell>
                            <TableCell align="center">{user.studentID}</TableCell>
                            <TableCell align="center">{user.firstName}</TableCell>
                            <TableCell align="center">{user.lastName}</TableCell>
                            <TableCell align="center">{user.email}</TableCell>
                            <TableCell align="center">{user.password}</TableCell>
                            <TableCell align="center">{user.college}</TableCell>
                            <TableCell align="center">{user.gender}</TableCell>
                            <TableCell align="center">{user.role}</TableCell>
                            <TableCell align="center">{user.createdAt}</TableCell>
                            <TableCell align="center">{user.updatedAt}</TableCell>
                            <TableCell align="center">{user.__v}</TableCell>
                            <TableCell align="center">{user.sendCode}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TestUsersDataTable;
