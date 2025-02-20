import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  margin: '20px 30px 35px 30px',
  minWidth: '300px',

  [theme.breakpoints.up('md')]: {
    margin: '10px 115px',
  },
}));

export const Text = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  textDecoration: 'underline',
  textAlign: 'center',
  margin: '15px',
  fontSize: '18px',
  textUnderlineOffset: 3,

  [theme.breakpoints.up('md')]: {
    fontSize: '20px',
  },
}));
