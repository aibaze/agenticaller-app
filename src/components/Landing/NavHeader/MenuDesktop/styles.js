import { styled } from '@mui/material/styles';
import { navHeight } from 'src/components/Landing/NavHeader/NavHeader';

export const Container = styled('div')(({ theme }) => ({
  display: 'none',
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 100,
  backgroundColor: theme.palette.common.white,

  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

export const Content = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: `${navHeight.desktop}px`,
  padding: '10px',
  maxWidth: '1200px',
  position: 'relative',
  margin: '0 auto',
}));

export const Flex = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}));

export const LogoContainer = styled('div')(({ theme }) => ({
  width: '144px',
  height: '30px',
  marginRight: '20px',
  position: 'relative',
  cursor: 'pointer',
}));

export const Items = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',

  [theme.breakpoints.up('lg')]: {
    gap: '40px',
  },
}));

export const Buttons = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '18px',
  alignItems: 'center',
}));
