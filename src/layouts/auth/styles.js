import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

export const ImageContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '800px',
  [theme.breakpoints.up('md')]: {
    height: '800px',
  },
  [theme.breakpoints.up('lg')]: {
    height: '100%',
  },
}));

export const StyledStack = styled(Stack)(({ theme, background }) => ({
  width: '100%',
  margin: '0 auto',
  maxWidth: 600,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    paddingTop: theme.spacing(20),
    paddingBottom: theme.spacing(0),
  },
}));

export const StylesStackContainer = styled(Stack)(({ theme, background }) => ({
  background: background || theme.palette.background.default,
  minHeight: '100vh',
  [theme.breakpoints.down('sm')]: {
    background: `linear-gradient(to bottom, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.88)), url(/assets/background/overlay_2.jpg)`
  },
}));
