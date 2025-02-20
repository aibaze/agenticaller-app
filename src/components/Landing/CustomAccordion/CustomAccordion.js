import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails, Container, Section } from './styles';

const CustomAccordion = ({ sections, Summary, Details }) => {
  const [expanded, setExpanded] = useState('');

  const handleChange = (panel) => (e, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Container>
      {sections.map((props, idx) => (
        <Section key={`accordion_${idx}`}>
          <Accordion expanded={expanded === `panel${idx}`} onChange={handleChange(`panel${idx}`)}>
            <AccordionSummary
              aria-controls={`panel${idx}d-content`}
              id={`panel${idx}d-header`}
              expandIcon={<ExpandMoreIcon />}
            >
              <Summary {...props} />
            </AccordionSummary>
            <AccordionDetails>
              <Details {...props} />
            </AccordionDetails>
          </Accordion>
        </Section>
      ))}
    </Container>
  );
};

export default CustomAccordion;
