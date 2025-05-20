import React, { FC } from 'react'
import { TextField, TextFieldProps } from '@mui/material'
const MuiInput = ({

  ...props
}: TextFieldProps) => {
  return (
    <TextField required variant="outlined" {...props} />
  )
}

export default MuiInput