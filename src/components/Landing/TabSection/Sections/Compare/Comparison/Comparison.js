import Image from 'next/image';
import {
  Container,
  ImageContainer,
  FlexBox,
  TitleDesktop,
  TitleMobile,
  Text,
  SpanText,
} from './styles';

const Comparison = ({ page, comparisons }) => {
  if (!comparisons?.[page - 1]) return null;

  const {
    blocks,
    title: titleComparison,
    image: { src, alt },
  } = comparisons[page - 1];

  return (
    <Container>
      <FlexBox>
        <ImageContainer>
          <Image sizes="100%" fill={true} src={src} alt={alt} style={{ objectFit: 'cover' }} />
        </ImageContainer>

        <TitleMobile>{titleComparison}</TitleMobile>
      </FlexBox>
      <TitleDesktop>{titleComparison}</TitleDesktop>
      {blocks.map(({ title, text }, idx) => (
        <Text key={`block_${page}_${idx}`}>
          <SpanText>{title}</SpanText> {text}
        </Text>
      ))}
    </Container>
  );
};

export default Comparison;
