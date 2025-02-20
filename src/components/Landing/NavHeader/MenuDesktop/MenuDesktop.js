import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import RoundedButton from '../../RoundedButton/RoundedButton';
import { logoAllwyse } from 'src/sections/home/constants';
import { paths } from 'src/routes/paths';
import { menuHeaderOptionsDesktop } from './menuDesktop.options';
import { Container, Content, Flex, LogoContainer, Items, Buttons } from './styles';
import MenuDesktopItem from './MenuDesktopItem/MenuDesktopItem';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const MenuDesktop = () => {
  const theme = useTheme();

  return (
    <Container>
      <Content>
        <Flex>
          <LogoContainer onClick={scrollToTop}>
            <Image
              sizes="100%"
              src={logoAllwyse}
              fill
              style={{ objectFit: 'cover' }}
              alt="allwyse logo"
            />
          </LogoContainer>

          <Items>
            {menuHeaderOptionsDesktop.map((item, idx) => (
              <MenuDesktopItem key={`menu-desktop-${idx}`} item={item} />
            ))}
          </Items>

          <Buttons>
            <MenuDesktopItem
              key={`menu-desktop-login`}
              item={{ name: 'Log in', link: paths.auth.jwt.login }}
            />
            <RoundedButton size="small" onClick={() => {}} href={paths.auth.jwt.register}>
              Grab Free Account
            </RoundedButton>
          </Buttons>
        </Flex>
      </Content>
    </Container>
  );
};

export default MenuDesktop;
