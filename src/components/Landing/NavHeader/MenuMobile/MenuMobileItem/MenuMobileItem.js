import Link from 'next/link';
import { Box } from '@mui/material';
import { useHeaderMenuExtended } from 'src/components/Landing/hooks/useHeaderMenuExtended';
import { ContentContainer, Text } from './styles';

const MenuMobileItem = ({ item, setIsMenuMobileOpened }) => {
  const { setMenuExtended } = useHeaderMenuExtended();

  const getInteractiveItem = () => {
    switch (true) {
      case Boolean(item.link):
        return (
          <Link
            href={item.link}
            onClick={() => {
              setIsMenuMobileOpened(false);
              if (item.onClick) {
                item.onClick();
              }
            }}
            style={{ textDecoration: 'none' }}
          >
            <Content />
          </Link>
        );

      case Boolean(item.menuExtended):
        return (
          <Box
            onClick={() => {
              setMenuExtended(item.menuExtended);
              setIsMenuMobileOpened(false);
            }}
          >
            <Content />
          </Box>
        );
      default:
        return <Content />;
    }
  };

  const Content = () => (
    <ContentContainer>
      <Text>{item.name}</Text>
    </ContentContainer>
  );

  return getInteractiveItem();
};

export default MenuMobileItem;
