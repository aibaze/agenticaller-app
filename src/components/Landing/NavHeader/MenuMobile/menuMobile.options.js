import { paths } from 'src/routes/paths';
import { menuExtendedOption } from '../../hooks/useHeaderMenuExtended';

const optionsMobile = [
  { name: 'Help Center', menuExtended: menuExtendedOption.HELPER_SECTION },
  { name: 'Pricing', link: `${paths.home.root}#pricing` },
  {
    name: 'Grab free account',
    link: paths.auth.jwt.register,
    onClick: () => {},
  },
];

export const menuHeaderOptionsMobile = {
  home: [
    {
      name: 'Product',
      link: paths.product.root,
    },
    ...optionsMobile,
  ],
  product: [
    {
      name: 'Home',
      link: paths.home.root,
    },
    ...optionsMobile,
  ],
};
