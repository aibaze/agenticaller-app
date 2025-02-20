import { ListTick } from '../ListTick/ListTick';
import { Container, Text } from './styles';

const Item = ({ children, tickColor, backgroundColor }) => {
  return (
    <Container>
      <ListTick tickColor={tickColor} backgroundColor={backgroundColor} />
      <Text>{children}</Text>
    </Container>
  );
};

export default Item;
