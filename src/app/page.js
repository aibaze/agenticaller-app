import { redirect } from 'next/navigation';

import { PATH_AFTER_SIGNIN } from 'src/config-global';

// ----------------------------------------------------------------------
export default async function HomePage() {
  redirect(PATH_AFTER_SIGNIN);
}
