import Image from 'next/image';
import { logoAllwyse } from 'src/sections/home/constants';
import FooterAccordion from './FooterAccordion/FooterAccordion.js';
import { footerLinks } from '../footerData';
import Copyright from '../Copyright/Copyright';
import Legals from '../Legals/Legals';
import SocialMedia from '../SocialMedia/SocialMedia';
import { Mobile, Container, Columns, ImageContainer } from './styles';

const MobileFooter = () => {
  return (
    <Mobile>
      <FooterAccordion footerLinks={footerLinks} />
      <Container>
        <Columns>
          <ImageContainer>
            <Image
              sizes="100%"
              src={logoAllwyse}
              alt="logo allwyse"
              fill
              style={{ objectFit: 'cover' }}
            />
          </ImageContainer>
          <Copyright />
          <Legals />
        </Columns>
        <SocialMedia />
      </Container>
    </Mobile>
  );
};

export default MobileFooter;
