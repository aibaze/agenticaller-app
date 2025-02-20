import { googleCalendarIcon, googleMeetIcon, googleDocsIcon } from 'src/sections/home/constants';

const colleaguesMeeting = 'https://i.ibb.co/4VYFDv1/Remote-colleagues-in-online-meeting.png';
const teamwork = 'https://i.ibb.co/3rV8tLW/Project-management-teamwork-and-integration.png';
const manageEverything = 'https://i.ibb.co/r2fNYLT/Main.png';
const moreIcon = 'https://i.ibb.co/NyMs7FW/More.png';
const skyGreenBlue = 'https://i.ibb.co/mJLvp3j/joshua-earle-c-Gwfkw-Hmt98-unsplash.jpg';

export const tabsB = [
  {
    label: 'Integrations',
    title: 'Integrations:',
    description:
      'At AllWyse, we are deeply committed to empowering online workers with the necessary technologies to achieve optimal performance. We understand the dynamic nature of online businesses and the critical role of technology in enhancing efficiency and effectiveness. Our platform connects with the tools you use every day, making it easier to manage your workflow smoothly.',
    board1: {
      textDesktop:
        'More organized, efficient, and client-focused business to maximize impact and results.',
      textMobile:
        '“Our integrations contribute to a more organized, efficient, and client-focused business, enabling you to maximize impact and results”.',
      image: {
        src: colleaguesMeeting,
        alt: 'colleagues meeting illustration',
        width: 245,
        height: 229,
      },
    },
    board2: {
      text: `Streamline \<br> your operations and maximize productivity.`,
      image: { src: manageEverything, alt: 'logos', width: 368, height: 573 },
    },
    board3: {
      header: 'INCLUDED',
      title: 'Change your clients lives.',
      list: [
        'You will streamline your operations, minimize financial losses.',
        'Position yourself a sustainable growth and success.',
      ],
      textMobile:
        'By embracing an integrated and all-in-one platform like "Allwyse," coaches can streamline their operations, minimize financial losses, and position themselves for sustainable growth and success.',
      link: { label: 'Start today free trial, no credit card required.', href: '' },
      image: { src: skyGreenBlue, alt: 'sly background', width: 640, height: 960 },
    },
  },
  {
    label: 'Your favorite tools',
    labelMobile: 'Your tools',
    title: 'Your favorite tools:',
    titleMobile: 'Your tools:',
    sections: [
      {
        title: 'Google Docs + Allwyse:',
        description:
          "With Allwyse's integration with Google Docs, managing your coaching documentation becomes a breeze. You can create, organize, and share documents and folders directly from Allwyse, ensuring all your coaching materials are easily accessible and well-organized. This feature is invaluable for sharing tailored coaching materials with clients, collaborating on documents in real-time, and maintaining a central repository of all coaching resources.",
        image: { src: googleDocsIcon, alt: 'google docs icon', width: 90, height: 90 },
      },
      {
        title: 'Google Calendar + Allwyse:',
        description:
          'Allwyse integrates seamlessly with Google Calendar, enabling coaches to synchronize their calendars, create events, and manage appointments efficiently. This integration allows you to send event invites directly to your clients, ensuring both parties are well-informed and prepared for upcoming sessions. Administrative tasks are significantly reduced as you can view and manage all your events from within Allwyse, providing a unified platform that saves time and avoids scheduling conflicts.',
        image: { src: googleCalendarIcon, alt: 'google calendar icon', width: 90, height: 90 },
      },
      {
        title: 'Google Meet + Allwyse:',
        description:
          'The integration between Google Meet and Allwyse simplifies the process of conducting video calls and virtual meetings. Directly from Allwyse, you can create and sync your meetings, automatically sending invites to your clients. This ensures that you never miss a meeting and that all video calls are aligned with your scheduled appointments on Google Calendar. This feature enhances the reliability of your coaching sessions, providing a professional and seamless meeting experience for both you and your clients.',
        image: { src: googleMeetIcon, alt: 'google meet icon', width: 90, height: 90 },
      },
      {
        title: 'More integrations:',
        description:
          "By integrating popular and powerful technologies such as Google Calendar, Google Docs, and Google Meet, we facilitate seamless administrative workflows. However, our commitment does not stop there. We are always exploring new technological avenues to enhance our platform's capabilities, driven by our commitment to our users' success and satisfaction.",
        image: { src: moreIcon, alt: 'plus icon', width: 90, height: 90 },
      },
    ],
  },
  {
    label: 'Our commitment',
    labelMobile: 'Commitment',
    title: 'Our commitment:',
    titleMobile: 'Commitment:',
    description:
      'We are not only proactive in updating our features but also highly responsive to the needs and proposals of our users. We actively encourage our community of coaches to share their insights and suggest new integrations or improvements. This open-dialogue approach ensures that Allwyse evolves in alignment with the specific needs of coaching professionals, helping them drive more value and make a more significant impact in their clients lives.',
    board: {
      text: '“This philosophy ensures that Allwyse is continually adapting to better meet the changing demands of our users”.',
      image: { src: teamwork, alt: 'team work puzzle illustration', width: 292, height: 292 },
    },
  },
];
