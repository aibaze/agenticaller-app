import { useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { logoAllwyse, manWithBulbs } from 'src/sections/home/constants';
import useClickOutsideAndEscape from '../../hooks/useClickOutsideAndEscape';
import { menuHeaderOptionsMobile } from './menuMobile.options';
import MenuMobileItem from './MenuMobileItem/MenuMobileItem';
import {
  Container,
  Logo,
  CloseIcon,
  MenuIcon,
  ContainerOptions,
  FloatingImage,
  ContainerImage,
} from './styles';

const MenuMobile = () => {
  const theme = useTheme();
  const menuRef = useRef(null);
  const [isMenuMobileOpened, setIsMenuMobileOpened] = useState(false);
  const isScreenLowHeight = useMediaQuery('(max-height: 650px)');
  const pathname = usePathname().replace(/^\/|\/$/g, '');

  // if user clicks outside menu or press ESC key, close MenuExtended
  useClickOutsideAndEscape(menuRef, () => setIsMenuMobileOpened(false));

  return (
    <Container ref={menuRef}>
      <Logo>
        <Link href="#home">
          <Image
            sizes="100%"
            src={logoAllwyse}
            fill
            style={{ objectFit: 'cover' }}
            alt="allwyse logo"
          />
        </Link>
      </Logo>

      {isMenuMobileOpened ? (
        <CloseIcon onClick={() => setIsMenuMobileOpened(false)} />
      ) : (
        <MenuIcon onClick={() => setIsMenuMobileOpened(true)} />
      )}

      {isMenuMobileOpened && (
        <>
          <ContainerOptions>
            {menuHeaderOptionsMobile[pathname].map((item, idx) => (
              <MenuMobileItem
                setIsMenuMobileOpened={setIsMenuMobileOpened}
                key={`menu-mobile-${idx}`}
                item={item}
              />
            ))}
            {isScreenLowHeight ? null : (
              <FloatingImage>
                <ContainerImage>
                  <Image
                    sizes="100%"
                    src={manWithBulbs}
                    style={{ objectFit: 'cover' }}
                    alt="men in a boat illustration"
                    fill
                  />
                </ContainerImage>
              </FloatingImage>
            )}
          </ContainerOptions>
        </>
      )}
    </Container>
  );
};

export default MenuMobile;
