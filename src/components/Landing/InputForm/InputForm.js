import { Container, Textarea, Input } from './styles';
import PropTypes from 'prop-types';

const InputForm = ({
  icon,
  onChange,
  value,
  name,
  type,
  placeholder,
  required,
  isError,
  isTextarea,
}) => {
  return (
    <Container isTextarea={isTextarea}>
      {icon}

      {isTextarea ? (
        <Textarea
          isError={isError}
          onChange={onChange}
          value={value}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          maxLength="200"
          rows="3"
        />
      ) : (
        <Input
          isError={isError}
          onChange={onChange}
          value={value}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
        />
      )}
    </Container>
  );
};

export default InputForm;

InputForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['email', 'text']).isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  isError: PropTypes.bool,
  icon: PropTypes.element,
  isTextarea: PropTypes.bool,
};
