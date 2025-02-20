import { useTheme } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive';
import { tabsB } from '../../dataTabsB';
import Board from '../../Board/Board';
import { Container, Title, Description } from './styles';

const Commitment = () => {
  const theme = useTheme();
  const smDown = useResponsive('down', 'md');
  const { title, titleMobile, description, board } = tabsB[2];
  const { text: boardText, image } = board;

  return (
    <Container>
      <Title>{smDown ? titleMobile : title}</Title>
      <Description>{description}</Description>
      <Board text={boardText} image={image} backgroundColor={theme.palette.landing.lavenderMist} />
    </Container>
  );
};

export default Commitment;
