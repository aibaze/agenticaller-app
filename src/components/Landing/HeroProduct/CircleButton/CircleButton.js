import { useTheme } from '@mui/material/styles';
import { ArrowForwardIosRounded, ArrowBackIosRounded } from '@mui/icons-material/';
import { ButtonContainer, styledButton } from './styles';

const CircleButton = ({ disabled, onClick, isBack }) => {
  const theme = useTheme();
  const styleButton = styledButton(theme, disabled);

  return (
    <ButtonContainer disabled={disabled} onClick={onClick}>
      {isBack ? (
        <ArrowBackIosRounded sx={styleButton} />
      ) : (
        <ArrowForwardIosRounded sx={styleButton} />
      )}
    </ButtonContainer>
  );
};

export default CircleButton;
