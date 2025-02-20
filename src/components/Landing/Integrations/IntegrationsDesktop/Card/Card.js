import Image from 'next/image';
import { Container, ImageContainer, Text, CustomLink } from './styles';

const Card = ({ image, link, text, id }) => {
  return (
    <Container id={id}>
      <ImageContainer width={image.width} height={image.height}>
        <Image
          sizes="100%"
          src={image.src}
          alt={image.alt}
          fill={true}
          style={{ objectFit: 'cover' }}
        />
      </ImageContainer>
      <Text>{text}</Text>
      <CustomLink href={link.href}>{link.label}</CustomLink>
    </Container>
  );
};

export default Card;
