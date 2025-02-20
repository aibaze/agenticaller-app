import { useState } from 'react';
import { Tab } from '@mui/material';
import { proInfo, teamInfo, baseInfo } from '../../pricingInfoData';
import PricingCard from '../PricingCard/PricingCard';
import { Container, TabContainer, CardContainer, TabUnderline, CustomTabs } from './styles';

const PricingMobile = ({ isMonthlyPrice }) => {
  const [value, setValue] = useState(1);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <TabContainer>
        <CustomTabs variant="fullWidth" value={value} onChange={handleChange} centered>
          <Tab label="Base" />
          <Tab label="Pro" />
          <Tab label="Team" />
        </CustomTabs>
        <TabUnderline />
      </TabContainer>

      <CardContainer>
        {value === 0 && <PricingCard isMonthlyPrice={isMonthlyPrice} info={baseInfo} isMobile />}
        {value === 1 && <PricingCard isMonthlyPrice={isMonthlyPrice} info={proInfo} isMobile />}
        {value === 2 && <PricingCard isMonthlyPrice={isMonthlyPrice} info={teamInfo} isMobile />}
      </CardContainer>
    </Container>
  );
};

export default PricingMobile;
