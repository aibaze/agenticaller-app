import { styled } from '@mui/material/styles';
import { navHeight } from 'src/components/Landing/NavHeader/NavHeader';

export const ProductContainer = styled('div')(({ theme }) => ({
  marginTop: `${navHeight.mobile}px`,
  backgroundColor: theme.palette.common.white,
  minWidth: '310px',

  [theme.breakpoints.up('md')]: {
    marginTop: `${navHeight.desktop}px`,
  },
}));
