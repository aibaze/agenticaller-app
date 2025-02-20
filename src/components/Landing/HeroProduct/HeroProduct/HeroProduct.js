import { Box } from '@mui/material';
import { heroText, productItems } from '../data';
import Image from 'next/image';
import NavigationButtons from '../NavigationButtons/NavigationButtons';
import ItemSelector from '../ItemSelector/ItemSelector';
import VerticalSteps from '../VerticalSteps/VerticalSteps';
import useProductNavigation from '../../hooks/useProductNavigation';
import {
  BackgroundColorToImage,
  ImageContainer,
  StepsImageContainer,
  NavButtonsContainer,
  HeroBackground,
  HeroContainer,
  TitleAndButtons,
} from './styles';
import TitleAndDescription from './TitleAndDescription/TitleAndDescription';

const HeroProduct = () => {
  const {
    itemSelected,
    setItemSelected,
    handlePreviousItem,
    handleNextItem,
    isFirstItem,
    isLastItem,
  } = useProductNavigation();

  return (
    <Box>
      <HeroBackground>
        <HeroContainer>
          <TitleAndButtons>
            <TitleAndDescription heroText={heroText} />
            <NavButtonsContainer>
              <NavigationButtons
                handlePreviousItem={handlePreviousItem}
                handleNextItem={handleNextItem}
                isFirstItem={isFirstItem}
                isLastItem={isLastItem}
              />
            </NavButtonsContainer>
          </TitleAndButtons>

          <ItemSelector
            items={productItems}
            itemSelected={itemSelected}
            setItemSelected={setItemSelected}
          />
        </HeroContainer>
      </HeroBackground>

      <StepsImageContainer>
        <VerticalSteps productItems={productItems} itemSelected={itemSelected} />

        <ImageContainer
          width={productItems[itemSelected]?.image.width}
          height={productItems[itemSelected]?.image.height}
        >
          <Image
            sizes="100%"
            src={productItems[itemSelected]?.image.src}
            alt={productItems[itemSelected]?.image.alt}
            fill={true}
            style={{ objectFit: 'cover' }}
          />
        </ImageContainer>
        {/* Add background color to Image on mobile */}
        <BackgroundColorToImage />
      </StepsImageContainer>
    </Box>
  );
};

export default HeroProduct;
