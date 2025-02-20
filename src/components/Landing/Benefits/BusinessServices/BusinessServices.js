import Image from 'next/image';
import { perform3 } from 'src/sections/home/constants';
import Chip from '../../Chip/Chip';
import Item from '../../Item/Item';
import {
  Container,
  ItemContainer,
  ImageContainer,
  ContentContainer,
  Title,
  Description,
} from './styles';

const BusinessServices = () => {
  return (
    <Container>
      <ImageContainer>
        <Image sizes="100%" src={perform3} alt="image" fill style={{ objectFit: 'cover' }} />
      </ImageContainer>

      <ContentContainer>
        <Chip>ADD ON</Chip>
        <Title>Business Services</Title>
        <Description>
          Looking for more hands-on support to set up and customize the perfect Workspace for your
          teams? Our Professional Services Team is here to help!
        </Description>
        <ItemContainer>
          <Item>Get a workspace setup for your business needs.</Item>
          <Item>Access to specialists for hands-on support.</Item>
          <Item>Configurations designed for your coaching practice.</Item>
          <Item>Access to premium tools and features.</Item>
          <Item>A single point of contact for all your service needs.</Item>
          <Item>Valuable insights: Detailed reports and analytics.</Item>
        </ItemContainer>
      </ContentContainer>
    </Container>
  );
};

export default BusinessServices;
