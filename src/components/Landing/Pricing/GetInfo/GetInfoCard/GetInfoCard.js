import Image from 'next/image';
import { Container, ImageContainer, FlexCenter, Title, Subtitle, CustomLink } from './styles';

const GetInfoCard = ({ image, title, subtitle, link }) => {
  return (
    <Container>
      <FlexCenter>
        <ImageContainer width={image.width} height={image.height}>
          <Image
            sizes="100%"
            src={image.src}
            alt={image.alt}
            fill={true}
            style={{ objectFit: 'cover' }}
          />
        </ImageContainer>
      </FlexCenter>

      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <CustomLink target="_blank" href={link.href}>
        {link.label}
      </CustomLink>
    </Container>
  );
};

export default GetInfoCard;
