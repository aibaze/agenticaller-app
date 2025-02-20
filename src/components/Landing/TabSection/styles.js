import { styled } from '@mui/material/styles';
import { Tabs } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  padding: '25px 33px 42px 30px',
  maxWidth: '1200px',
  boxSizing: 'content-box',
  margin: '0 auto',
  zIndex: 10,
  position: 'relative',

  [theme.breakpoints.up('md')]: {
    padding: '75px 90px 25px 90px',
  },
}));

export const TabsContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
}));

export const GreyLineTabs = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '3px',
  backgroundColor: theme.palette.landing.pearlGray,
  zIndex: 0,
}));

export const ContentContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',

  [theme.breakpoints.up('md')]: {
    marginTop: '24px',
  },

  [theme.breakpoints.up('xl')]: {
    marginTop: '28px',
  },
}));

export const CustomTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTab-root': {
    color: theme.palette.common.black,
    fontFamily: 'Degular',
    zIndex: 2,
    fontSize: '16px',
    fontWeight: 600,
    margin: 0,

    [theme.breakpoints.up('md')]: {
      fontSize: '25px',
    },
  },

  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.landing.forestGreen,
    height: '3px',
    zIndex: 1,
  },
}));
