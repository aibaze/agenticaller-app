import CircleButton from '../CircleButton/CircleButton';
import { Container } from './styles';

const NavigationButtons = ({ handlePreviousItem, handleNextItem, isFirstItem, isLastItem }) => (
  <Container>
    <CircleButton disabled={isFirstItem} onClick={handlePreviousItem} isBack />
    <CircleButton disabled={isLastItem} onClick={handleNextItem} />
  </Container>
);

export default NavigationButtons;
