import { Container, Label, CustomCheckbox, TickContainer, Text } from './styles';
import PropTypes from 'prop-types';

const Tick = ({ color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="26" viewBox="0 0 32 26" fill="none">
    <path
      d="M30.797 4.1084L15.681 24.6216C15.3205 25.0999 14.7829 25.4133 14.1891 25.4914C13.5953 25.5695 12.995 25.4056 12.5231 25.0368L1.72876 16.4066C0.776225 15.6443 0.621987 14.2542 1.38426 13.3017C2.14652 12.3492 3.53664 12.1949 4.48917 12.9572L13.4903 20.1586L27.2416 1.49594C27.6926 0.819289 28.4789 0.445181 29.2883 0.522152C30.0978 0.599123 30.7995 1.11472 31.1148 1.86423C31.4302 2.61375 31.3081 3.4759 30.797 4.1084Z"
      fill={color}
    />
  </svg>
);

const CheckboxForm = ({ checked, onChange, label, color, minWidth }) => {
  return (
    <Container minWidth={minWidth}>
      <Label>
        <CustomCheckbox type="checkbox" checked={checked} onChange={onChange} />
        {checked && (
          <TickContainer>
            <Tick color={color} />
          </TickContainer>
        )}
        <Text>{label}</Text>
      </Label>
    </Container>
  );
};

export default CheckboxForm;

CheckboxForm.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  minWidth: PropTypes.number.isRequired,
};
