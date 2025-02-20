import { styled } from '@mui/material/styles';
import { Stack, Box, Link, Typography } from '@mui/material';

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '55vh',
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
  padding: theme.spacing(4),
  margin: theme.spacing(5),
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.default,
  boxShadow: theme.shadows[3],
  [theme.breakpoints.up('md')]: {
    boxShadow: theme.shadows[0],
  },
}));

export const StyledLogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  width: '100%',
  marginBottom: theme.spacing(4),
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(2.5),
  textAlign: 'center',
  typography: 'caption',
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  underline: 'always',
  color: theme.palette.text.primary,
}));
