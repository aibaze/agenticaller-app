import PropTypes from 'prop-types';
import { Container, Label, Title, BlackLineDivider, Subtitle } from './styles';

const MultiTextLayout = ({ label, title, subtitle }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Title variant="h2">{title}</Title>
      <BlackLineDivider />
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  );
};

MultiTextLayout.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default MultiTextLayout;
