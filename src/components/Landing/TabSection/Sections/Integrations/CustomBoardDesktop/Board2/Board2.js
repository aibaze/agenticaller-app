import Image from 'next/image';
import { Container, Text } from './styles';

const Board2 = ({ board }) => {
  const { text: text2, image: image2 } = board;
  return (
    <Container width={image2.width} height={image2.height}>
      <Text dangerouslySetInnerHTML={{ __html: text2 }} />
      <Image
        src={image2.src}
        fill={true}
        sizes="100%"
        alt={image2.alt}
        style={{ objectFit: 'cover', transform: 'scale(1.09)' }}
      />
    </Container>
  );
};

export default Board2;
