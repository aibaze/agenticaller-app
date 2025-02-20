import { menuExtendedOption } from '../../hooks/useHeaderMenuExtended';
import { paths } from 'src/routes/paths';

export const menuHeaderOptionsDesktop = [
  { name: 'Home', link: `${paths.home.root}#home` },
  {
    name: 'Product',
    menuExtended: menuExtendedOption.PRODUCT_MENU,
  },
  { name: 'Help Center', menuExtended: menuExtendedOption.HELPER_SECTION },
  { name: 'Pricing', link: `${paths.home.root}#pricing` },
];
