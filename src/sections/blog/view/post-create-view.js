'use client';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';

import PostNewEditForm from '../post-new-edit-form';

// ----------------------------------------------------------------------

export default function PostCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <PostNewEditForm />
    </Container>
  );
}
