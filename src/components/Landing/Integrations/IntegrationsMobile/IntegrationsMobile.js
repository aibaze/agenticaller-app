import Image from 'next/image';
import { googleCalendarIcon, googleMeetIcon, googleDocsIcon } from 'src/sections/home/constants';
import { paths } from 'src/routes/paths';
import { Container, ImageContainer, Text, CustomLink } from './styles';

const IntegrationsMobile = () => {
  return (
    <Container>
      <ImageContainer>
        <Image
          sizes="100%"
          src={googleCalendarIcon}
          width={90}
          height={90}
          alt="google calendar icon"
        />
        <Image sizes="100%" src={googleDocsIcon} width={90} height={90} alt="google docs icon" />
        <Image sizes="100%" src={googleMeetIcon} width={90} height={90} alt="google meet icon" />
      </ImageContainer>
      <Text>Google Calendar, Docs, Meet and more Integrations you already use everyday.</Text>
      <CustomLink href={paths.auth.jwt.register}>Read More</CustomLink>
    </Container>
  );
};

export default IntegrationsMobile;
