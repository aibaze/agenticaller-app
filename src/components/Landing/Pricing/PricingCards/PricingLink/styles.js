import { styled } from '@mui/material/styles';
import Link from 'next/link';

export const colors = (theme) => ({
  dark: { backgroundColor: theme.palette.landing.forestGreen, color: theme.palette.common.black },
  light: {
    backgroundColor: theme.palette.landing.mintIce,
    color: theme.palette.landing.forestGreen,
  },
});

export const CustomLink = styled(Link)(({ theme }) => ({
  all: 'unset',
  height: '53px',
  borderRadius: '25px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));
