import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import { logoAllwyse, footerWoman } from 'src/sections/home/constants';
import { footerLinks } from '../footerData';
import Copyright from '../Copyright/Copyright';
import Legals from '../Legals/Legals';
import SocialMedia from '../SocialMedia/SocialMedia';
import Background from '../Background/Background';
import {
  Desktop,
  Footer,
  Column1,
  Column2,
  Column3,
  LogoContainer,
  ImageContainer,
  ListLinks,
  ListTitle,
  ListLink,
} from './styles';

const DesktopFooter = () => {
  const theme = useTheme();
  return (
    <Desktop>
      <Footer>
        <Column1>
          <LogoContainer>
            <Image
              sizes="100%"
              src={logoAllwyse}
              alt="logo allwyse"
              fill={true}
              style={{ objectFit: 'cover' }}
            />
          </LogoContainer>

          <ImageContainer>
            <Image
              sizes="100%"
              src={footerWoman}
              alt="woman with table illustration"
              fill={true}
              style={{ objectFit: 'cover' }}
            />
          </ImageContainer>
          <Copyright />
        </Column1>

        <Column2>
          {footerLinks?.map((list, idx) => (
            <ListLinks key={`footer_section_link_${idx}`}>
              <ListTitle>{list.name}</ListTitle>
              {list.items.map((item, idx) => (
                <Link
                  style={{ textDecoration: 'none' }}
                  href={item.link}
                  key={`desktop_footer_link_${list?.name}_${idx}`}
                >
                  <ListLink>{item.title}</ListLink>
                </Link>
              ))}
            </ListLinks>
          ))}
        </Column2>
        <Column3>
          <SocialMedia />
          <Legals />
        </Column3>
      </Footer>
      <Background />
    </Desktop>
  );
};

export default DesktopFooter;
