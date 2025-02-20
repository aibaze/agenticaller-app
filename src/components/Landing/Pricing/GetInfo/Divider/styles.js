import { styled } from '@mui/material/styles';

export const DividerLine = styled('div')(({ theme }) => ({
  display: 'block',
  border: `1.5px solid ${theme.palette.landing.gray}`,
  maxWidth: '313px',
  width: '100%',
  margin: '15px',

  [theme.breakpoints.up('sm')]: {
    margin: 0,
  },

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));
