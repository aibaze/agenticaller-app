import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { ArrowBackRounded } from '@mui/icons-material/';

export const Container = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  alignSelf: 'start',
  width: 'fit-content',
  marginBottom: '12px',
  maxWidth: '1050px',
  width: '100%',
  margin: '0 auto',

  [theme.breakpoints.up('md')]: {
    marginBottom: '15px',
  },
}));

export const Text = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: theme.palette.common.black,
  lineHeight: 1.2,
  borderBottom: '2px solid black',
  width: 'fit-content',
}));

export const ArrowBackIcon = styled(ArrowBackRounded)(({ theme }) => ({
  fontSize: '16px',
  marginBottom: '-2px',
}));
