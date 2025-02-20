import { CustomLink, colors } from './styles';
import { useTheme } from '@mui/material/styles';

const PricingLink = ({ children, href, type }) => {
  const theme = useTheme();
  return (
    <CustomLink style={{ ...colors(theme)[type], height: '53px' }} href={href} target="_blank">
      {children}
    </CustomLink>
  );
};

export default PricingLink;
