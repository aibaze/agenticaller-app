'use client';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import NavHeader from 'src/components/Landing/NavHeader/NavHeader';
import Hero from 'src/components/Landing/Hero/Hero';
import TwoColumnContent from 'src/components/Landing/TwoColumn/TwoColumContent';
import Benefits from 'src/components/Landing/Benefits/Benefits';
import Integrations from 'src/components/Landing/Integrations/Integrations';
import Pricing from 'src/components/Landing/Pricing/PricingSection';
import SubscribeSection from 'src/components/Landing/SubscribeSection/SubscribeSection';
import Footer from 'src/components/Landing/Footer/Footer';
import { navHeight } from 'src/components/Landing/NavHeader/NavHeader';
import { ScrollToSection } from 'src/components/Landing/ScrollToSection/ScrollToSection';

const Landing = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        marginTop: { xs: `${navHeight.mobile}px`, md: `${navHeight.desktop}px` },
        backgroundColor: theme.palette.common.white,
        minWidth: '310px',
      }}
    >
      <ScrollToSection />

      <NavHeader />

      <Hero />

      <TwoColumnContent />

      <Benefits />

      <Integrations />

      <Pricing />

      <SubscribeSection />

      <Footer />
    </Box>
  );
};

export default Landing;
