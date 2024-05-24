import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Avatar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import userImage from './Avatar.png';
import bookImage from './Frame_129.png';
import { useValidations } from '../../components/validation/validation';
import { Formik, Form } from 'formik';
import InputsComponent from '../../components/shared/PostInfo.js';
import { useTranslation } from 'react-i18next';

const initialValues = {
  bookName: '',
  notes: '',
  listingType: 'sell',
  exchangeBookName: '',
  status: 'Done',
  selectedFile: null
};

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const EditPost = () => {
  const { editPostValidationSchema } = useValidations();
  const { t } = useTranslation();
  const [image, setImage] = useState(bookImage);
  const [preview, setPreview] = useState(bookImage);

  useEffect(() => {
    if (!image || typeof image === 'string') {
      setPreview(image);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const handleUploadClick = (e, setFieldValue) => {
    const file = e.currentTarget.files[0];
    if (file) {
      setImage(file);
      setFieldValue('selectedFile', file);
    }
  };

  const onSubmit = (values, { resetForm }) => {
    resetForm();
    setImage(bookImage);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ maxWidth: 600, width: '100%', m: 2 }}>
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
              <Box display="flex" justifyContent="center" alignItems="center">
                <ImageButton focusRipple style={{ width: '100%' }}>
                  <ImageSrc style={{ backgroundImage: `url(${preview})` }} />
                  <ImageBackdrop className="MuiImageBackdrop-root" />
                  <Box>
                    <input
                      accept="image/*"
                      id="editImge"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={(e) => handleUploadClick(e, setFieldValue)}
                    />
                    <label htmlFor="editImge">
                      <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        sx={{
                          position: 'relative',
                          p: 4,
                          pt: 2,
                          pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                        }}
                      >
                        Edit Image
                        <ImageMarked className="MuiImageMarked-root" />
                      </Typography>
                    </label>
                  </Box>
                </ImageButton>
              </Box>

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
                  <Button type="button" variant="contained" color="error" style={{ marginLeft: 10 }} onClick={() => setImage(bookImage)}>{t("cancelbutton")}</Button>
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
