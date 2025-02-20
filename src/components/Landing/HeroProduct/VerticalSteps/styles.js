import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  maxWidth: '500px',
  width: '100%',
  '&::before': {
    content: '""',
    height: '-webkit-fill-available',
    marginTop: '20px',
    marginLeft: '15px',
    position: 'absolute',
    zIndex: 1,
    width: '1px',
    backgroundImage: `repeating-linear-gradient(0deg, ${theme.palette.landing.forestGreen}, ${theme.palette.landing.forestGreen} 7px, transparent 7px, transparent 20px, ${theme.palette.landing.forestGreen} 20px)`,
  },
}));

export const Section = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '15px',
  alignItems: 'start',
  position: 'relative',
}));

export const TickContainer = styled('div')(({ theme }) => ({
  marginTop: '8px',
  zIndex: 10,
}));

export const WhiteBackgroundRemoveDash = styled('div')(({ theme }) => ({
  marginTop: '38px',
  color: theme.palette.common.white,
  width: '40px',
  height: 'calc(100% + 36px)',
  position: 'absolute',
  content: '""',
  zIndex: 15,
  backgroundColor: theme.palette.common.white,

  [theme.breakpoints.up('md')]: {
    height: 'calc(100% + 48px)',
  },
}));

export const InfoTextContainer = styled('div')(({ theme }) => ({
  maxWidth: '580px',
  color: theme.palette.common.black,
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 600,
  marginBottom: 0,
  marginTop: '8px',

  [theme.breakpoints.up('md')]: {
    fontSize: '22px',
  },

  [theme.breakpoints.up('xl')]: {
    fontSize: '24px',
    marginBottom: '8px',
  },
}));

export const Description = styled(Typography)(({ theme }) => ({
  fontSize: { xs: '15px', md: '16px', xl: '18px' },
  marginBottom: { xs: '12px', md: '15px', xl: '18px' },

  [theme.breakpoints.up('md')]: {
    height: 'calc(100% + 48px)',
  },

  [theme.breakpoints.up('md')]: {
    height: 'calc(100% + 48px)',
  },
}));
