export const teamClimbing =
  'https://i.ibb.co/dcwDDQw/Team-of-people-climbing-up-stairs-together.png';

export const iconPerson = 'https://i.ibb.co/TcwbXBp/icon-of-a-person.png';

export const zapierIcon = 'https://i.ibb.co/JKQGM0p/150px-2x-2.png';

export const calendlyIcon = 'https://i.ibb.co/1dhH6W7/Calendly-New-1.png';

export const tabsA = [
  {
    label: 'Why Allwyse?',
    title: 'Why allwyse?',
    description:
      'Allwyse helps you boost productivity and work more efficiently. Spend less time on administrative tasks and more time growing your business. No more switching between apps or juggling multiple logins, End the overwhelm. Consolidate your scheduling, billing, document management, and client communication into one seamless platform. Say goodbye to hassle and hello to a more efficient business—Allwyse has it all.',
    board: {
      textDesktop:
        'Say goodbye to hassle and hello to a more efficient business—Allwyse has it all.',
      textMobile:
        '“With Allwyse, you get everything you need to run your business in one place, allowing you to focus on what you do best”.',
      image: { src: teamClimbing, alt: 'team climbing illustration', width: 245, height: 245 },
    },
  },
  {
    label: 'Use Cases',
    title: 'Use Cases:',
    description:
      'Each of these use cases highlights how AllWyse caters to the specific needs of various types of professionals, providing them with the tools they need to manage their practice efficiently, engage with clients effectively, and drive significant outcomes in their specialized fields.',
    boards: [
      {
        title: 'Business Coaches',
        text: [
          'Robust project management tools to track client progress, set business goals, and measure outcomes.',
          'The chat feature facilitates ongoing communication, allowing coaches to provide continuous support and advice to their clients.',
        ],
        image: { src: iconPerson, alt: 'icon of a person illustration', width: 261, height: 261 },
      },
      {
        title: 'Psychologist',
        text: [
          'Secure and confidential management of client records and session notes.',
          "By using the platform's calendar integration, psychologists can schedule recurring therapy sessions and send automated reminders to clients, ensuring consistent care.",
        ],
        image: { src: iconPerson, alt: 'icon of a person illustration', width: 261, height: 261 },
      },
      {
        title: 'Educational Tutors',
        text: [
          'Organize your scheduling, invoicing, and educational resources.',
          "The platform's file manager helps tutors distribute assignments and reading materials efficiently, while the chat feature allows for instant feedback and clarification of doubts outside of scheduled sessions.",
        ],
        image: { src: iconPerson, alt: 'icon of a person illustration', width: 261, height: 261 },
      },
      {
        title: 'Executive Coaches',
        text: [
          'Manage their client portfolios, schedule executive coaching sessions, and facilitate leadership development workshops.',
          'The integration with Google Meet enables virtual coaching sessions, broadening the reach to global clients.',
        ],
        image: { src: iconPerson, alt: 'icon of a person illustration', width: 261, height: 261 },
      },
      {
        title: 'Fitness Trainers',
        text: [
          'Fitness trainers can schedule group classes or individual training sessions directly through AllWyse.',
          'They can also use the platform to share workout plans, nutrition guides, and track client progress, all within a single, integrated platform.',
        ],
        image: { src: iconPerson, alt: 'icon of a person illustration', width: 261, height: 261 },
      },
      {
        title: 'Psychologists',
        text: [
          'Secure and confidential management of client records and session notes.',
          "By using the platform's calendar integration, psychologists can schedule recurring therapy sessions and send automated reminders to clients, ensuring consistent care.",
        ],
        image: { src: iconPerson, alt: 'icon of a person illustration', width: 261, height: 261 },
      },
      {
        title: 'Mentors',
        text: [
          'Schedule and manage mentorship sessions, create and track goals for mentees, and share relevant resources through the integrated file system.',
          "The platform's invoicing capabilities also allow mentors to bill for sessions directly, simplifying the administrative aspects of mentorship programs.",
        ],
        image: { src: iconPerson, alt: 'icon of a person illustration', width: 261, height: 261 },
      },
      {
        title: 'Nutritionists',
        text: [
          'Create personalized meal plans and nutrition guides, share them with clients, and track dietary adherence and progress.',
          'Integrating appointments with Google Calendar ensures clients receive timely reminders for check-ups and consultations.',
        ],
        image: { src: iconPerson, alt: 'icon of a person illustration', width: 261, height: 261 },
      },
    ],
  },
  {
    label: 'Compare Allwyse with others',
    labelMobile: 'Compare',
    title: 'Compare Allwyse with others:',
    titleMobile: 'Compare:',
    comparisons: [
      {
        image: { src: zapierIcon, alt: 'zapier icon', width: 258, height: 258 },
        title: 'Allwyse vs. Zapier',
        blocks: [
          {
            title: 'Integration Capabilities:',
            text: "While Zapier excels at automating workflows between apps, AllWyse offers deep integration specifically tailored for coaching and mentoring services, integrating essential tools like Google Calendar, Google Docs, and Google Meet directly within the platform. This ensures a seamless, industry-specific user experience that Zapier's broad but less specialized approach may not match.",
          },
          {
            title: 'User Interface:',
            text: 'AllWyse provides a streamlined, all-in-one dashboard designed for ease of use in coaching and mentoring, whereas Zapier focuses more on connecting multiple apps which can sometimes result in a more complex and less intuitive interface for non-technical users.',
          },
        ],
      },
      {
        image: { src: calendlyIcon, alt: 'calendly icon', width: 458, height: 258 },
        title: 'AllWyse vs. Calendly',
        blocks: [
          {
            title: 'Scheduling Integration:',
            text: 'Both platforms offer robust scheduling solutions, but AllWyse integrates these scheduling features directly with other business functions like invoicing and file management, providing a more holistic approach to business management than Calendly, which specializes in scheduling alone.',
          },
          {
            title: 'Additional Features:',
            text: 'Unlike Calendly, AllWyse includes features like invoice creation, file management, and a built-in chat system, making it a more comprehensive platform for business management beyond just appointment setting.',
          },
        ],
      },
      {
        // TODO: excel icon missing
        image: { src: zapierIcon, alt: 'excel icon', width: 258, height: 258 },
        title: 'AllWyse vs. Excel',
        blocks: [
          {
            title: 'Automation and Integration:',
            text: 'Unlike Excel, which requires manual entry and lacks integration capabilities, AllWyse offers automated data entry and integrates seamlessly with Google Calendar, Google Docs, and Google Meet. This integration eliminates the time-consuming process of manually updating spreadsheets and ensures that all information is synchronized and up-to-date.',
          },
          {
            title: 'User-Friendly Interface:',
            text: 'AllWyse provides a tailored dashboard designed for coaches and mentors, making it easier to manage schedules, client information, and financials. Excel, while flexible, can be complex and requires a higher level of skill to customize effectively for business management.',
          },
        ],
      },
      {
        // TODO: Trello icon missing
        image: { src: zapierIcon, alt: 'trello icon', width: 258, height: 258 },
        title: 'AllWyse vs. Trello',
        blocks: [
          {
            title: 'Organization:',
            text: 'Both Trello and AllWyse help organize tasks and projects. However, AllWyse offers a more tailored experience for coaching and mentoring professionals, integrating these functionalities with additional tools necessary for running a comprehensive business, like billing and client management.',
          },
          {
            title: 'Usability:',
            text: 'Trello’s card-based system is effective for project tracking but may not provide the specific functionalities needed in a coaching or mentoring context, such as session scheduling and direct invoicing.',
          },
        ],
      },
    ],
  },
];
