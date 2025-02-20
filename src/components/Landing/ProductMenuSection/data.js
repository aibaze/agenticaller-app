import {
  InterpreterModeOutlined,
  EventAvailableOutlined,
  InsightsOutlined,
  QuestionAnswerOutlined,
  BadgeOutlined,
  DriveFileMoveOutlined,
  ReceiptLongOutlined,
  DashboardCustomizeOutlined,
  ChecklistOutlined,
} from '@mui/icons-material';

export const productItems = [
  {
    slug: 'sessions',
    title: 'Sessions',
    description: 'Scheduling, conducting, and managing directly through the platform.',
  },
  {
    slug: 'agenda',
    title: 'Agenda on Sync',
    description: 'Sync ensuring no overlap and keeping agendas clear and organized.',
  },
  {
    slug: 'analytics',
    title: 'Analytics',
    description: 'Improve tailored strategies for optimal results.',
  },
  {
    slug: 'chat-request',
    title: 'Chat & Request',
    description: 'Facilitates communication and interaction with your clients.',
  },
  {
    slug: 'your-services',
    title: 'Your Services',
    description: 'Customizable section, including descriptions, pricing, and availability.',
  },
  {
    slug: 'file-manager',
    title: 'File Manager',
    description: 'Storing, organizing, everything is readily accessible and secure.',
  },
  {
    slug: 'invoice',
    title: 'Invoice',
    description: 'Create, send, and manage. Ensuring timely payments and financial tracking.',
  },
  {
    slug: 'integrations',
    title: 'Integrations',
    description: 'Seamless integration, enhancing functionality and simplifying workflows.',
  },
  {
    slug: 'task-manager',
    title: 'Task Manager',
    description: 'Planning, tracking and assigning tasks, ensuring efficient workflow.',
  },
];

export const getProductColorAndIcon = (slug, theme, iconStyle) => {
  const colorAndIcon = {
    sessions: {
      color: theme.palette.landing.lavenderMist,
      icon: <InterpreterModeOutlined sx={{ ...iconStyle }} />,
    },
    agenda: {
      color: theme.palette.landing.skyBlue,
      icon: <EventAvailableOutlined sx={{ ...iconStyle }} />,
    },
    analytics: {
      color: theme.palette.landing.forestGreen,
      icon: <InsightsOutlined sx={{ ...iconStyle }} />,
    },
    'chat-request': {
      color: theme.palette.landing.forestGreen,
      icon: <QuestionAnswerOutlined sx={{ ...iconStyle }} />,
    },
    'your-services': {
      color: theme.palette.landing.skyBlue,
      icon: <BadgeOutlined sx={{ ...iconStyle }} />,
    },
    'file-manager': {
      color: theme.palette.landing.lavenderMist,
      icon: <DriveFileMoveOutlined sx={{ ...iconStyle }} />,
    },
    invoice: {
      color: theme.palette.landing.skyBlue,
      icon: <ReceiptLongOutlined sx={{ ...iconStyle }} />,
    },
    integrations: {
      color: theme.palette.landing.forestGreen,
      icon: <DashboardCustomizeOutlined sx={{ ...iconStyle }} />,
    },
    'task-manager': {
      color: theme.palette.landing.skyBlue,
      icon: <ChecklistOutlined sx={{ ...iconStyle }} />,
    },
  };

  return colorAndIcon[slug];
};
