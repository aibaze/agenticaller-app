import Link from 'next/link';
import PropTypes from 'prop-types';
import CustomAccordion from '../../../CustomAccordion/CustomAccordion';
import { DetailContainer, SummaryText, LinkRowText } from './styles';

const LinkRow = ({ title, link }) => {
  return (
    <Link style={{ textDecoration: 'none' }} href={link}>
      <LinkRowText>{title}</LinkRowText>
    </Link>
  );
};

const Summary = ({ name }) => {
  return <SummaryText>{name}</SummaryText>;
};

const Details = ({ items }) => {
  return (
    <DetailContainer>
      {items.map(({ link, title }, idx) => (
        <LinkRow key={`${idx}_LinkRow`} link={link} title={title} idx={idx} />
      ))}
    </DetailContainer>
  );
};

const FooterAccordion = ({ footerLinks }) => (
  <CustomAccordion sections={footerLinks} Details={Details} Summary={Summary} />
);

export default FooterAccordion;

FooterAccordion.propTypes = {
  footerLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          link: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};
