import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  color: theme.palette.common.black,
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Degular',
  fontWeight: 700,
  lineHeight: '30px',
  fontSize: '36px',
  marginBottom: '20px',

  [theme.breakpoints.up('md')]: {
    fontSize: '34px',
    marginBottom: '28px',
  },

  [theme.breakpoints.up('xl')]: {
    fontSize: '36px',
    marginBottom: '28px',
  },
}));

export const Description = styled(Typography)(({ theme }) => ({
  marginBottom: '20px',
  lineHeight: '24px',
  fontSize: '15px',
  textAlign: 'justify',

  [theme.breakpoints.up('md')]: {
    marginBottom: '16px',
    lineHeight: '30px',
    fontSize: '18px',
  },

  [theme.breakpoints.up('xl')]: {
    marginBottom: '20px',
    lineHeight: '35px',
    fontSize: '20px',
  },
}));
