import { paths } from 'src/routes/paths';
import { monthlyPrice, yearlyPrice } from '../../pricingInfoData';
import Item from '../Item/Item';
import PricingLink from '../PricingLink/PricingLink';
import {
  Container,
  MostPopular,
  PriceContainer,
  Price,
  MonthlyYear,
  PlanType,
  Description,
  ItemsContainer,
} from './styles';

const PricingCard = ({ info, isMonthlyPrice, isMobile }) => {
  const { mostPopular, fixedPrice, planType, description, items, buttonLabel } = info;

  return (
    <Container mostPopular={mostPopular} isMobile={isMobile}>
      {mostPopular && <MostPopular>{mostPopular}</MostPopular>}
      <PriceContainer mostPopular={mostPopular} isMobile={isMobile}>
        <Price>${fixedPrice ? fixedPrice : isMonthlyPrice ? monthlyPrice : yearlyPrice}</Price>
        <MonthlyYear>{isMonthlyPrice ? '/month' : '/year'}</MonthlyYear>
      </PriceContainer>
      <PlanType>{planType}</PlanType>
      <Description>{description}</Description>

      <ItemsContainer>
        {items.map((item, idx) => (
          <Item key={`item_${planType}_${idx}`}>{item}</Item>
        ))}
      </ItemsContainer>

      <PricingLink href={paths.auth.jwt.register} type={mostPopular ? 'dark' : 'light'}>
        {buttonLabel}
      </PricingLink>
    </Container>
  );
};

export default PricingCard;
