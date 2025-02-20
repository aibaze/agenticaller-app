import { useState } from 'react';
import SubmitSuccess from '../SubmitSuccess/SubmitSuccess';
import WindowContainer from '../WindowContainer/WindowContainer';
import SubscribeForm from '../SubscribeForm/SubscribeForm';
import { Container } from './styles';

const SubscribeSection = () => {
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  return (
    <Container id="subscription">
      <WindowContainer titleBar="www.allwyse.io" maxWidth={1200}>
        {isSubmitSuccess ? (
          <SubmitSuccess />
        ) : (
          <SubscribeForm setIsSubmitSuccess={setIsSubmitSuccess} />
        )}
      </WindowContainer>
    </Container>
  );
};

export default SubscribeSection;
