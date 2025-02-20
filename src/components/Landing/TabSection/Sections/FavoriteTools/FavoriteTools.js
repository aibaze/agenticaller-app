import { useResponsive } from 'src/hooks/use-responsive';
import { tabsB } from '../../dataTabsB';
import { Container, Title } from './styles';
import FavoritesMobile from './FavoritesMobile/FavoritesMobile';
import FavoritesDesktop from './FavoritesDesktop/FavoritesDesktop';

const FavoriteTools = () => {
  const { title, titleMobile, sections } = tabsB[1];
  const smDown = useResponsive('down', 'md');

  return (
    <Container>
      <Title>{smDown ? titleMobile : title}</Title>
      <FavoritesDesktop sections={sections} />
      <FavoritesMobile sections={sections} />
    </Container>
  );
};

export default FavoriteTools;
