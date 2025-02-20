import Image from 'next/image';
import { menMessages, heartInCircle } from 'src/sections/home/constants';
import { Container, ImageBottomContainer, Text, ImageTopContainer, TextContainer } from './styles';

const SubmitSuccess = () => {
  return (
    <Container>
      <TextContainer>
        <Text>Thank you!</Text>
        <ImageTopContainer>
          <Image
            sizes="100%"
            src={heartInCircle}
            alt="heart in circle illustration"
            fill
            style={{ objectFit: 'cover' }}
          />
        </ImageTopContainer>
      </TextContainer>
      <ImageBottomContainer>
        <Image
          sizes="100%"
          src={menMessages}
          alt="men sending message illustration"
          fill
          style={{ objectFit: 'cover' }}
        />
      </ImageBottomContainer>
    </Container>
  );
};

export default SubmitSuccess;
