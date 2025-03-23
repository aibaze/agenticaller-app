import { styled, keyframes } from '@mui/material/styles';
import { Stack, Box } from '@mui/material';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  width: '100%',
  padding: theme.spacing(3),
  alignItems: 'center', 
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  maxWidth: '600px',
  padding: theme.spacing(5),
  margin: theme.spacing(5),
  borderRadius: theme.shape.borderRadius * 3,
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
  animation: `${fadeIn} 0.6s ease-out`,
  border: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
  },
  [theme.breakpoints.up('md')]: {
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    transform: 'translateY(0px)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.18)',
    },
  },
}));

export const StyledLogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  width: '100%',
  marginBottom: theme.spacing(4),
  '& svg': {
    filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    }
  }
}));
