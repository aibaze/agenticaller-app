import { useState } from 'react';
import { Box, Tab } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';
import { Container, TabsContainer, GreyLineTabs, ContentContainer, CustomTabs } from './styles';

const TabSection = ({ labels, contents, tabSection }) => {
  const [tab, setTab] = useState(0);
  const smDown = useResponsive('down', 'lg');

  const handleTabChange = (e, newTab) => {
    setTab(newTab);
  };

  return (
    <Container>
      <TabsContainer>
        <CustomTabs variant="fullWidth" value={tab} onChange={handleTabChange} centered>
          {labels.map(({ label, labelMobile }, idx) => (
            <Tab label={smDown && labelMobile ? labelMobile : label} key={`tabs_${idx}`} />
          ))}
        </CustomTabs>
        <GreyLineTabs />
      </TabsContainer>

      <ContentContainer>
        {contents.map(
          (_, idx) => tab === idx && <Box key={`contentTab_${idx}`}>{contents[idx]}</Box>
        )}
      </ContentContainer>
    </Container>
  );
};

export default TabSection;
