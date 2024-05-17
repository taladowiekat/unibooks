import { Box, Button, Card, CardContent, CardHeader, CardMedia, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Avatar, } from '@mui/material';
import userImage from './Avatar.png';
import bookImage from './Frame_129.png';
import EditIcon from '@mui/icons-material/Edit';
import { useValidations } from '../../components/validation/validation';
import { Formik, Form} from 'formik';
import InputsComponent from '../../components/shared/PostInfo.js';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const EditPost = () => {
    const { editPostValidationSchema } = useValidations();
    const { t } = useTranslation();
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const initialValues = {
        bookName: '',
        notes: '',
        listingType: 'sell',
        exchangeBookName: '',
        status: 'Done',
        selectedFile: null
    };

    useEffect(() => {
        if (!image) {
            setPreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(image);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [image]);

    const handleUploadClick = (e, setFieldValue) => {
        const file = e.currentTarget.files[0];
        setImage(file);
        setFieldValue('selectedFile', file);
    };

    const onSubmit = (values, { resetForm }) => {
        resetForm();
        setImage(null);
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Card id="EditPostFormBoxCardId" sx={{ maxWidth: 600, width: '100%', m: 2 }}>
                <CardHeader
                    avatar={<Avatar alt="User Name" src={userImage} sx={{ width: 70, height: 70 }} />}
                    title={t("userName")}
                    titleTypographyProps={{ variant: 'h6' }}
                />

                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={editPostValidationSchema}
                >
                    {({ setFieldValue, errors, touched, values, isValid, handleChange, handleBlur }) => (
                        <Form>
                            <Box mr={4} display="flex" justifyContent="flex-end">
                                <input
                                    accept="image/*"
                                    id="editImge"
                                    multiple
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleUploadClick(e, setFieldValue)}
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
                                image={preview || bookImage}
                                sx={{ minHeight: '20vh', maxWidth: '90%', marginLeft: '5%' }}
                            />

                            <CardContent>
                                <Box display="flex" flexDirection="column">
                                    <InputsComponent
                                        values={values}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        errors={errors}
                                        touched={touched}
                                    />
                                    <FormControl sx={{ marginTop: 2 }}>
                                        <FormLabel>{t("status")}</FormLabel>
                                        <RadioGroup row name="status" value={values.status} onChange={handleChange}>
                                            <FormControlLabel value="Done" control={<Radio />} label={t("done")} />
                                            <FormControlLabel value="Not yet" control={<Radio />} label={t("notYet")} />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>

                                <Box mt={2} display="flex" justifyContent="flex-end">
                                    <Button type="submit" variant="contained" color="primary" disabled={!isValid}>{t("postbutton")}</Button>
                                    <Button type="button" variant="contained" color="error" style={{ marginLeft: 10 }} onClick={() => setImage(null)}>{t("cancelbutton")}</Button>
                                </Box>
                            </CardContent>
                        </Form>
                    )}
                </Formik>
            </Card>
        </Box>
    );
};

export default EditPost;
