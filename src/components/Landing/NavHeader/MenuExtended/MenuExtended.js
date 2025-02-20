import { useRef } from 'react';
import HelpCenterProvider from 'src/components/Landing/hooks/useHelpCenter';
import HelpCenterSection from 'src/components/Landing/HelpCenterSection/HelpCenterSection';
import ProductMenuSection from '../../ProductMenuSection/ProductMenuSection';
import { useHeaderMenuExtended, menuExtendedOption } from '../../hooks/useHeaderMenuExtended';
import useClickOutsideAndEscape from '../../hooks/useClickOutsideAndEscape';
import { Container } from './styles';

const MenuExtended = () => {
  const menuRef = useRef(null);
  const { menuExtended, setMenuExtended } = useHeaderMenuExtended();

  const getMenuExtendedSection = (section) => {
    switch (section) {
      case menuExtendedOption.PRODUCT_MENU:
        return <ProductMenuSection />;
      case menuExtendedOption.HELPER_SECTION:
        return (
          <HelpCenterProvider>
            <HelpCenterSection />
          </HelpCenterProvider>
        );
      default:
        return null;
    }
  };

  // if user clicks outside menu or press ESC key, close MenuExtended
  useClickOutsideAndEscape(menuRef, () => setMenuExtended(false));

  if (!menuExtended) return null;

  return (
    <Container menuExtended={menuExtended} ref={menuRef}>
      {getMenuExtendedSection(menuExtended)}
    </Container>
  );
};

export default MenuExtended;
