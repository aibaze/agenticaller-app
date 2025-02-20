import TitleDivider from '../TitleDivider/TitleDivider';
import IntegrationsDesktop from './IntegrationsDesktop/IntegrationsDesktop';
import IntegrationsMobile from './IntegrationsMobile/IntegrationsMobile';
import { Container } from './styles';

const Integrations = () => {
  return (
    <Container>
      <TitleDivider
        label="INTEGRATIONS"
        title="When allwyse use embed tool, streamline integrations."
        subtitle="Check others integrations available or send us."
      />
      <IntegrationsDesktop />
      <IntegrationsMobile />
    </Container>
  );
};

export default Integrations;
