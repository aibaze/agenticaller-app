import BackgroundTwoColor from 'src/components/Landing/Backgrounds/BackgroundTwoColors/BackgroundTwoColors';
import { Container, Title, Text } from './styles';

const CustomBoardMobile = ({ board }) => {
  const { title, textMobile } = board;

  return (
    <Container>
      <Title>{title}</Title>
      <BackgroundTwoColor />
      <Text>{textMobile}</Text>
    </Container>
  );
};

export default CustomBoardMobile;
