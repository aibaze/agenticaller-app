import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { Instagram, X, LinkedIn } from '@mui/icons-material';

export const Container = styled('div')(({ theme }) => ({
  zIndex: 2,
  minWidth: '120px',
}));

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontWeight: 600,
  display: 'none',

  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

const sizeIcons = {
  fontSize: '32px',
  top: '15px',
  left: '16px',
};

export const IconX = styled(X)(({ theme }) => ({
  fill: theme.palette.common.black,
  ...sizeIcons,
}));

export const IconInstagram = styled(Instagram)(({ theme }) => ({
  fill: theme.palette.common.black,
  ...sizeIcons,
}));

export const IconLinkedIn = styled(LinkedIn)(({ theme }) => ({
  fill: theme.palette.common.black,
  ...sizeIcons,
}));
