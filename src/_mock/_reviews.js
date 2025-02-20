import { _mock } from './_mock';

export const REVIEWS = [
  {
    name: 'Harrison Stein',
    postedDate: _mock.time(1),
    ratingNumber: 1,
    avatarUrl: _mock.image.avatar(1),
    content: `Good Looking.........
      i really enjoy our meetings.
      She is super kind and inspiring,  thank you mire!`,
  },
  {
    name: 'Deja Brady',
    postedDate: _mock.time(2),
    ratingNumber: 3,
    avatarUrl: _mock.image.avatar(2),
    content: `Very nice ! Amazing experience she is marvellous.`,
  },
  {
    name: 'Jayvion Simon',
    postedDate: _mock.time(3),
    ratingNumber: 5,
    avatarUrl: _mock.image.avatar(3),
    content: `Very nice ! One of my favorites!`,
  },
  {
    name: 'Juani Simioli',
    postedDate: _mock.time(4),
    ratingNumber: 2,
    avatarUrl: _mock.image.avatar(4),
    content: `This is lalala`,
  },
  {
    name: 'Harrison Stein 2',
    postedDate: _mock.time(1),
    ratingNumber: 1,
    avatarUrl: _mock.image.avatar(1),
    content: `Good Looking.........
      i really enjoy our meetings.
      She is super kind and inspiring,  thank you mire!`,
  },
  {
    name: 'Deja Brady 2',
    postedDate: _mock.time(2),
    ratingNumber: 3,
    avatarUrl: _mock.image.avatar(2),
    content: `Very nice ! Amazing experience she is marvellous.`,
  },
  {
    name: 'Jayvion Simon 2',
    postedDate: _mock.time(3),
    ratingNumber: 5,
    avatarUrl: _mock.image.avatar(3),
    content: `Very nice ! One of my favorites!`,
  },
  {
    name: 'Juani Simioli 2',
    postedDate: _mock.time(4),
    ratingNumber: 2,
    avatarUrl: _mock.image.avatar(4),
    content: `This is lalala`,
  },
  {
    name: 'Harrison Stein 3',
    postedDate: _mock.time(1),
    ratingNumber: 1,
    avatarUrl: _mock.image.avatar(1),
    content: `Good Looking.........
      i really enjoy our meetings.
      She is super kind and inspiring,  thank you mire!`,
  },
  {
    name: 'Deja Brady 3',
    postedDate: _mock.time(2),
    ratingNumber: 3,
    avatarUrl: _mock.image.avatar(2),
    content: `Very nice ! Amazing experience she is marvellous.`,
  },
  {
    name: 'Jayvion Simon 3',
    postedDate: _mock.time(3),
    ratingNumber: 5,
    avatarUrl: _mock.image.avatar(3),
    content: `Very nice ! One of my favorites!`,
  },
  {
    name: 'Juani Simioli 3',
    postedDate: _mock.time(4),
    ratingNumber: 2,
    avatarUrl: _mock.image.avatar(4),
    content: `This is lalala`,
  },
];

export const DETAILS_REVIEWS = {
  averageRating: 3.6,
  totalReviews: 10,
  ratings: [
    { name: '1 star', starCount: 1, reviewCount: 1 },
    { name: '2 star', starCount: 0, reviewCount: 0 },
    { name: '3 star', starCount: 3, reviewCount: 3 },
    { name: '4 star', starCount: 7, reviewCount: 7 },
    { name: '5 star', starCount: 19, reviewCount: 19 },
  ],
};
