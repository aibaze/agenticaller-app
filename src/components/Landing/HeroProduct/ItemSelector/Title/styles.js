import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  marginLeft: '-15px',
  display: 'flex',
  width: '115px',
  position: 'relative',
  zIndex: 10,
}));

export const TitleText = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  textAlign: 'center',
  fontWeight: 600,
  fontSize: '17px',
  position: 'absolute',
  width: '100%',
}));
