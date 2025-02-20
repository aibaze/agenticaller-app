import Image from 'next/image';
import { useHelpCenter } from '../hooks/useHelpCenter';
import RoundedButton from 'src/components/Landing/RoundedButton/RoundedButton';
import { womenAsk } from 'src/sections/home/constants';
import { Container, Content, ImageContainer, Text } from './styles';

const HelpCenterIntroduction = () => {
  const { setStep } = useHelpCenter();

  return (
    <Container>
      <Content>
        <ImageContainer>
          <Image
            sizes="100%"
            src={womenAsk}
            fill
            style={{ objectFit: 'cover' }}
            alt="women ask illustration"
          />
        </ImageContainer>
        <Text>
          Whether you need guidance on how to utilize our tools, have questions about your account,
          or encounter any challenges, our dedicated support team is ready to help.
        </Text>
        <RoundedButton fill="violet" onClick={() => setStep(2)}>
          Support Team
        </RoundedButton>
      </Content>
    </Container>
  );
};

export default HelpCenterIntroduction;
