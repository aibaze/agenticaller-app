import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  display: 'none',
  position: 'relative',
  width: '100%',

  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

export const Svg = styled('div')(({ theme }) => ({
  position: 'absolute',
  minWidth: '100%',
  top: '-400px',
  height: '1059px',
  zIndex: 1,
}));
