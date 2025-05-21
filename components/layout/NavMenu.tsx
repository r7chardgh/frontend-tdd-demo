'use client';
import React from 'react'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import MuiButton from '../common/MuiButton';
import axiosInstance from '@/lib/axios';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import LogoutIcon from '@mui/icons-material/Logout';
export const MenuItem = ({
    children, path
}: Readonly<{
    children: React.ReactNode, path: string
}>) => {
    const pathname = usePathname();
    return <li className={`${pathname === path ? " bg-highlight pointer-events-none " : ""} select-none hover:bg-hover w-full transition-all`}>
        <Link href={path} className='w-full h-full py-3 px-3 flex gap-3'>{children}</Link>
    </li>
}
const NavMenu = () => {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = React.useState(true);
    const [isMenuExpaned, setIsMenuExpaned] = React.useState(true);

    const handleLogout = async () => {
        const res = await axiosInstance.get('/api/logout')
        if (res.status === 200) router.push('/');
    };
    return (
        <nav className={`${isMenuExpaned ? "w-48" : "w-20"} bg-gray-800 text-white flex flex-col`}>
            <IconButton aria-label='menu toggle' size='large' className='text-white self-end text-lg' onClick={() => setIsMenuExpaned(!isMenuExpaned)}>{isMenuExpaned ? <CloseFullscreenIcon fontSize='inherit'/> : <OpenInFullIcon fontSize='inherit' />}</IconButton>
            <div className='h-full w-full py-9 flex flex-col '>
                {/* <h2 className={`${isMenuExpaned ? "text-xl" : "text-md"} mb-6 px-3 leading-10`}></h2> */}
                <ul className='gap-9 flex flex-col justify-between flex-1 py-12'>
                    <div className='flex flex-col gap-3'>
                        <MenuItem path='/home' ><HomeIcon />{isMenuExpaned && "Home"}</MenuItem>
                        <MenuItem path='/dashboard' ><AutoAwesomeMosaicIcon />{isMenuExpaned && "Dashboard"}</MenuItem>
                    </div>

                    <li className="mx-auto">
                        <MuiButton onClick={handleLogout} className="text-left w-full">
                            {isMenuExpaned ? "Logout" : <LogoutIcon />}
                        </MuiButton>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavMenu