import PropTypes from 'prop-types';

import { paramCase } from 'src/utils/change-case';
import axios, { endpoints } from 'src/utils/axios';

import { PostDetailsView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Post Details',
};

export default function PostDetailsPage({ params }) {
  const { title } = params;

  return <PostDetailsView title={title} />;
}

export async function generateStaticParams() {

  return  []
}

PostDetailsPage.propTypes = {
  params: PropTypes.shape({
    title: PropTypes.string,
  }),
};
