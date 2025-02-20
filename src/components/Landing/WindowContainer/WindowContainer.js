import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { ColorCircle, Container, TopPart, ColorCircleContainer, CloseIcon, Text } from './styles';

const WindowContainer = ({ children, titleBar, windowClose, maxWidth }) => {
  const theme = useTheme();

  return (
    <Container maxWidth={maxWidth}>
      <TopPart>
        <ColorCircleContainer>
          <ColorCircle color={theme.palette.landing.coralBlush} />
          <ColorCircle color={theme.palette.landing.goldenrodGlow} />
          <ColorCircle color={theme.palette.landing.mintLeaf} />
        </ColorCircleContainer>

        <Text>{titleBar}</Text>
        {windowClose && <CloseIcon onClick={windowClose} />}
      </TopPart>
      {children}
    </Container>
  );
};

export default WindowContainer;

WindowContainer.propTypes = {
  children: PropTypes.node.isRequired,
  titleBar: PropTypes.string.isRequired,
  windowClose: PropTypes.func,
  maxWidth: PropTypes.number,
};
