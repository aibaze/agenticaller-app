'use client';
import NavHeader from 'src/components/Landing/NavHeader/NavHeader';
import Footer from 'src/components/Landing/Footer/Footer';
import HeroProduct from 'src/components/Landing/HeroProduct/HeroProduct/HeroProduct';
import SubscribeSection from 'src/components/Landing/SubscribeSection/SubscribeSection';
import TabSectionA from 'src/components/Landing/TabSection/TabSectionA';
import TabSectionB from 'src/components/Landing/TabSection/TabSectionB';
import BackgroundTriangles from 'src/components/Landing/Backgrounds/BackgroundTriangles/BackgroundTriangles';
import { ProductContainer } from './styles';

const Product = () => {
  return (
    <ProductContainer>
      <NavHeader />

      <HeroProduct />

      <TabSectionA />

      <TabSectionB />

      <BackgroundTriangles />

      <SubscribeSection />

      <Footer />
    </ProductContainer>
  );
};

export default Product;
