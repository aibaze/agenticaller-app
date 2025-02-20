import { instagramLink, linkedinLink, xLink } from '../footerData';
import { Container, Title, IconX, IconInstagram, IconLinkedIn } from './styles';

const SocialMedia = () => {
  return (
    <Container>
      <Title>Social Media</Title>
      <a href={instagramLink} rel="noreferrer" target="_blank" aria-label="Instagram allwyse link">
        <IconInstagram />
      </a>
      <a href={linkedinLink} rel="noreferrer" target="_blank" aria-label="LinkedIn allwyse link">
        <IconLinkedIn />
      </a>
      <a href={xLink} rel="noreferrer" target="_blank" aria-label="X (twitter) allwyse link">
        <IconX />
      </a>
    </Container>
  );
};

export default SocialMedia;
