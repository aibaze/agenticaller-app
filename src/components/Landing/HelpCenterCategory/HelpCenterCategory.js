import { useTheme } from '@mui/material/styles';
import { useHelpCenter } from '../hooks/useHelpCenter';
import RoundedButton from 'src/components/Landing/RoundedButton/RoundedButton';
import CheckboxForm from '../CheckboxForm/CheckboxForm';
import { Container, Title, CheckboxContainer } from './styles';

const categories = [
  { name: 'Technical Error', slug: 'technical-error' },
  { name: 'Book Demo Error', slug: 'book-demo-error' },
  { name: 'Product', slug: 'product' },
  { name: 'Bug Report', slug: 'bug-report' },
  { name: 'Pricing', slug: 'pricing' },
  { name: 'Other', slug: 'other' },
];

const HelpCenterCategory = () => {
  const { setStep, category, setCategory } = useHelpCenter();
  const theme = useTheme();
  return (
    <Container>
      <Title>How can we help you?</Title>
      <CheckboxContainer>
        {categories.map((cat, idx) => (
          <CheckboxForm
            key={`${idx}_category`}
            label={cat.name}
            checked={category === cat.slug}
            onChange={() => setCategory(cat.slug)}
            color={theme.palette.landing.forestGreen}
            minWidth={264}
          />
        ))}
      </CheckboxContainer>
      <RoundedButton minWidth={200} disabled={!category} onClick={() => setStep(3)} fill="green">
        Next
      </RoundedButton>
    </Container>
  );
};

export default HelpCenterCategory;
