import { styled } from '@mui/material/styles';

export const sizeTick = {
  small: 10,
  medium: 15,
};

const style = {
  small: { width: '20px', height: '20px', borderRadius: '10px' },
  medium: { width: '30px', height: '30px', borderRadius: '19.5px', fontSize: '30px' },
};

export const Container = styled('div')(({ theme, size, backgroundColor }) => ({
  ...style[size],
  backgroundColor: backgroundColor ? backgroundColor : theme.palette.landing.mintIce,
  color: theme.palette.landing.forestGreen,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
