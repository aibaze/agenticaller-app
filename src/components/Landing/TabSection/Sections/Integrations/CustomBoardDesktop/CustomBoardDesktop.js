import { Container } from './styles';
import Board2 from './Board2/Board2';
import Board3 from './Board3/Board3';

const CustomBoardDesktop = ({ board2, board3 }) => {
  return (
    <>
      <Container>
        <Board3 board={board3} />
        <Board2 board={board2} />
      </Container>
    </>
  );
};

export default CustomBoardDesktop;
