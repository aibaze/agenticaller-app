import Image from 'next/image';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import RoundedButton from 'src/components/Landing/RoundedButton/RoundedButton';
import {
  womanProgrammingOnLaptop,
  womanBalancing,
  shinningBulb,
  checkboxWithCheckmark,
} from 'src/sections/home/constants';
import { paths } from 'src/routes/paths';
import {
  Container,
  TitleContainer,
  Title,
  Title2,
  ImageContainer,
  BulbContainer,
  WomanContainer,
  SecondRowText,
  Clients,
  ButtonSection,
  WomanProgrammingContainer,
  ButtonContainer,
} from './styles';

const HeroDesktop = () => {
  const theme = useTheme();

  return (
    <Container id="home">
      <Box>
        <TitleContainer>
          <Title variant="h1Home">Allwyse streamline your workflow,</Title>

          <ImageContainer>
            <Image
              sizes="100%"
              src={womanBalancing}
              alt="woman balancing"
              fill={true}
              style={{ objectFit: 'cover' }}
            />
          </ImageContainer>
        </TitleContainer>

        <SecondRowText>
          <BulbContainer>
            <Image
              sizes="100%"
              src={shinningBulb}
              fill={true}
              style={{ objectFit: 'cover' }}
              alt="shining bulb"
            />
          </BulbContainer>
          <Title2 variant="h1Home">One place to manage</Title2>
          <WomanContainer>
            <Image
              sizes="100%"
              src={checkboxWithCheckmark}
              alt="woman checkbox"
              fill={true}
              style={{ objectFit: 'cover' }}
            />
          </WomanContainer>
          <Clients variant="h1Home">Clients</Clients>
        </SecondRowText>
      </Box>

      <ButtonSection>
        <WomanProgrammingContainer>
          <Image
            sizes="100%"
            src={womanProgrammingOnLaptop}
            fill={true}
            style={{ objectFit: 'cover' }}
            alt="woman programming"
          />
        </WomanProgrammingContainer>
        <ButtonContainer>
          <RoundedButton
            onClick={() => {}}
            minWidth={310}
            href={paths.auth.jwt.register}
            fill="green"
          >
            Book a Demo
          </RoundedButton>
          <RoundedButton onClick={() => {}} minWidth={310} href={paths.product.root}>
            Product Preview
          </RoundedButton>
        </ButtonContainer>
      </ButtonSection>
    </Container>
  );
};

export default HeroDesktop;
