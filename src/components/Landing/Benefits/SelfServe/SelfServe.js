import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { perform1 } from 'src/sections/home/constants';
import Chip from '../../Chip/Chip';
import Item from '../../Item/Item';
import {
  GridContainer,
  ItemContainer,
  ImageContainer,
  ContentContainer,
  Title,
  Description,
  Items,
} from './styles';

const SelfServe = () => {
  const theme = useTheme();

  return (
    <GridContainer>
      <ItemContainer>
        <ImageContainer>
          <Image sizes="100%" src={perform1} alt="image" fill style={{ objectFit: 'cover' }} />
        </ImageContainer>
        <ContentContainer>
          <Chip>INCLUDED</Chip>

          <Title>Self-Serve</Title>
          <Description>
            Set up the perfect Workspace and transition your team into Allwyse with resources that
            make it easy to onboard at your own pace.
          </Description>
          <Items>
            <Item>Easy Setup: Create and customize quickly.</Item>
            <Item>Flexible Onboarding: Transition at your own pace.</Item>
            <Item>Boosted Productivity: Maximize efficiency from day one.</Item>
            <Item>Enhanced Collaboration: Streamline communication effortlessly.</Item>
          </Items>
        </ContentContainer>
      </ItemContainer>
    </GridContainer>
  );
};

export default SelfServe;
