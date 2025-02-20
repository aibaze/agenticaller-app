import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Container = styled('div')(({ theme, width, height }) => ({
  minWidth: '276px',
  height: '518px',
  maxWidth: width,
  aspectRatio: `${width} / ${height}`,
  color: theme.palette.common.white,
  position: 'relative',
  border: `3px solid ${theme.palette.common.black}`,
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0px 4px 19px 0px #00000040',
}));

export const Text = styled(Typography)(({ theme }) => ({
  fontSize: '26px',
  lineHeight: '32px',
  padding: '37px 40px 0 36px',
  position: 'relative',
  zIndex: 10,
}));
