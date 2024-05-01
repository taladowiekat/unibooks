import React from 'react';
import { Grid, TextField, Box } from '@mui/material';

function Inputs({ type, name, label, onChange, onBlur, value, error, helperText, rows }) {
  return (
    <Grid item xs={12}>
      <Box sx={{ margin: 2 }}> 
        <TextField
        multiline
          type={type}
          name={name}
          label={label}
          variant="outlined" 
          size="small"
          fullWidth  
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          error={error}
          helperText={helperText}
          rows={rows}
          
        />
      </Box>
    </Grid>
  );
}

export default Inputs;
