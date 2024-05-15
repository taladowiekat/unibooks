import React from 'react';
import Inputs from './Inputs.js';
import {  Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@mui/material';
import { useTranslation } from 'react-i18next';
const InputsComponent = ({ formik }) => {
  const {t}=useTranslation();
  return (
    <>
      <Inputs type="text"
      label={t("bookName")}
      name="bookName"
      value={formik.values.bookName}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.bookName && formik.errors.bookName}
      helperText={formik.touched.bookName && formik.errors.bookName}/>
      
      <Inputs
        type="text"
        label={t("notes")}
        name="notes"
        value={formik.values.notes}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        rows={6}
      />

      <FormControl component="fieldset" style={{ marginTop: 20 }}>
        <FormLabel component="legend">{t("listingType")}</FormLabel>
        <RadioGroup row name="listingType" value={formik.values.listingType} onChange={formik.handleChange}>
          <FormControlLabel value="sell" control={<Radio />} label={t("sellType")} />
          <FormControlLabel value="donate" control={<Radio />} label={t("donateType")} />
          <FormControlLabel value="exchange" control={<Radio />} label={t("exchangeType") }/>
        </RadioGroup>
      </FormControl>
      {formik.values.listingType === 'exchange' && (
        <Inputs
          type="text"
          label={t("exchangeBookName")}
          name="exchangeBookName"
          value={formik.values.exchangeBookName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      )}
    </>
  );
};

export default InputsComponent;
