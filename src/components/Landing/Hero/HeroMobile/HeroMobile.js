import Image from 'next/image';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import RoundedButton from 'src/components/Landing/RoundedButton/RoundedButton';
import { womanProgrammingOnLaptop, checkboxWithCheckmark } from 'src/sections/home/constants';
import { paths } from 'src/routes/paths';
import {
  Container,
  TextLine1,
  TextLine2,
  Clients,
  CheckContainer,
  ClientsLine,
  ButtonSection,
  WomanProgramming,
} from './styles';

const HeroMobile = () => {
  const theme = useTheme();
  const isScreenLowHeight = useMediaQuery('(max-height: 850px)');

  return (
    <Container id="home">
      <TextLine1>Streamline Workflows,</TextLine1>
      <TextLine2>One place to manage</TextLine2>

      <ClientsLine>
        <Clients>Clients</Clients>
        <CheckContainer>
          <Image
            sizes="100%"
            src={checkboxWithCheckmark}
            alt="woman checkbox"
            fill={true}
            style={{ objectFit: 'cover' }}
          />
        </CheckContainer>
      </ClientsLine>

      <ButtonSection>
        <RoundedButton minWidth={310} href={paths.auth.jwt.register}>
          Product Preview
        </RoundedButton>
        <RoundedButton
          onClick={() => {}}
          minWidth={310}
          href={paths.auth.jwt.register}
          fill="green"
        >
          Book a Demo
        </RoundedButton>
      </ButtonSection>

      {isScreenLowHeight ? null : (
        <WomanProgramming>
          <Image
            sizes="100%"
            src={womanProgrammingOnLaptop}
            fill={true}
            style={{ objectFit: 'cover' }}
            alt="woman programming"
          />
        </WomanProgramming>
      )}
    </Container>
  );
};

export default HeroMobile;
