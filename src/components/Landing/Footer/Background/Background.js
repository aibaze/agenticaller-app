import Image from 'next/image';
import { heroBackground } from 'src/sections/home/constants';
import { Container, ImageContainer } from './styles';

const Background = () => (
  <Container>
    <ImageContainer>
      <Image
        quality={20}
        src={heroBackground}
        alt="background image"
        width="1728"
        height="894"
        style={{
          objectFit: 'cover',
          filter: 'blur(5px)',
          opacity: 0.5,
          position: 'relative',
        }}
      />
    </ImageContainer>
  </Container>
);

export default Background;
