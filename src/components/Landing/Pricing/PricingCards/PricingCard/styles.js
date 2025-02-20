import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const Container = styled('div')(({ theme, mostPopular, isMobile }) => ({
  boxShadow: mostPopular && !isMobile ? '0px 4px 40px 0px #0000001A' : 'none',
  width: '346px',
  borderRadius: '20px',
  padding: mostPopular && !isMobile ? '25px 35px 45px' : '5px 35px 0px',
  display: 'flex',
  flexDirection: 'column',
  maxHeight: mostPopular && !isMobile ? '570px' : 'none',
}));

export const MostPopular = styled('div')(({ theme }) => ({
  width: '143px',
  height: '32px',
  backgroundColor: theme.palette.landing.mintIce,
  color: theme.palette.landing.forestGreen,
  fontSize: '10px',
  fontWeight: 800,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '16px',
  alignSelf: 'end',
  marginRight: '-10px',
}));

export const PriceContainer = styled('div')(({ theme, mostPopular, isMobile }) => ({
  color: theme.palette.landing.bluePurple,
  display: 'flex',
  gap: '22px',
  alignItems: 'end',
  marginBottom: '30px',
  marginTop: mostPopular && !isMobile ? '25px' : '10px',
}));

export const Price = styled(Typography)(({ theme }) => ({
  fontSize: '36px',
  fontWeight: 800,
}));

export const MonthlyYear = styled(Typography)(({ theme }) => ({
  fontSize: '17px',
  fontWeight: 500,
  color: theme.palette.landing.slateGray,
  marginBottom: '6px',
}));

export const PlanType = styled(Typography)(({ theme }) => ({
  color: theme.palette.landing.bluePurple,
  fontSize: '28px',
  fontWeight: 800,
  marginBottom: '12px',
}));

export const Description = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 400,
  color: theme.palette.landing.slateGray,
  marginBottom: '16px',
}));

export const ItemsContainer = styled('div')(({ theme, mostPopular, isMobile }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '22px',
}));
