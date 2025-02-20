import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { navHeight } from '../NavHeader/NavHeader';

export const Container = styled('div')(({ theme }) => ({
  display: 'none',
  maxWidth: '1800px',
  height: `calc(100vh - ${navHeight.desktop}px)`,

  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

export const LeftColumn = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '250px',
  backgroundColor: theme.palette.landing.mintIce,
  padding: '20px',

  [theme.breakpoints.up('lg')]: {
    minWidth: '340px',
    padding: '35px',
  },
}));

export const RightContent = styled('div')(({ theme }) => ({
  overflow: 'auto',
}));

export const ImageContainer = styled('div')(({ theme }) => ({
  aspectRatio: 1 / 1,
  maxWidth: '200px',
  width: '100%',
  position: 'relative',

  [theme.breakpoints.up('lg')]: {
    maxWidth: '220px',
  },
}));

export const Text = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontFamily: 'Degular',
  fontSize: '22px',
  fontWeight: 500,
  lineHeight: 1.2,
  textAlign: 'center',
  margin: '30px 0',

  [theme.breakpoints.up('lg')]: {
    fontSize: '28px',
    margin: '40px 0',
  },
}));

export const ItemsContainer = styled('div')(({ theme, color }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  gap: '20px',
  padding: '20px',

  [theme.breakpoints.up('lg')]: {
    gap: '30px',
  },

  [theme.breakpoints.up('xl')]: {
    gap: '35px',
  },
}));
