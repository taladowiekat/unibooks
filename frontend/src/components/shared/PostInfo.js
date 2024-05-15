import React from 'react';
import { Field } from 'formik';
import { TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

const InputsComponent = ({ values, handleChange, handleBlur, touched, errors }) => {
  const { t } = useTranslation();

  return (
    <>
      <Field
        name="bookName"
        as={TextField}
        label={t("bookName")}
        fullWidth
        margin="normal"
        error={touched.bookName && Boolean(errors.bookName)}
        helperText={touched.bookName && errors.bookName}
      />

      <Field
        name="notes"
        as={TextField}
        label={t("notes")}
        fullWidth
        margin="normal"
        multiline
        rows={6}
      />

      <FormControl component="fieldset" style={{ marginTop: 20 }}>
        <FormLabel component="legend">{t("listingType")}</FormLabel>
        <RadioGroup row name="listingType" value={values.listingType} onChange={handleChange}>
          <FormControlLabel value="sell" control={<Radio />} label={t("sellType")} />
          <FormControlLabel value="donate" control={<Radio />} label={t("donateType")} />
          <FormControlLabel value="exchange" control={<Radio />} label={t("exchangeType")} />
        </RadioGroup>
      </FormControl>

      {values.listingType === 'exchange' && (
        <Field
          name="exchangeBookName"
          as={TextField}
          label={t("exchangeBookName")}
          fullWidth
          margin="normal"
        />
      )}
    </>
  );
};

export default InputsComponent;
