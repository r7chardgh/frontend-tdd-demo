'use client';
import React from 'react'
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import MuiButton from '../common/MuiButton';

export const MenuItem = ({
    children, path
}: Readonly<{
    children: React.ReactNode, path: string
}>) => {
    const pathname = usePathname();
    return <li className={`${pathname === path ? " bg-highlight pointer-events-none " : ""} select-none hover:bg-hover w-full transition-all`}>
        <Link href={path} className='w-full h-full py-3 px-3 block'>{children}</Link>
    </li>
}
const NavMenu = () => {
    const router = useRouter();

    const handleLogout = () => {
        router.push('/');
    };
    return (
        <nav className="w-32 bg-gray-800 text-white py-9 h-full flex flex-col">
            <h2 className="text-xl mb-6 px-3">Menu</h2>
            <ul className='gap-9 flex flex-col justify-between flex-1 py-12'>
                <div className='flex flex-col gap-3'>
                    <MenuItem path='/home' >Home</MenuItem>
                    <MenuItem path='/dashboard' >Dashboard</MenuItem>
                </div>

                <li className="mx-auto">
                    <MuiButton onClick={handleLogout} className="text-left w-full">
                        Logout
                    </MuiButton>
                </li>
            </ul>
        </nav>
    )
}

export default NavMenu