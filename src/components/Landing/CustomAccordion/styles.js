import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

export const Container = styled('div')(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export const Section = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
}));

export const Accordion = styled((props) => <MuiAccordion disableGutters square {...props} />)(
  ({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
    '&.Mui-expanded': {
      backgroundColor: theme.palette.common.white,
      borderRadius: 0,
    },
  })
);

export const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    padding: '0 25px',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
  })
);

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));
