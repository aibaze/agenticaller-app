import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  height: '100%',
  width: '100%',
  borderRadius: '9px',
  overflow: 'hidden',
  boxShadow: '0px 4px 40px 0px #0000001A',
  color: 'black',
  maxWidth: '420px',
  minWidth: '300px',
  marginTop: '38px',

  [theme.breakpoints.up('md')]: {
    maxWidth: '780px',
  },

  [theme.breakpoints.up('lg')]: {
    maxWidth: '443px',
    marginTop: 0,
  },
}));

export const ItemContainer = styled('div')(({ theme }) => ({
  marginTop: '37px',
  display: 'flex',
  flexDirection: 'column',
  gap: '27px',
}));

export const ImageContainer = styled('div')(({ theme }) => ({
  width: '100%',
  aspectRatio: 443 / 351,
  display: 'none',
  position: 'relative',

  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

export const ContentContainer = styled('div')(({ theme }) => ({
  padding: '28px',

  [theme.breakpoints.up('md')]: {
    padding: '38px',
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Degular',
  fontSize: '50px',
  fontWeight: '600',
  lineHeight: '48px',
  letterSpacing: '-0.5px',
  textAlign: 'left',
  color: theme.palette.landing.darkSlateGray,
  marginTop: '10px',

  [theme.breakpoints.up('md')]: {
    fontSize: '70px',
    lineHeight: '68px',
    marginTop: '30px',
  },
}));

export const Description = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: '15px',
  lineHeight: '25px',
  color: theme.palette.landing.steelBlue,
  marginTop: '20px',

  [theme.breakpoints.up('md')]: {
    fontSize: '20px',
    marginTop: '25px',
  },
}));
