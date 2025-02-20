import Link from 'next/link';
import { useHeaderMenuExtended } from 'src/components/Landing/hooks/useHeaderMenuExtended';
import { ContentWithArrow, Arrow, ContentText } from './styles';

const MenuDesktopItem = ({ item }) => {
  const { setMenuExtended } = useHeaderMenuExtended();

  const getInteractiveItem = () => {
    switch (true) {
      case Boolean(item.link):
        return (
          <Link href={item.link} style={{ textDecoration: 'none' }}>
            <Content />
          </Link>
        );

      case Boolean(item.menuExtended):
        return (
          <ContentWithArrow onClick={() => setMenuExtended(item.menuExtended)}>
            <Content />
            <Arrow />
          </ContentWithArrow>
        );
      default:
        return <Content />;
    }
  };

  const Content = () => <ContentText>{item.name}</ContentText>;

  return getInteractiveItem();
};

export default MenuDesktopItem;
