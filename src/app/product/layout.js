import PropTypes from 'prop-types';

export const metadata = {
  title: 'Allwyse | Product',
  description: 'Allwyse streamline your workflow, one place to manage Clients ',
};
export default function Layout({ children }) {
  return children;
}

Layout.propTypes = {
  children: PropTypes.node,
};
