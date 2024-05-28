import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Button } from '@mui/material/';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TestPostsDataTable = () => {
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/post/getAllPosts');
                setPosts(response.data);
                console.log(posts)
            } catch (error) {
                console.error(error);
            }
        };
        fetchPosts();
    }, []);

    return (!posts ? <div>Data did not load yet </div> :
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell color='green' align="center"> action </TableCell>
                        <TableCell color='green' align="center"> _id </TableCell>
                        <TableCell color='green' align="center"> studentID </TableCell>
                        <TableCell color='green' align="center"> bookName </TableCell>
                        <TableCell color='green' align="center"> notes </TableCell>
                        <TableCell color='green' align="center"> mainImage </TableCell>
                        <TableCell color='green' align="center"> postType </TableCell>
                        <TableCell color='green' align="center"> exchangeBookName </TableCell>
                        <TableCell color='green' align="center"> status </TableCell>
                        <TableCell color='green' align="center"> slug </TableCell>
                        <TableCell color='green' align="center"> createdAt </TableCell>
                        <TableCell color='green' align="center"> updatedAt </TableCell>
                        <TableCell color='green' align="center"> __v </TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {posts.map((post) => (
                        <TableRow
                            key={post._id}
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
                            <TableCell align="center">{post._id}</TableCell>
                            <TableCell align="center">{post.studentID}</TableCell>
                            <TableCell align="center">{post.bookName}</TableCell>
                            <TableCell align="center">{post.notes}</TableCell>
                            <TableCell align="center">
                                <Avatar alt="User Name" src={post.mainImage} sx={{ width: 70, height: 70 }} />
                            </TableCell>
                            <TableCell align="center">{post.postType}</TableCell>
                            <TableCell align="center">{post.exchangeBookName}</TableCell>
                            <TableCell align="center">{post.status}</TableCell>
                            <TableCell align="center">{post.slug}</TableCell>
                            <TableCell align="center">{post.createdAt}</TableCell>
                            <TableCell align="center">{post.updatedAt}</TableCell>
                            <TableCell align="center">{post.__v}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TestPostsDataTable;
