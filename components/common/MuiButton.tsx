import React, { FC } from 'react'
import { Button, ButtonOwnProps } from '@mui/material'
const MuiButton = ({ onClick, children, ...props }: ButtonOwnProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button onClick={onClick} variant='contained' color='primary' {...props} className='rounded-md font-semibold capitalize text-white'>{children}</Button>
  )
}

export default MuiButton