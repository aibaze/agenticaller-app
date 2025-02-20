import { styled } from '@mui/material/styles';

export const IconStyles = styled('div')(({ theme, color }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10,
  backgroundColor: color,
  width: '100%',
  height: '88px',
  borderRadius: '11px',
  margin: '25px 0 15px 0',
}));

export const iconSharedStyle = (theme) => ({
  color: theme.palette.common.white,
  fontSize: '60px',
});
