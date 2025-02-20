import { useTheme } from '@mui/material/styles';
import { IconStyles, iconSharedStyle } from './styles';
import { getProductColorAndIcon } from 'src/components/Landing/ProductMenuSection/data';

const Icon = ({ slug }) => {
  const theme = useTheme();
  const { icon, color } = getProductColorAndIcon(slug, theme, iconSharedStyle(theme));

  return <IconStyles color={color}>{icon}</IconStyles>;
};

export default Icon;
