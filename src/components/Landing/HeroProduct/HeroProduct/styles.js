import { styled } from '@mui/material/styles';

export const HeroBackground = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.landing.mintIce,
}));

export const HeroContainer = styled('div')(({ theme }) => ({
  maxWidth: '1200px',
  minWidth: '330px',
  margin: '0 auto',
  boxSizing: 'content-box',
}));

export const TitleAndButtons = styled('div')(({ theme }) => ({
  color: theme.palette.common.black,
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'space-between',
  padding: '42px 30px 20px 20px',

  [theme.breakpoints.up('md')]: {
    padding: '70px 20px 60px 20px',
  },
}));

export const NavButtonsContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '95px',
  right: '30px',

  [theme.breakpoints.up('md')]: {
    position: 'static',
    top: '115px',
  },
}));

export const StepsImageContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '60px',
  justifyContent: 'space-between',
  padding: '40px 20px',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
  flexDirection: 'column-reverse',
  position: 'relative',

  [theme.breakpoints.up('md')]: {
    padding: '100px 20px 20px',
    alignItems: 'start',
    flexDirection: 'row',
  },
}));

export const ImageContainer = styled('div')(({ theme, width, height }) => ({
  width: '100%',
  aspectRatio: `${width} / ${height}`,
  maxWidth: '520px',
  minWidth: '330px',
  position: 'relative',
  margin: '0 auto',
  zIndex: 10,
  minHeight: '220px',

  [theme.breakpoints.up('md')]: {
    maxWidth: '680px',
  },

  [theme.breakpoints.up('xl')]: {
    maxWidth: '860px',
  },
}));

export const BackgroundColorToImage = styled('div')(({ theme }) => ({
  position: 'absolute',
  backgroundColor: theme.palette.landing.mintIce,
  width: '100%',
  height: '240px',
  top: 0,
  marginTop: '-2px',
  content: '""',
  zIndex: 0,
  display: 'block',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));
