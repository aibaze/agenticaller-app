import { googleCalendar, googledDocs, googleMeet } from 'src/sections/home/constants';
import { paths } from 'src/routes/paths';
import { Container } from './styles';
import Card from './Card/Card';

const IntegrationsDesktop = () => {
  return (
    <Container>
      <Card
        id="googleCalendar"
        text="Google Calendar Integrated and Face care or whatever you need, with allwyse."
        image={{ src: googleCalendar, alt: 'google calendar', width: 433, height: 210 }}
        link={{ href: paths.auth.jwt.register, label: 'Read More' }}
      />
      <Card
        id="googleDocuments"
        text="Google Documents Integrated Face care or whatever you need, with allwyse."
        image={{ src: googledDocs, alt: 'google docs', width: 433, height: 210 }}
        link={{ href: paths.auth.jwt.register, label: 'Read More' }}
      />
      <Card
        id="googleMeet"
        text="Google Meets Integrated and Face care or whatever you need, with allwyse."
        image={{ src: googleMeet, alt: 'google meet', width: 433, height: 210 }}
        link={{ href: paths.auth.jwt.register, label: 'Read More' }}
      />
    </Container>
  );
};

export default IntegrationsDesktop;
