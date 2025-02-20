import PricingCard from '../PricingCard/PricingCard';
import { Container } from './styles';
import { baseInfo, proInfo, teamInfo } from '../../pricingInfoData';

const PricingDesktop = ({ isMonthlyPrice }) => {
  return (
    <Container>
      <PricingCard isMonthlyPrice={isMonthlyPrice} info={baseInfo} />
      <PricingCard isMonthlyPrice={isMonthlyPrice} info={proInfo} />
      <PricingCard isMonthlyPrice={isMonthlyPrice} info={teamInfo} />
    </Container>
  );
};

export default PricingDesktop;
