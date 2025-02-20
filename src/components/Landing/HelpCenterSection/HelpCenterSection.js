import { useHelpCenter } from '../hooks/useHelpCenter';
import HelpCenterIntroduction from '../HelpCenterIntroduction/HelpCenterIntroduction';
import WindowContainer from 'src/components/Landing/WindowContainer/WindowContainer';
import HelpCenterCategory from '../HelpCenterCategory/HelpCenterCategory';
import HelpCenterForm from '../HelpCenterForm/HelpCenterForm';
import SubmitSuccess from 'src/components/Landing/SubmitSuccess/SubmitSuccess';
import {
  useHeaderMenuExtended,
  menuExtendedOption,
} from 'src/components/Landing/hooks/useHeaderMenuExtended';
import BackButton from './BackButton/BackButton';
import { Container, Text } from './styles';

const HelpCenterSection = () => {
  const { step } = useHelpCenter();
  const { setMenuExtended } = useHeaderMenuExtended();

  const handleWindowClose = () => {
    setMenuExtended(menuExtendedOption.CLOSE);
  };

  const label = {
    1: null,
    2: '*Please select one option',
    3: '*Please add your contact email',
    4: "We'll connect you with one of our friendly experts as soon as possible",
  };

  const stepComponent = {
    1: <HelpCenterIntroduction />,
    2: <HelpCenterCategory />,
    3: <HelpCenterForm />,
    4: <SubmitSuccess />,
  };

  return (
    <Container>
      <BackButton />
      <WindowContainer
        windowClose={handleWindowClose}
        titleBar="allwyse.io-support"
        maxWidth={1050}
      >
        {stepComponent[step]}
      </WindowContainer>
      <Text>{label[step]}</Text>
    </Container>
  );
};
export default HelpCenterSection;
