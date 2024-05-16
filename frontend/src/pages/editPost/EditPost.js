import { Box, Button, Card, CardContent, CardHeader, CardMedia, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Avatar,} from '@mui/material';
import userImage from './Avatar.png';
import bookImage from './Frame_129.png';
import EditIcon from '@mui/icons-material/Edit';
import { useValidations } from '../../components/validation/validation';
import { useFormik } from 'formik';
import InputsComponent from '../../components/shared/PostInfo.js';
import { useTranslation } from 'react-i18next';
const EditPost = () => {
    const {editPostValidationSchema}=useValidations();
    const {t}=useTranslation();
    const initialValues = {
        bookName: '',
        notes: '',
        listingType: 'sell',
        exchangeBookName: '',
        status: 'Done' ,
        selectedFile: null
    };

    const onSubmit = (values, { resetForm }) => {
        resetForm();
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: editPostValidationSchema,
    });
    const handleUploadClick = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                formik.setFieldValue('selectedFile', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Card id="EditPostFormBoxCardId" sx={{ maxWidth: 600, width: '100%', m: 2 }}>
                <CardHeader
                    avatar={<Avatar alt="User Name" src={userImage} sx={{ width: 70, height: 70 }} />}
                    title= {t("userName")}
                    titleTypographyProps={{ variant: 'h6' }}
                />
              <Box mt={2} display="flex" justifyContent="flex-end">
              <input
                        accept="image/*"
                        id="editImge"
                        multiple
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleUploadClick}
                    />

                    <label htmlFor="editImge">
                        <Button
                            sx={{ marginBottom: '2%' }}
                            variant="outlined"
                            component="span"
                            startIcon={<EditIcon />}
                        >
                               {t("editImage")}
                        </Button>
                    </label>
                </Box>
                <CardMedia
                   component="img"
                   src={formik.values.selectedFile || bookImage}
                   sx={{ minHeight: '20vh', maxWidth: '90%', marginLeft: '5%' }}
                />

                <form
                    id="form"
                    className="flex flex-col"
                    onSubmit={formik.handleSubmit}
                >
                
                   <CardContent>
    <Box display="flex" flexDirection="column">
     <InputsComponent formik={formik}/>

        <FormControl sx={{ marginTop: 2 }}>
            <FormLabel>{t("status")}</FormLabel>
            <RadioGroup row name="status" value={formik.values.status} onChange={formik.handleChange}>
                <FormControlLabel value="Done" control={<Radio />} label={t("done")} />
                <FormControlLabel value="Not yet" control={<Radio />} label={t("notYet")} />
            </RadioGroup>
        </FormControl>
    </Box>

    <Box mt={2} display="flex" justifyContent="flex-end">
        <Button type="submit" variant="contained" color="primary" disabled={!formik.isValid || formik.isSubmitting}>{t("postbutton")}</Button>
        <Button type="button" variant="contained" color="error" style={{ marginLeft: 10 }} onClick={formik.handleReset}>{t("cancelbutton")}</Button>
    </Box>
                   </CardContent>

                </form>
            </Card>
        </Box>
    );
};

export default EditPost;
