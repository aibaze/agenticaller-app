import { styled } from '@mui/material/styles';

export const Mobile = styled('div')(({ theme }) => ({
  display: 'block',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'start',
  padding: '0 40px 40px',
  marginTop: '40px',
  minWidth: '360px',
}));

export const Columns = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}));

export const ImageContainer = styled('div')(({ theme }) => ({
  width: '109px',
  height: '23px',
  aspectRatio: 191 / 41,
  position: 'relative',

  [theme.breakpoints.up('md')]: {
    width: '133.7px',
    height: '28.7px',
  },
}));
