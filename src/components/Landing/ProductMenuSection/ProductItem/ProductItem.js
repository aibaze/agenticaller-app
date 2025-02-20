import { useRouter } from 'src/routes/hooks';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { getProductColorAndIcon } from '../data';
import { useHeaderMenuExtended } from '../../hooks/useHeaderMenuExtended';
import { Container, IconContainer, Title, Description } from './styles';

const ProductItem = ({ slug, title, description }) => {
  const theme = useTheme();
  const router = useRouter();
  const { setMenuExtended } = useHeaderMenuExtended();

  const iconStyle = {
    color: theme.palette.common.white,
    fontSize: { md: '40px', lg: '56px' },
    margin: { md: '10px', lg: '15px' },
  };

  const { icon, color } = getProductColorAndIcon(slug, theme, iconStyle);

  const handleClick = () => {
    router.push(`/product?product=${slug}`);
    setMenuExtended(0);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick();
    }
  };

  return (
    <Container onClick={handleClick} onKeyDown={handleKeyDown} role="button">
      <IconContainer color={color}>{icon}</IconContainer>
      <Box>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Box>
    </Container>
  );
};

export default ProductItem;
