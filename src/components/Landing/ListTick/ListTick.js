import Tick from '../Tick/Tick';
import { Container, sizeTick } from './styles';
import { useTheme } from '@mui/material/styles';

export const ListTick = ({ size = 'small', backgroundColor, tickColor }) => {
  const theme = useTheme();

  return (
    <Container size={size} backgroundColor={backgroundColor}>
      <Tick
        size={sizeTick[size]}
        color={tickColor ? tickColor : theme.palette.landing.forestGreen}
      />
    </Container>
  );
};
