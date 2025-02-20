import { paths } from 'src/routes/paths';
import { womenProtect, womenGuide, womenTechnical } from 'src/sections/home/constants';
import GetInfoCard from './GetInfoCard/GetInfoCard';
import Divider from './Divider/Divider';
import { Container } from './styles';

export const GetInfoSection = () => {
  return (
    <Container>
      <GetInfoCard
        title="Get Data Security"
        subtitle="Our platform ensures that your sessions, files, and communications are protected with the latest encryption and security protocols."
        image={{ src: womenProtect, alt: 'women protect illustration', width: 193, height: 193 }}
        link={{ href: paths.auth.jwt.register, label: 'Read More' }}
      />
      <Divider />
      <GetInfoCard
        title="Get Expert guidance"
        subtitle="Tap into the wisdom of seasoned experts who can guide you through every aspect of your online practice."
        image={{ src: womenGuide, alt: 'women guide illustration', width: 193, height: 193 }}
        link={{ href: paths.auth.jwt.register, label: 'Read More' }}
      />
      <Divider />
      <GetInfoCard
        title="Get Technical support"
        subtitle="We’re ready to help you resolve any issues you may encounter. Whether it’s troubleshooting, system updates, or platform questions,"
        image={{
          src: womenTechnical,
          alt: 'women technical illustration',
          width: 193,
          height: 193,
        }}
        link={{ href: paths.auth.jwt.register, label: 'Read More' }}
      />
    </Container>
  );
};
