import { styled } from '@mui/material/styles';
import { Tabs } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',

  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}));

export const TabContainer = styled('div')(({ theme }) => ({
  width: 'max-content',
  width: '300px',
  margin: '0 auto 30px auto',
  position: 'relative',
}));

export const CardContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
}));

export const TabUnderline = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '3px',
  backgroundColor: theme.palette.landing.pearlGray,
  zIndex: 1,
}));

export const CustomTabs = styled(Tabs)(({ theme }) => ({
  fontFamily: 'Degular',
  fontSize: '14px',
  color: 'black',
  fontFamily: 'Degular',

  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.landing.forestGreen,
    height: '3px',
    zIndex: 10,
  },
}));
