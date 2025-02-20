import HeroDesktop from './HeroDesktop/HeroDesktop';
import FixedScrollableText from '../FixedScrollableText/FixedScrollableText';
import { heroBackground } from 'src/sections/home/constants';
import HeroMobile from './HeroMobile/HeroMobile';

const Hero = () => {
  const background = {
    src: heroBackground,
    alt: 'hero background',
    width: 1728,
    height: 894,
  };

  return (
    <FixedScrollableText background={background} adjustOffset={400} totalHeight={1319}>
      <HeroDesktop />
      <HeroMobile />
    </FixedScrollableText>
  );
};

export default Hero;
