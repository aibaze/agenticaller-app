import Link from 'next/link';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Container } from './styles';
import { legals } from '../footerData';

const Legals = () => {
  const theme = useTheme();
  return (
    <Container>
      {legals.map(({ title, link }, idx) => (
        <Box key={`legal_${idx}`}>
          {Boolean(idx) && ' / '}
          <Link style={{ color: theme.palette.common.black }} href={link} target="_blank">
            {title}
          </Link>
        </Box>
      ))}
    </Container>
  );
};

export default Legals;
