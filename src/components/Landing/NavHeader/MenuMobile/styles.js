import { styled } from '@mui/material/styles';
import { navHeight } from 'src/components/Landing/NavHeader/NavHeader';
import { MenuRounded, CloseRounded } from '@mui/icons-material/';

export const Container = styled('div')(({ theme }) => ({
  display: 'block',
  position: 'fixed',
  minWidth: '300px',
  top: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: `${navHeight.mobile}px`,
  padding: '30px 20px 21px 30px',
  zIndex: 100,
  backgroundColor: theme.palette.common.white,

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const Logo = styled('div')(({ theme }) => ({
  width: '104px',
  height: '22px',
  position: 'relative',
}));

export const CloseIcon = styled(CloseRounded)(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.common.black,
  fontSize: '34px',
}));

export const MenuIcon = styled(MenuRounded)(({ theme }) => ({
  cursor: 'pointer',
  color: theme.palette.common.black,
  fontSize: '34px',
}));

export const ContainerOptions = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: `${navHeight.mobile}px`,
  left: 0,
  width: '100%',
  height: '80%',
  display: 'flex',
  justifyContent: 'start',
  flexDirection: 'column',
  zIndex: 100,
  backgroundColor: theme.palette.common.white,
  borderTop: `1px solid ${theme.palette.landing.gray}`,
}));

export const FloatingImage = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
}));

export const ContainerImage = styled('div')(({ theme }) => ({
  aspectRatio: 1 / 1,
  maxWidth: '200px',
  width: '220px',
  position: 'absolute',
  bottom: 0,
  right: 0,
  marginBottom: '-30px',

  [theme.breakpoints.up('md')]: {
    maxWidth: '220px',
  },
}));
