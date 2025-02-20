import { Container, TitleText } from './styles';

const Title = ({ title }) => {
  return (
    <Container>
      <TitleText>{title}</TitleText>
    </Container>
  );
};

export default Title;
