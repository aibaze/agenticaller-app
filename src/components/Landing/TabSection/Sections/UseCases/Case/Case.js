import Image from 'next/image';
import { Box } from '@mui/material';
import { paths } from 'src/routes/paths';
import RoundedButton from 'src/components/Landing/RoundedButton/RoundedButton';
import { Container, ImageContainer, BlackLine, Title, Text, ButtonContainer } from './styles';

const Case = ({ currentCase, idx }) => {
  const {
    title: boardTitle,
    text: boardText,
    image: { src, alt },
  } = currentCase;

  const BookDemoButton = (
    <RoundedButton maxWidth={252} href={paths.auth.jwt.register} fill="black">
      Book a Demo
    </RoundedButton>
  );
  return (
    <Container idx={idx}>
      <ImageContainer>
        <Image
          sizes="100%"
          src={src}
          fill={true}
          alt={alt}
          style={{ zIndex: 10, objectFit: 'cover' }}
        />
      </ImageContainer>
      <BlackLine />

      <Box>
        <Title>{boardTitle}</Title>

        {boardText.map((text, idx) => (
          <Text key={`text_${idx}`}>{text}</Text>
        ))}
      </Box>
      <ButtonContainer>{BookDemoButton}</ButtonContainer>
    </Container>
  );
};

export default Case;
