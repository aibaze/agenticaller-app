import Image from 'next/image';
import { Container, ImageContainer, Label, Title, Subtitle } from './styles';

const TitleDivider = ({ image, label, title, subtitle }) => {
  return (
    <Container>
      {image && (
        <ImageContainer width={image.width} height={image.height}>
          <Image sizes="100%" src={image.src} alt={image.alt} fill style={{ objectFit: 'cover' }} />
        </ImageContainer>
      )}
      {label && <Label>{label}</Label>}
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Container>
  );
};

export default TitleDivider;
