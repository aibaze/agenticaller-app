import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  display: 'block',
  width: 'calc(100% + 60px)',
  marginLeft: '-30px',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const SummaryContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '18px',
  alignItems: 'center',
}));

export const SummaryText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.common.black,
}));

export const DetailsText = styled(Typography)(({ theme }) => ({
  padding: '15px',
}));
