import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme, isTextarea }) => ({
  display: 'flex',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: '16px',
  maxWidth: '450px',
  position: 'relative',
  height: isTextarea ? 'inherit' : '45px',
  fontSize: '14px',

  [theme.breakpoints.up('md')]: {
    maxWidth: '642px',
    height: isTextarea ? 'inherit' : '59px',
    fontSize: '22px',
  },
}));

const sharedStyles = (theme, isError) => ({
  all: 'unset',
  borderRadius: '32.5px',
  border: isError
    ? `2px solid ${theme.palette.landing.crimsonRed}`
    : `2px solid ${theme.palette.common.black}`,
  color: theme.palette.landing.darkSlateGray,
  fontWeight: 100,
  letterSpacing: '2px',
  width: '100%',
});

export const Textarea = styled('textarea')(({ theme, isError }) => ({
  ...sharedStyles(theme, isError),
  padding: '20px',
  resize: 'none',
  wordWrap: 'break-word',
}));

export const Input = styled('input')(({ theme, isError }) => ({
  ...sharedStyles(theme, isError),
  paddingLeft: '50px',
}));
