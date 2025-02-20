import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  maxWidth: '280px',
  color: theme.palette.common.black,
  display: 'flex',
  gap: '12px',
  cursor: 'pointer',
  position: 'relative',
  userSelect: 'none',

  '&:hover::before': {
    content: '""',
    position: 'absolute',
    top: '-16px',
    right: '-16px',
    bottom: '-16px',
    left: '-16px',
    backgroundColor: theme.palette.landing.mintIce,
    zIndex: -1,
    borderRadius: '10px',
  },

  [theme.breakpoints.up('lg')]: {
    maxWidth: '320px',
    gap: '15px',
  },
}));

export const IconContainer = styled('div')(({ theme, color }) => ({
  backgroundColor: color,
  width: '52.8px',
  height: '55.2px',
  borderRadius: '11px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  [theme.breakpoints.up('lg')]: {
    width: '70.4px',
    height: '73.6px',
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontFamily: 'Degular',
  fontSize: '22px',
  fontWeight: 600,
  lineHeight: 1,
  marginBottom: '12px',

  [theme.breakpoints.up('lg')]: {
    fontSize: '26px',
    marginBottom: '14px',
  },
}));

export const Description = styled(Typography)(({ theme }) => ({
  minWidth: '130px',
  fontSize: '13px',
  fontWeight: 300,
  lineHeight: 1.2,

  [theme.breakpoints.up('lg')]: {
    minWidth: '130px',
    fontSize: '16px',
  },
}));
