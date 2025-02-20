import { East } from '@mui/icons-material/';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import Chip from 'src/components/Landing/Chip/Chip';
import Item from 'src/components/Landing/Item/Item';
import {
  Container,
  ImageContainer,
  TextContainer,
  Title,
  ItemsContainer,
  LinkContainer,
  LinkLabel,
} from './styles';

const Board3 = ({ board }) => {
  const theme = useTheme();
  const { header, title, list, link, image } = board;
  return (
    <Container>
      <ImageContainer width={image.width} height={image.height}>
        <Image sizes="100%" src={image.src} alt={image.alt} fill style={{ objectFit: 'cover' }} />
      </ImageContainer>

      <TextContainer>
        <Chip>{header}</Chip>
        <Title>{title}</Title>
        <ItemsContainer>
          {list.map((text, idx) => (
            <Item
              tickColor={theme.palette.common.white}
              backgroundColor={theme.palette.landing.forestGreen}
              key={`item_${idx}`}
            >
              {text}
            </Item>
          ))}
          <LinkContainer>
            <East />
            <LinkLabel>{link.label}</LinkLabel>
          </LinkContainer>
        </ItemsContainer>
      </TextContainer>
    </Container>
  );
};
export default Board3;
