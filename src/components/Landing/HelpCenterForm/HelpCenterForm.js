import { useTheme } from '@mui/material/styles';
import { useHelpCenter } from '../hooks/useHelpCenter';
import RoundedButton from 'src/components/Landing/RoundedButton/RoundedButton';
import InputForm from '../InputForm/InputForm';
import { Container, Title, PersonIcon } from './styles';

const HelpCenterForm = () => {
  const {
    email,
    setEmail,
    description,
    setDescription,
    handleSubmitHelpCenter,
    isLoading,
    isError,
  } = useHelpCenter();
  const theme = useTheme();

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleChangeDescription = ({ target }) => {
    setDescription(target.value);
  };

  return (
    <Container>
      <Title>How can we help you?</Title>

      <InputForm
        onChange={handleChangeEmail}
        value={email}
        name="email"
        type="email"
        placeholder="Example@gmail.com"
        required
        icon={<PersonIcon />}
        isError={isError}
      />

      <InputForm
        onChange={handleChangeDescription}
        value={description}
        name="description"
        type="text"
        placeholder="Description"
        required
        isError={isError}
        isTextarea
      />

      <RoundedButton
        fill="green"
        width={150}
        type="submit"
        isBold={true}
        disabled={isLoading}
        onClick={handleSubmitHelpCenter}
        isLoading={isLoading}
        minWidth={188}
      >
        Send
      </RoundedButton>
    </Container>
  );
};

export default HelpCenterForm;
