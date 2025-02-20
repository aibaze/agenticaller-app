import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Container = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 500,
  color: theme.palette.common.black,

  [theme.breakpoints.up('md')]: {
    fontSize: '14px',
  },
}));
