'use client';
import { createTheme } from '@mui/material/styles';
import { Noto_Sans_HK } from 'next/font/google';

const noto_sans = Noto_Sans_HK({
  weight: ["300", "400"],
  style: ["normal"],
  subsets: ["latin"],
});


const theme = createTheme({
   palette: {
    primary: {
      main: '#00BCD4',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: noto_sans.style.fontFamily,
    fontSize: 14,
  },
  spacing: 8,
});

export default theme;
