'use client'
import MuiButton from '@/components/common/MuiButton'
import MuiInput from '@/components/common/MuiInput'
import { useRouter } from 'next/navigation'
import React from 'react'

const LoginForm = () => {
  const router = useRouter();


  //A LOT MORE WORK TO IMPORT, I DON'T HAVE TIME TO DO
  //validate for email & password
  return (
    <div className='flex flex-col gap-3 p-9 w-full sm:w-100 mx-auto rounded-sm shadow-lg bg-gray-100'>

      <h1 className=' capitalize font-bold text-3xl'>Login</h1>
      <form className='flex flex-col gap-6'>
        <MuiInput label="email" placeholder='enter your email' />
        <MuiInput type='password' label="password" placeholder='enter your password' />
        <MuiButton type='submit' onClick={()=>router.push('/home')}>login</MuiButton>
      </form>
    </div>
  )
}

export default LoginForm