import React, { FC } from 'react'
import { TextField, TextFieldProps } from '@mui/material'
const MuiInput = ({
  label,
  placeholder,
  type
  ,
  ...props
}: TextFieldProps) => {
  return (
    <TextField required  variant="outlined" label={label} placeholder={placeholder} type={type} {...props} />
  )
}

export default MuiInput