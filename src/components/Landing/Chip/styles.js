import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  width: '136px',
  height: '35px',
  color: theme.palette.common.black,
  backgroundColor: theme.palette.landing.emeraldGreen,
  boxShadow: `0px 20px 25px 0px ${theme.palette.landing.emeraldGreen}33`,
  borderRadius: '15px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '15px',
  fontWeight: 600,

  [theme.breakpoints.up('md')]: {
    fontSize: '17px',
  },
}));
