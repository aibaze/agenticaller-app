import { Container, Text } from './styles';
import { ListTick } from 'src/components/Landing/ListTick/ListTick';

const Item = ({ children }) => {
  return (
    <Container>
      <ListTick />
      <Text>{children}</Text>
    </Container>
  );
};

export default Item;
