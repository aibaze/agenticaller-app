import { useEffect, useState, useCallback } from 'react';
import { getEventsByCoach } from 'src/api/event';
import { getCoachStudents } from 'src/api/student';
import { getCoachStats, getServicesByCoach } from 'src/api/coach';
import { getContactMessages } from 'src/api/coach';
import dayjs from 'dayjs';

const getEndOfNextSunday = () => {
  const today = new Date();
  const nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + ((7 - today.getDay()) % 7));
  nextSunday.setHours(23, 59, 59, 999);
  return nextSunday;
};

const filterEvents = (events, startDate, endDate) => {
  return events.filter((event) => {
    const eventDate = new Date(event.startDate);
    return eventDate >= startDate && eventDate <= endDate;
  });
};

const addServiceEvent = (lastEvents, servicesByCoach) => {
  return lastEvents.map((event) => {
    const service = servicesByCoach.find((services) => services._id === event.serviceId);
    return {
      ...event,
      ...(service ? { serviceTitle: service.title } : {}),
    };
  });
};

const filterWeekPreviousEvents = (events, today, startOfWeek) => {
  return events.filter((event) => {
    const eventDate = dayjs(event.startDate);

    // Check if eventDate is greater than or equal to startOfWeek and less than today
    return eventDate.isAfter(startOfWeek) && eventDate.isBefore(today);
  });
};
export function useOverviewData(coachId) {
  const [data, setData] = useState({
    coachEvents: [],
    nextEvent: null,
    eventsLeftWeek: [],
    eventsForToday: [],
    previousEvents: [],
    students: [],
    servicesByCoach: [],
    coachStats: null,
    contactMessages: [],
  });
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await getEventsByCoach(coachId);
      const sortedEvents = response.data.events.sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
      );
      return sortedEvents;
    } catch (e) {
      setError(e);
      return [];
    }
  }, [coachId]);

  const fetchStudents = useCallback(async () => {
    try {
      const response = await getCoachStudents(coachId);
      return response.data.students;
    } catch (e) {
      setError(e);
      return [];
    }
  }, [coachId]);

  const fetchContactMessages = useCallback(async () => {
    try {
      const response = await getContactMessages(coachId);
      return response.data.requests;
    } catch (e) {
      setError(e);
      return [];
    }
  }, [coachId]);

  const fetchCoachServices = useCallback(async () => {
    try {
      const response = await getServicesByCoach(coachId);
      return response.data.services.map(({ title, _id }) => ({ title, _id }));
    } catch (e) {
      setError(e);
      return [];
    }
  }, [coachId]);

  const fetchCoachStats = useCallback(async () => {
    try {
      const response = await getCoachStats(coachId);
      return response.data;
    } catch (e) {
      setError(e);
      return null;
    }
  }, [coachId]);

  useEffect(() => {
    const fetchData = async () => {
      const [events, students, servicesByCoach, coachStats, contactMessages] = await Promise.all([
        fetchEvents(),
        fetchStudents(),
        fetchCoachServices(),
        fetchCoachStats(),
        fetchContactMessages(),
      ]);

      if (events && students && servicesByCoach && coachStats) {
        setData((prevData) => ({
          ...prevData,
          coachEvents: events,
          students,
          servicesByCoach,
          coachStats,
          contactMessages,
        }));
      }
    };

    fetchData();
  }, [fetchEvents, fetchStudents, fetchCoachServices, fetchCoachStats, fetchContactMessages]);

  useEffect(() => {
    if (data.coachEvents.length > 0) {
      const today = new Date();
      const endOfToday = new Date(today);
      endOfToday.setHours(23, 59, 59, 999);
      const startOfWeek = dayjs().subtract(dayjs().day(), 'day');

      const endOfNextSunday = getEndOfNextSunday();
      const todayEvents = filterEvents(data.coachEvents, today, endOfToday);
      const weekEvents = filterEvents(data.coachEvents, today, endOfNextSunday);
      const lastEvents = filterWeekPreviousEvents(data.coachEvents, dayjs(today), startOfWeek);

      setData((prevData) => ({
        ...prevData,
        previousEvents: addServiceEvent(lastEvents, data.servicesByCoach).reverse(),
        eventsForToday: todayEvents,
        eventsLeftWeek: weekEvents,
        nextEvent: todayEvents.length > 0 ? todayEvents[0] : null,
      }));
    }
  }, [data.coachEvents, data.servicesByCoach]);

  return {
    nextEvent: data.nextEvent,
    eventsLeftWeek: data.eventsLeftWeek,
    eventsForToday: data.eventsForToday,
    previousEvents: data.previousEvents,
    students: data.students,
    coachStats: data.coachStats,
    contactMessages: data.contactMessages,
    error,
  };
}
