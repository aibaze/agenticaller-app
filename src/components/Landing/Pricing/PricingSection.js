import { Box } from '@mui/material';
import TitleDivider from '../TitleDivider/TitleDivider';
import { womenBulb } from 'src/sections/home/constants';
import { GetInfoSection } from './GetInfo/GetInfo';
import { PricingCards } from './PricingCards/PricingCards';

const Pricing = () => {
  return (
    <Box id="pricing" sx={{ marginBottom: '40px' }}>
      <TitleDivider
        image={{
          src: womenBulb,
          alt: 'girls with bulb illustration',
          width: 206,
          height: 205,
        }}
        label="PRICING"
        title="Transparent, Value-Driven, and Flexible Pricing for your coaching-busines."
        subtitle="The right plan for you for free. No surprise fees. 
        No credit card required."
      />

      <PricingCards />

      <GetInfoSection />
    </Box>
  );
};

export default Pricing;
