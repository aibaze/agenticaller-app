import { styled } from '@mui/material/styles';

export const CustomButton = styled('button')(({ theme, disabled }) => ({
  all: 'unset',
  boxShadow: disabled ? '0px 20px 25px 0px #00B88433' : '',
  height: '53px',
  borderRadius: '25px',
  width: '132px',
  textAlign: 'center',
  cursor: disabled ? 'default' : 'pointer',
  backgroundColor: disabled ? theme.palette.landing.forestGreen : theme.palette.common.pearlGray,
  color: disabled ? theme.palette.common.black : theme.palette.landing.slateGray,
}));
