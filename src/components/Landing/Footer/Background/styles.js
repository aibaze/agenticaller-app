import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
  position: 'relative',
}));

export const ImageContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  backgroundColor: theme.palette.common.white,
}));
