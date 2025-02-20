import Image from 'next/image';
import { paths } from 'src/routes/paths';
import RoundedButton from '../../RoundedButton/RoundedButton';
import { Container, Text, OnMobile } from './styles';

const Board = ({ text, backgroundColor, image: { src, width, height, alt } }) => {
  const BookDemoButton = (
    <RoundedButton minWidth={200} maxWidth={252} href={paths.auth.jwt.register} fill="black">
      Book a Demo
    </RoundedButton>
  );

  return (
    <Container backgroundColor={backgroundColor}>
      <Image src={src} width={width * 0.6} height={height * 0.6} alt={alt} />
      <Text>{text}</Text>
      <OnMobile>{BookDemoButton}</OnMobile>
    </Container>
  );
};

export default Board;
