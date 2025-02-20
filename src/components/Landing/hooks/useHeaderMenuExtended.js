import { createContext, useContext, useState } from 'react';

export const menuExtendedOption = {
  CLOSED: 'closed',
  PRODUCT_MENU: 'product-menu',
  HELPER_SECTION: 'helper-section',
};

const MenuExtendedContext = createContext(null);
MenuExtendedContext.displayName = 'MenuExtendedContext';

const MenuExtendedProvider = ({ children }) => {
  const [menuExtended, setMenuExtended] = useState(0);

  const value = {
    menuExtended,
    setMenuExtended,
  };

  return <MenuExtendedContext.Provider value={value}>{children}</MenuExtendedContext.Provider>;
};

export const useHeaderMenuExtended = () => {
  const context = useContext(MenuExtendedContext);
  if (!context) throw new Error(`useHeaderMenuExtended must be used within MenuExtendedContext`);

  return context;
};

export default MenuExtendedProvider;
