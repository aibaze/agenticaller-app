import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '12px',

  [theme.breakpoints.up('md')]: {
    gap: '24px',
  },
}));
