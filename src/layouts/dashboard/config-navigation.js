import { useMemo } from 'react';

import { paths } from 'src/routes/paths';
import Label from 'src/components/label/label';

import SvgColor from 'src/components/svg-color';
import { useGetRequests } from 'src/api/request';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  clients: icon('ic_icon-user-grey'),
};

// ----------------------------------------------------------------------

export function useNavData() {

  const data = useMemo(() => [
    // OVERVIEW
    // ----------------------------------------------------------------------
 /*    {
      subheader: 'OVERVIEW',
      items: [{ title: 'Admin & Analytics', path: paths.profile.overview, disabled:true,icon: ICONS.analytics }],
    }, */
    // MANAGEMENT
    // ----------------------------------------------------------------------
    {
      subheader: 'Your agency',
      items: [
        {
          title: 'User/Agency',
          icon: ICONS.user,
          path: paths.user.settings,
          
        },
        {
          title: 'Calls',
          path: "/calls",
          icon: ICONS.user,
        },
        {
          title: 'Assistants',
          path: "/assistants",
          icon: ICONS.user,
        },
        {
          title: 'Phone numbers',
          path: "/phone-numbers",
          icon: ICONS.user,
        },
        { title: 'My Clients', path: "/clients",disabled:true, icon: ICONS.clients }, 
      /*   {
          title: 'Usage',
          path: "/usage",
          disabled:true,
          icon: ICONS.user,
        },
        {
          title: 'Hire an expert',
          path: "/hire",
          disabled:true,
          icon: ICONS.user,
        }, */
      ],
    },
    // PREMIUM
    // ----------------------------------------------------------------------
/*    
    {
      subheader: 'PREMIUM',
      info: <Label color="secondary">Coming Soon</Label>,
      items: [
        { title: 'Invoice', path: paths.profile.invoicing, icon: ICONS.invoice, disabled: true },
        {
          title: 'File Manager',
          path: paths.profile.fileManager,
          icon: ICONS.folder,
          disabled: true,
        },

        { title: 'Payments', path: paths.profile.kanban, icon: ICONS.mail, disabled: true },
        { title: 'Messenger', path: paths.profile.messages, icon: ICONS.chat, disabled: true },
        { title: 'Certifications', path: paths.profile.blog, icon: ICONS.chat, disabled: true },
      ],
    }, */
  ]);

  return data;
}
