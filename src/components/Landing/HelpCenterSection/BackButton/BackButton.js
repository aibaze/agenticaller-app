import { useHelpCenter } from '../../hooks/useHelpCenter';
import { useHeaderMenuExtended } from 'src/components/Landing/hooks/useHeaderMenuExtended';
import { Container, Text, ArrowBackIcon } from './styles';

const BackButton = () => {
  const { step, setStep } = useHelpCenter();
  const { setMenuExtended } = useHeaderMenuExtended();

  const textButton = {
    1: 'Back',
    2: 'Back',
    3: 'Back',
    4: 'Back Home',
  };

  const goTo = {
    1: () => setMenuExtended(false),
    2: () => setStep((prev) => prev - 1),
    3: () => setStep((prev) => prev - 1),
    4: () => setMenuExtended(false),
  };

  return (
    <Container onClick={goTo[step]}>
      <Text>
        <ArrowBackIcon />
        {textButton[step]}
      </Text>
    </Container>
  );
};

export default BackButton;
