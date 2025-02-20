import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  display: 'none',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'end',
  gap: '25px',
  marginBottom: '120px',

  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    gap: 0,
  },
}));
