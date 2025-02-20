import Image from 'next/image';
import { perform2 } from 'src/sections/home/constants';
import Chip from '../../Chip/Chip';
import Item from '../../Item/Item';
import {
  Container,
  ItemContainer,
  ImageContainer,
  ContentContainer,
  Title,
  Description,
  Items,
} from './styles';

const Guided = () => {
  return (
    <Container>
      <ItemContainer>
        <ImageContainer>
          <Image sizes="100%" src={perform2} alt="image" fill style={{ objectFit: 'cover' }} />
        </ImageContainer>

        <ContentContainer>
          <Chip>INCLUDED</Chip>

          <Title>Guided</Title>
          <Description>
            Get one-on-one support from our Customer Success Team to guide you through the
            onboarding process.
          </Description>
          <Items>
            <Item>Step-by-step coaching for setup and Workspace recommendations</Item>
            <Item>Access to a SME to advise on custom solutions</Item>
            <Item>Best practices from thousands of other Workspaces</Item>
            <Item>Access to everything in our self-serve option</Item>
          </Items>
        </ContentContainer>
      </ItemContainer>
    </Container>
  );
};

export default Guided;
