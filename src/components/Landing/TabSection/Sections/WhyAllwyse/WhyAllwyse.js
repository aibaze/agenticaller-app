import { useTheme } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';
import Board from '../../Board/Board';
import { tabsA } from '../../dataTabsA';
import { Container, Title, Description } from './styles';

const WhyAllwyse = () => {
  const theme = useTheme();
  const isMobile = useResponsive('down', 'md');
  const { title, description, board } = tabsA[0];
  const { textDesktop: boardTextDesktop, textMobile: boardTextMobile, image } = board;

  return (
    <Container>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Board
        image={image}
        text={isMobile ? boardTextMobile : boardTextDesktop}
        backgroundColor={theme.palette.landing.mintIce}
      />
    </Container>
  );
};

export default WhyAllwyse;
