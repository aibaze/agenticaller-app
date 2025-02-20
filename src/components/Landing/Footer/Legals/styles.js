import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 400,
  color: theme.palette.common.black,
  marginTop: '-10px',
  display: 'flex',
  minWidth: '170px',

  [theme.breakpoints.up('md')]: {
    fontSize: '14px',
    fontWeight: 600,
    marginTop: '260px',
  },
}));
