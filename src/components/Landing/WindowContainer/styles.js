import { styled } from '@mui/material/styles';
import { ClearRounded } from '@mui/icons-material';

export const Container = styled('div')(({ theme, maxWidth }) => ({
  border: '2px solid black',
  borderRadius: '10px',
  overflow: 'hidden',
  minHeight: '200px',
  zIndex: 10,
  position: 'relative',
  backgroundColor: theme.palette.common.white,
  maxWidth: maxWidth ? `${maxWidth}px` : 'inherit',
  margin: '0 auto',
}));

export const TopPart = styled('div')(({ theme }) => ({
  height: '40px',
  backgroundColor: theme.palette.common.black,
  display: 'flex',
  alignItems: 'center',

  [theme.breakpoints.up('md')]: {
    height: '50px',
  },
}));

export const ColorCircleContainer = styled('div')(({ theme, color }) => ({
  display: 'flex',
  gap: '7px',
  marginLeft: '20px',
}));

export const ColorCircle = styled('div')(({ theme, color }) => ({
  backgroundColor: color,
  width: '12px',
  height: '12px',
  borderRadius: '6px',
}));

export const CloseIcon = styled(ClearRounded)(({ theme, color }) => ({
  color: theme.palette.common.white,
  fontSize: '24px',
  fontWeight: 600,
  marginRight: '12px',
  cursor: 'pointer',
}));

export const Text = styled('div')(({ theme, color }) => ({
  width: '100%',
  textAlign: 'center',
}));
