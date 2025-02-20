import { useState } from 'react';
import TogglePrice from '../TogglePrice/TogglePrice';
import PricingDesktop from './PricingDesktop/PricingDesktop';
import PricingMobile from './PricingMobile/PricingMobile';

export const PricingCards = () => {
  const [isMonthlyPrice, setIsMonthlyPrice] = useState(true);
  const togglePrice = () => setIsMonthlyPrice((prev) => !prev);

  return (
    <>
      <TogglePrice isMonthlyPrice={isMonthlyPrice} togglePrice={togglePrice} />
      <PricingMobile isMonthlyPrice={isMonthlyPrice} />
      <PricingDesktop isMonthlyPrice={isMonthlyPrice} />
    </>
  );
};
