import PropTypes from 'prop-types';
import { UserProfileView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Coach info',
};

export default function PostDetailsHomePage({ params }) {
  return <UserProfileView isPublic />;
}
