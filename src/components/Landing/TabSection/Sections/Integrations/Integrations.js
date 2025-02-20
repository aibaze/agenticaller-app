import { useResponsive } from 'src/hooks/use-responsive';
import { useTheme } from '@mui/material/styles';
import { tabsB } from '../../dataTabsB';
import Board from '../../Board/Board';
import { Container, Title, Description } from './styles';
import CustomBoardMobile from './CustomBoardMobile/CustomBoardMobile';
import CustomBoardDesktop from './CustomBoardDesktop/CustomBoardDesktop';

const Integrations = () => {
  const theme = useTheme();
  const isMobile = useResponsive('down', 'md');
  const { title, description, board1, board2, board3 } = tabsB[0];
  const { textDesktop: boardTextDesktop, textMobile: boardTextMobile, image } = board1;

  return (
    <Container>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Board
        text={isMobile ? boardTextMobile : boardTextDesktop}
        image={image}
        backgroundColor={theme.palette.landing.lavenderMist}
      />
      <CustomBoardDesktop board2={board2} board3={board3} />
      <CustomBoardMobile board={board3} />
    </Container>
  );
};

export default Integrations;
