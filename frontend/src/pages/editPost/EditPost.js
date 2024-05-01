import { Box, Button, Card, CardContent, CardHeader, CardMedia, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Avatar,} from '@mui/material';
import userImage from './Avatar.png';
import bookImage from './Frame_129.png';
import EditIcon from '@mui/icons-material/Edit';
import { editPostValidationSchema } from '../../components/validation/validation';
import { useFormik } from 'formik';
import InputsComponent from '../../components/shared/postInfo';

const EditPost = () => {
    const initialValues = {
        bookName: '',
        notes: '',
        listingType: 'sell',
        exchangeBookName: '',
        status: 'Done' 
    };

    const onSubmit = (values, { resetForm }) => {
        resetForm();
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: editPostValidationSchema,
    });

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
                <form
                    id="form"
                    className="flex flex-col"
                    onSubmit={formik.handleSubmit}
                >
                    <CardMedia
                        component="img"
                        image={bookImage}
                        alt="Book Cover"
                        sx={{ minHeight: '20vh', maxWidth: '90%', marginLeft: '5%' }}
                    />
                   <CardContent>
    <Box display="flex" flexDirection="column">
     <InputsComponent formik={formik}/>

        <FormControl sx={{ marginTop: 2 }}>
            <FormLabel>Status</FormLabel>
            <RadioGroup row name="status" value={formik.values.status} onChange={formik.handleChange}>
                <FormControlLabel value="Done" control={<Radio />} label="Done" />
                <FormControlLabel value="Not yet" control={<Radio />} label="Not yet" />
            </RadioGroup>
        </FormControl>
    </Box>

    <Box mt={2} display="flex" justifyContent="flex-end">
        <Button type="submit" variant="contained" color="primary" disabled={!formik.isValid || formik.isSubmitting}>Post</Button>
        <Button type="button" variant="contained" color="error" style={{ marginLeft: 10 }} onClick={formik.handleReset}>Cancel</Button>
    </Box>
                   </CardContent>

                </form>
            </Card>
        </Box>
    );
};

export default EditPost;
