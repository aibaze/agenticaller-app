import Image from 'next/image';
import { Box } from '@mui/material';
import { Desktop, Description, Title, Container } from './styles';

const FavoritesDesktop = ({ sections }) => {
  return (
    <Desktop>
      {sections.map(({ title, description, image }, idx) => (
        <Container key={`section_${idx}`}>
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width * 0.7}
            height={image.height * 0.7}
          />
          <Box>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </Box>
        </Container>
      ))}
    </Desktop>
  );
};

export default FavoritesDesktop;
