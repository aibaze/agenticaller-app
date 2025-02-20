import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  width: '95%',
  boxShadow: '0px 4px 19px 0px #00000040',
  border: `3px solid ${theme.palette.common.black}`,
  borderRadius: '10px',
  display: 'flex',
  position: 'relative',
  height: '518px',
  overflow: 'hidden',
  backgroundColor: theme.palette.common.white,
}));

export const ImageContainer = styled('div')(({ theme, width, height }) => ({
  width: '33%',
  minHeight: '510px',
  maxWidth: '245px',
  aspectRatio: `${width} / ${height}`,
  transform: 'rotate(0deg)',
  display: 'none',
  position: 'relative',

  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

export const TextContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  padding: '25px',

  [theme.breakpoints.up('lg')]: {
    padding: '30px',
  },
  [theme.breakpoints.up('xl')]: {
    padding: '48px',
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Degular',
  fontSize: '58px',
  lineHeight: '78px',
  fontWeight: 600,

  [theme.breakpoints.up('lg')]: {
    fontSize: '75px',
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '90px',
  },
}));

export const ItemsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '20px',
  flexDirection: 'column',
}));

export const LinkContainer = styled('div')(({ theme }) => ({
  display: 'flex',
}));

export const LinkLabel = styled(Typography)(({ theme }) => ({
  paddingLeft: '8px',
  fontSize: '15px',
  fontWeight: 600,
  textDecoration: 'underline',
}));
