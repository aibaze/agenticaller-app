import PricingButton from '../PricingButton/PricingButton';
import { Container } from './styles';

const TogglePrice = ({ isMonthlyPrice, togglePrice }) => {
  return (
    <Container>
      <PricingButton type="dark" disabled={isMonthlyPrice} onClick={togglePrice}>
        Monthly
      </PricingButton>
      <PricingButton type="dark" disabled={!isMonthlyPrice} onClick={togglePrice}>
        Yearly
      </PricingButton>
    </Container>
  );
};

export default TogglePrice;
