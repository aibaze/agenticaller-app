import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

export const Container = styled('form')(({ theme }) => ({
  padding: '10px',
  width: '100%',
  marginBottom: '12px',
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
    lineHeight: '45px',
    padding: 0,
    margin: '18px auto',
  },

  [theme.breakpoints.up('lg')]: {
    fontSize: '45px',
  },

  [theme.breakpoints.up('xl')]: {
    fontSize: '52px',
  },
}));

export const PersonIcon = styled(PersonRoundedIcon)(({ theme }) => ({
  fill: theme.palette.common.black,
  fontSize: '32px',
  position: 'absolute',
  top: '8px',
  left: '16px',

  [theme.breakpoints.up('md')]: {
    top: '15px',
  },
}));
