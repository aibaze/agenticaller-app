import dynamic from 'next/dynamic';

export { default as SingleFilePreview } from './preview-single-file';

export const Upload = dynamic(() => import('./upload'), {
  ssr: false,
});
