import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const ContentContainer = styled('div')(({ theme }) => ({
  height: '75px',
  borderBottom: `1px solid ${theme.palette.landing.gray}`,
  padding: '25px 20px 20px 30px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: `${theme.palette.landing.gray}55`,
  },
}));

export const Text = styled(Typography)(({ theme }) => ({
  fontSize: '25px',
  lineHeight: 1,
  whiteSpace: 'nowrap',
  color: theme.palette.common.black,
}));
