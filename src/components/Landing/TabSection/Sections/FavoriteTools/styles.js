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
