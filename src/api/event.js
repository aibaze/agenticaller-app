import { axiosInstanceCoachApi } from 'src/utils/axios';
import { getDayStartEnd, getHourFromTimestamp } from 'src/utils/dates';

export const createEvent = async (event, token) =>
  await axiosInstanceCoachApi.post('/event/create-event', event);

export const getEventsByCoach = async (coachId) =>
  await axiosInstanceCoachApi.get(`/event/coach/${coachId}`);

export const getPublicEventsByCoach = async (coachId, date = undefined) => {
  let url = `/event/public/coach/${coachId}`;
  if (date) {
    const { startDate, endDate } = getDayStartEnd(date);
    url = `/event/public/coach/${coachId}?startDate=${startDate}&endDate=${endDate}`;
  }
  const { data } = await axiosInstanceCoachApi.get(url);
  const parsedEvents = data.events.map((event) => {
    return {
      ...event,
      startHour: getHourFromTimestamp(event.start),
      endHour: getHourFromTimestamp(event.end),
    };
  });
  return { data: { events: parsedEvents } };
};
