import { Container, Headline, Title, Description } from './styles';

const TitleAndDescription = ({ heroText }) => {
  const { headline, title, description } = heroText;

  return (
    <Container>
      <Headline>{headline}</Headline>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  );
};

export default TitleAndDescription;
