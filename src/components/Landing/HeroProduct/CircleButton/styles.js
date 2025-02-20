import { styled } from '@mui/material/styles';

export const styledButton = (theme, disabled) => {
  return {
    cursor: 'pointer',
    fontSize: { xs: '25px', md: '50px' },
    color: disabled ? theme.palette.landing.gray : 'inherit',
  };
};

export const ButtonContainer = styled('div')(({ theme, disabled }) => ({
  width: '40px',
  height: '40px',
  border: disabled ? 'none' : `3px solid ${theme.palette.common.black}`,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  [theme.breakpoints.up('md')]: {
    width: '80px',
    height: '80px',
  },
}));
