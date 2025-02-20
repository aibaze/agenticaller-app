import MenuDesktop from './MenuDesktop/MenuDesktop';
import MenuMobile from './MenuMobile/MenuMobile';
import MenuExtended from './MenuExtended/MenuExtended';

const Menu = () => {
  return (
    <>
      <MenuMobile />
      <MenuDesktop />

      <MenuExtended />
    </>
  );
};

export default Menu;
