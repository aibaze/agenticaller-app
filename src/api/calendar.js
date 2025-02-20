import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import { fetcher, endpoints } from 'src/utils/axios';

import { COACH_API } from 'src/config-global';

import { createEvent as createDBEvent } from './event';

// ----------------------------------------------------------------------

const URL = endpoints.calendar;

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetEvents(coachId, isPublic, token) {
  const url = isPublic
    ? `${COACH_API}/event/public/coach/${coachId}`
    : `${COACH_API}/event/coach/${coachId}`;
  const { data, isLoading, error, isValidating } = useSWR(url, fetcher, options);
  const memoizedValue = useMemo(() => {
    const events = data?.events?.map((event) => ({
      ...event,
      textColor: event.color,
    }));

    return {
      events: events || [],
      eventsLoading: isLoading,
      eventsError: error,
      eventsValidating: isValidating,
      eventsEmpty: !isLoading && !data?.events.length,
    };
  }, [data?.events, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createEvent(data, token) {
  const response = await createDBEvent(data, token);
  const eventData = response.data.event;

  mutate(
    `${COACH_API}/event/coach/${data.coachId}`,
    (currentData) => {
      const events = [...currentData.events, eventData];

      return {
        ...currentData,
        events,
      };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function updateEvent(eventData) {
  /**
   * Work on server
   */
  // const data = { eventData };
  // await axios.put(endpoints.calendar, data);

  /**
   * Work in local
   */
  mutate(
    URL,
    (currentData) => {
      const events = currentData.events.map((event) =>
        event.id === eventData.id ? { ...event, ...eventData } : event
      );

      return {
        ...currentData,
        events,
      };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function deleteEvent(eventId) {
  /**
   * Work on server
   */
  // const data = { eventId };
  // await axios.patch(endpoints.calendar, data);

  /**
   * Work in local
   */
  mutate(
    URL,
    (currentData) => {
      const events = currentData.events.filter((event) => event.id !== eventId);

      return {
        ...currentData,
        events,
      };
    },
    false
  );
}
