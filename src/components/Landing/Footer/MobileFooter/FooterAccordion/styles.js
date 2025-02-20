import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const DetailContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}));

export const SummaryText = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  color: theme.palette.common.black,
}));

export const LinkRowText = styled(Typography)(({ theme }) => ({
  marginLeft: '40px',
  color: theme.palette.common.black,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));
