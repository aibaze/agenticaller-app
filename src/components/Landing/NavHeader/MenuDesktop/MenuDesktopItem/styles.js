import { styled } from '@mui/material/styles';
import { KeyboardArrowDownRounded } from '@mui/icons-material/';
import { Typography } from '@mui/material';

export const ContentWithArrow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const Arrow = styled(KeyboardArrowDownRounded)(({ theme }) => ({
  fontSize: '24px',
  color: theme.palette.common.black,
}));

export const ContentText = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  fontSize: '18px',
  lineHeight: 1,
  whiteSpace: 'nowrap',
  fontWeight: 500,
  color: theme.palette.common.black,

  [theme.breakpoints.up('lg')]: {
    fontSize: '20px',
  },
}));
