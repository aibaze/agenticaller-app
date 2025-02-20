import { styled } from '@mui/material/styles';

export const CardsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '42px',
  justifyContent: 'flex-start',
  flexWrap: 'nowrap',
  margin: '0 auto',
  color: theme.palette.common.black,
  maxWidth: '100vw',
  minHeight: '182px',
  overflowX: 'auto',
  overflowY: 'hidden',
  padding: '0 30px 30px 30px',
  '::-webkit-scrollbar': {
    width: 0,
    background: 'transparent',
  },

  [theme.breakpoints.up('sm')]: {
    gap: '50px',
  },

  [theme.breakpoints.up('md')]: {
    flexWrap: 'wrap',
    padding: '0 30px 120px 30px',
  },
}));

export const Card = styled('div')(({ theme }) => ({
  width: '82px',
  position: 'relative',
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
  tapHighlightColor: 'transparent',
}));

export const CardWhiteBackground = styled('div')(({ theme }) => ({
  borderRadius: '10px',
  width: '130px',
  height: '167px',
  backgroundColor: 'white',
  position: 'absolute',
  left: 0,
  top: 0,
  marginLeft: '-24px',
}));
