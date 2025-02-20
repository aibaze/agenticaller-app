import RoundedButton from 'src/components/Landing/RoundedButton/RoundedButton';
import Image from 'next/image';
import { manWithBulbs } from 'src/sections/home/constants';
import { paths } from 'src/routes/paths';
import { productItems } from './data';
import ProductItem from './ProductItem/ProductItem';
import {
  Container,
  LeftColumn,
  RightContent,
  ImageContainer,
  Text,
  ItemsContainer,
} from './styles';

const ProductMenuSection = () => {
  return (
    <>
      <Container>
        <LeftColumn>
          <ImageContainer>
            <Image
              sizes="100%"
              src={manWithBulbs}
              style={{ objectFit: 'cover' }}
              alt="men in a boat illustration"
              fill
            />
          </ImageContainer>
          <Text>The right path for Improve your workflow, a complete stack of solutions.</Text>
          <RoundedButton href={paths.product.root} minWidth={200} fill="green">
            Product
          </RoundedButton>
        </LeftColumn>
        <RightContent>
          <ItemsContainer>
            {productItems.map(({ title, description, slug }, idx) => (
              <ProductItem
                key={`${idx}_product-item`}
                title={title}
                description={description}
                slug={slug}
              />
            ))}
          </ItemsContainer>
        </RightContent>
      </Container>
    </>
  );
};

export default ProductMenuSection;
