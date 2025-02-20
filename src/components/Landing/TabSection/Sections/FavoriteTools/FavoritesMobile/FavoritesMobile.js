import Image from 'next/image';
import CustomAccordion from 'src/components/Landing/CustomAccordion/CustomAccordion';
import { Container, SummaryText, SummaryContainer, DetailsText } from './styles';

const Summary = ({ image, title }) => {
  return (
    <SummaryContainer>
      <Image src={image.src} alt={image.alt} width={50} height={50} />
      <SummaryText>{title}</SummaryText>
    </SummaryContainer>
  );
};
const Details = ({ description }) => <DetailsText>{description}</DetailsText>;

const FavoritesMobile = ({ sections }) => (
  <Container>
    <CustomAccordion sections={sections} Summary={Summary} Details={Details} />
  </Container>
);

export default FavoritesMobile;
