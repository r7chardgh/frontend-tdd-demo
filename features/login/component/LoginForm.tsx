'use client'
import MuiButton from '@/components/common/MuiButton'
import MuiInput from '@/components/common/MuiInput'
import { useAppDispatch } from '@/lib/hooks'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { login as loginApi } from '@/features/login/api/auth';
import { login } from '@/lib/features/login/loginSlice'

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  //handle submit 

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await loginApi({ email, password });
      dispatch(login({ token: response.token }));
      router.push('/home');
    } catch (err) {
      setError('Invalid credentials');
    }
  }

  //A LOT MORE WORK TO IMPROVE,BUT I DON'T HAVE TIME TO DO IT
  //validate for email & password
  return (
    <div className='flex flex-col gap-3 p-9 w-full sm:w-100 mx-auto rounded-sm shadow-lg bg-gray-100'>

      <h1 className=' capitalize font-bold text-3xl'>Login</h1>
      <form data-testid="test:form" className='flex flex-col gap-6' onSubmit={e => handleSubmit(e)}>
        <MuiInput label="email" placeholder='enter your email' onChange={e => setEmail(e.target.value)} value={email} />
        <MuiInput type='password' label="password" placeholder='enter your password' onChange={e => setPassword(e.target.value)} value={password} />
        {!!error&&<div className=' text-red-600'>*{error}</div>}
        <MuiButton type='submit' >login</MuiButton>
      </form>
    </div>
  )
}

export default LoginForm