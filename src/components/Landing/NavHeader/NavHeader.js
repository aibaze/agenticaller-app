import Menu from './Menu';
import MenuExtendedProvider from '../hooks/useHeaderMenuExtended';

export const navHeight = { mobile: 54, desktop: 75 };

const NavHeader = () => {
  return (
    <MenuExtendedProvider>
      <Menu />
    </MenuExtendedProvider>
  );
};

export default NavHeader;
