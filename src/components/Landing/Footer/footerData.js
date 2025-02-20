import { paths } from 'src/routes/paths';

export const copyright = 'Allwyse Copyright 2024 ©️';
export const xLink = 'https://www.x.com';
export const linkedinLink = 'https://www.linkedin.com';
export const instagramLink = 'https://www.instagram.com';

// TODO: wip complete links ids
export const footerLinks = [
  {
    name: 'Products',
    items: [
      { title: 'Sessions', link: '/product?product=sessions' },
      { title: 'Chat', link: '/product?product=chat-request' },
      { title: 'Invoice', link: '/product?product=invoice' },
      { title: 'Agenda on Sync', link: '/product?product=agenda' },
      { title: 'Your Services', link: '/product?product=your-services' },
      { title: 'Analytics', link: '/product?product=analytics' },
      { title: 'File Manager', link: '/product?product=file-manager' },
      { title: 'Task Manager', link: '/product?product=task-manager' },
    ],
  },
  {
    name: 'Sections',
    items: [
      { title: 'Book a Demo', link: paths.auth.jwt.register },
      { title: 'Client Data', link: '' },
      { title: 'Invoice', link: '/product?product=invoice' },
      { title: 'Chat & Request', link: '/product?product=chat-request' },
      { title: 'Performance', link: '' },
      { title: 'Pricing', link: '/home#pricing' },
      { title: 'Subscription', link: '/home#subscription' },
    ],
  },
  {
    name: 'Integration',
    items: [
      { title: 'Google Meet', link: '/home#googleMeet' },
      { title: 'Google Gmail', link: '/home#googleGmail' },
      { title: 'Your Suggestion', link: '/home#suggestion' },
    ],
  },
  {
    name: 'Help Center',
    items: [
      { title: 'Use Cases', link: '' },
      { title: 'My Services', link: '' },
      { title: 'Bug Report', link: '' },
      { title: 'Contact Support', link: '' },
    ],
  },
];

export const legals = [
  { title: 'Security', link: '' },
  { title: 'Terms', link: '' },
  { title: 'Privacy', link: '' },
];
