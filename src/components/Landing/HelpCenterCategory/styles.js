import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  padding: '10px 15px 20px',
  width: '100%',

  [theme.breakpoints.up('md')]: {
    padding: '15px 15px 30px',
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: '27px',
  fontFamily: 'Degular',
  color: theme.palette.common.black,
  textAlign: 'center',
  fontWeight: 600,
  maxWidth: '100%',
  lineHeight: '20px',
  padding: '15px 0px',
  margin: '20px auto',

  [theme.breakpoints.up('md')]: {
    fontSize: '40px',
    maxWidth: '85%',
    lineHeight: '65px',
    padding: '5px',
    margin: '15px auto',
  },

  [theme.breakpoints.up('lg')]: {
    fontSize: '45px',
  },

  [theme.breakpoints.up('xl')]: {
    fontSize: '52px',
  },
}));

export const CheckboxContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '5px 30px',
  justifyContent: 'center',
  maxWidth: '900px',
  margin: '0 auto 20px',
}));
