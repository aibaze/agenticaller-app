import { styled } from '@mui/material/styles';
import { navHeight } from 'src/components/Landing/NavHeader/NavHeader';
import { menuExtendedOption } from '../../hooks/useHeaderMenuExtended';

export const Container = styled('div')(({ theme, menuExtended }) => ({
  position: 'fixed',
  bottom: 0,
  width: '100%',
  height: `calc(100vh - ${navHeight.mobile}px)`,
  backgroundColor:
    menuExtended === menuExtendedOption.HELPER_SECTION ? theme.palette.common.white : 'none',
  boxShadow: '0px 4px 40px 0px #0000001A',
  zIndex: 50,
  overflowY: 'auto',
  boxSizing: 'content-box',

  [theme.breakpoints.up('md')]: {
    backgroundColor: theme.palette.common.white,
    height: `calc(100vh - ${navHeight.desktop}px)`,
  },
}));
