import React, { FC } from 'react'
import { Button, ButtonOwnProps, FormControl, FormControlProps, Input, InputLabel, InputProps, TextField, TextFieldProps } from '@mui/material'
const MuiInput = ({
  formControlProps,
  label,
  placeholder,
  type
}: { formControlProps?: FormControlProps} &TextFieldProps ) => {


  return (
    <FormControl {...formControlProps} >
      <TextField required id="outlined-basic" variant="outlined" label={label} placeholder={placeholder} type={type} />
    </FormControl>
  )
}

export default MuiInput