import PropTypes from 'prop-types';

import { paramCase } from 'src/utils/change-case';
import axios, { endpoints } from 'src/utils/axios';

import { PostEditView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Post Edit',
};

export default function EditPage({ params }) {
  const { title } = params;

  return <PostEditView title={title} />;
}

export async function generateStaticParams() {
  try {
    const res = await axios.get(endpoints.post.list);
    if (!res.data?.posts) {
      console.error('No posts found in API response:', res.data);
      return []; // Fallback to empty array
    }
    return res.data.posts.map((post) => ({
      title: paramCase(post.title),
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return []; // Fallback to avoid build failure
  }
}

EditPage.propTypes = {
  params: PropTypes.shape({
    title: PropTypes.string,
  }),
};
