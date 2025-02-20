import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '20px',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  margin: '60px 0 40px',

  [theme.breakpoints.up('md')]: {
    gap: '50px',
    alignItems: 'normal',
    flexDirection: 'row',
    margin: '60px 0 160px',
  },
}));
