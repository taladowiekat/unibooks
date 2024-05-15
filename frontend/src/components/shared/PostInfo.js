import React from 'react';
import Inputs from './Inputs';
import {  Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@mui/material';

const InputsComponent = ({ formik }) => {
  return (
    <>
      <Inputs type="text"
      label="Book Name"
      name="bookName"
      value={formik.values.bookName}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={formik.touched.bookName && formik.errors.bookName}
      helperText={formik.touched.bookName && formik.errors.bookName}/>
      
      <Inputs
        type="text"
        label="Notes"
        name="notes"
        value={formik.values.notes}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        rows={6}
      />
      <FormControl component="fieldset" style={{ marginTop: 20 }}>
        <FormLabel component="legend">Listing Type</FormLabel>
        <RadioGroup row name="listingType" value={formik.values.listingType} onChange={formik.handleChange}>
          <FormControlLabel value="sell" control={<Radio />} label="Sell" />
          <FormControlLabel value="donate" control={<Radio />} label="Donate" />
          <FormControlLabel value="exchange" control={<Radio />} label="Exchange" />
        </RadioGroup>
      </FormControl>
      {formik.values.listingType === 'exchange' && (
        <Inputs
          type="text"
          label="Exchange Book Name"
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
