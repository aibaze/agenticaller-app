import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  position: 'relative',
}));

const colorStyles = {
  position: 'absolute',
  content: '""',
  width: 'calc(100% + 60px)',
  marginLeft: '-30px',
  zIndex: 1,
};

export const Color1 = styled('div')(({ theme }) => ({
  ...colorStyles,
  backgroundColor: theme.palette.landing.mintIce,
  height: '400px',
  bottom: 140,
}));

export const Color2 = styled('div')(({ theme }) => ({
  ...colorStyles,
  backgroundColor: theme.palette.landing.lavenderMist,
  height: '600px',
  top: -140,
}));
