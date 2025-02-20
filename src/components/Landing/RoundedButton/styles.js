import { styled } from '@mui/material/styles';
import { Typography, CircularProgress } from '@mui/material';

const buttonStylesType = (theme) => ({
  black: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,

    '&:hover': {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
  },
  green: {
    color: theme.palette.common.black,
    border: `2px solid ${theme.palette.common.black}`,
    backgroundColor: theme.palette.landing.forestGreen,
    '&:hover': {
      color: theme.palette.landing.black,
      backgroundColor: theme.palette.common.white,
    },
  },
  violet: {
    color: theme.palette.common.black,
    border: `2px solid ${theme.palette.common.black}`,
    backgroundColor: theme.palette.landing.lavender,
    '&:hover': {
      color: theme.palette.landing.black,
      backgroundColor: theme.palette.common.white,
    },
  },
  default: {
    color: theme.palette.common.black,
    border: `2px solid ${theme.palette.common.black}`,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.common.black,
    },
  },
});

const buttonSizeStyles = {
  small: {
    height: '40px',
  },
  medium: {
    height: '52px',
  },
};

export const ContentContainer = styled('div')(
  ({ theme, isLoading, disabled, minWidth, fill, size }) => ({
    display: 'flex',
    alignItems: 'center',
    borderRadius: 29,
    whiteSpace: 'nowrap',
    width: 'fit-content',
    minWidth: minWidth ? `${minWidth}px` : 'fit-content',
    boxShadow: '0px 4px 40px 0px #0000001A',
    padding: '0 18px',
    transition: 'all 0.15s ease-in',
    cursor: isLoading || disabled ? 'default' : 'pointer',

    [theme.breakpoints.up('sm')]: {
      padding: '0 28px',
    },

    [theme.breakpoints.up('md')]: {
      padding: '0 30px',
    },

    [theme.breakpoints.up('xl')]: {
      padding: '0 48px',
    },

    ...buttonStylesType(theme)[fill],
    ...(isLoading && { backgroundColor: theme.palette.grey[200] }),
    ...buttonSizeStyles[size],
  })
);

const buttonFontSizeStyles = {
  small: {
    fontSize: '18px',
  },
  medium: {
    fontSize: '25px',
  },
};

export const Text = styled(Typography)(({ theme, size, weight }) => ({
  fontWeight: weight,
  textAlign: 'center',
  width: '100%',
  ...buttonFontSizeStyles[size],
}));

export const Button = styled('button')(({ theme }) => ({
  all: 'unset',
  display: 'block',
  margin: '0 auto',
}));

export const CircularProgressCustom = styled(CircularProgress)(({ theme, fill }) => ({
  color: buttonStylesType(theme)[fill].background,
}));
