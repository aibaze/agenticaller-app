import dayjs from 'dayjs';
import { fDate } from './format-time';

export const dayNamesToIndexes = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export const shouldDisableDate = (enabledDays) => (date) => {
  if (!date) return false;
  // Convert day names to their respective indexes
  const enabledDayIndexes = enabledDays.map((day) => dayNamesToIndexes[day]);
  // Disable past dates
  if (date.isBefore(dayjs(), 'day')) {
    return true;
  }
  // Get the day of the week for the date
  const day = date.day();
  // Check if the day is in the list of enabled days

  return !enabledDayIndexes.includes(day);
};

export const getTodayDate = () => {
  const today = new Date();
  return fDate(today);
};

export const getDayStartEnd = (date) => {
  // Get the start of the day (00:00)
  const startDate = date.startOf('day').toISOString();

  // Get the end of the day (23:59:59.999)
  const endDate = date.endOf('day').toISOString();

  return {
    startDate,
    endDate,
  };
};

export const getHourFromTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${hour}:${minute === 0 ? '00' : minute}`;
};

const timeStringToDate = (timeString, referenceDate = new Date().toISOString().split('T')[0]) => {
  const [hours, minutes] = timeString.split(':');
  const date = new Date(referenceDate);
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  return date;
};

function isTimeReserved(time, reservedTimeRanges, eventDuration) {
  if (typeof eventDuration !== 'number' || eventDuration <= 0) {
    console.error(`Invalid event duration: "${eventDuration}". Expected a positive number.`);
    return false; // Or handle as per your application's requirements
  }

  if (!Array.isArray(reservedTimeRanges)) {
    console.error(
      `Invalid reservedTimeRanges: Expected an array, received ${typeof reservedTimeRanges}.`
    );
    return false; // Or handle as per your application's requirements
  }

  // Convert the start time string to a Date object
  const eventStart = timeStringToDate(time);

  if (!eventStart) {
    return false; // Invalid time string; decide how to handle
  }

  // Calculate the event end time by adding the duration
  const eventEnd = new Date(eventStart.getTime() + eventDuration * 60000); // eventDuration in minutes

  // Check for overlap with any reserved time range
  return reservedTimeRanges.some((range) => {
    if (!(range.start instanceof Date) || !(range.end instanceof Date)) {
      console.warn('Invalid range detected. "start" and "end" should be Date objects.');
      return false; // Skip invalid ranges
    }

    // Two intervals [a, b) and [c, d) overlap if a < d and c < b
    return eventStart < range.end && range.start < eventEnd;
  });
}

function generateHoursInRange(start, end) {
  const hours = [];
  let currentHour = new Date(start);

  while (currentHour < end) {
    // Use local time methods to get the hour and minute
    const hourString =
      currentHour.getHours().toString().padStart(2, '0') +
      ':' +
      currentHour.getMinutes().toString().padStart(2, '0'); // Format 'HH:MM'

    hours.push(hourString);
    currentHour.setMinutes(currentHour.getMinutes() + 30); // Increment by 30 minutes
  }

  return hours;
}

export const getAvaiableHoursFromDate = (
  startTimeRange,
  endTimeRange,
  reservedHours,
  eventDuration
) => {
  // Conver the service time range working hours to Date objects

  const startRange = new Date(startTimeRange);
  const endRange = new Date(endTimeRange);

  // Convert the already  booked hours to Date objects
  const reservedTimeRanges = reservedHours.map((reserved) => ({
    start: timeStringToDate(reserved.startHour),
    end: timeStringToDate(reserved.endHour),
  }));

  // Generate the available hours within the working hours
  const availableHours = generateHoursInRange(startRange, endRange);

  // Show the available hours and disable the reserved ones
  const hoursToDisplay = availableHours.map((hour) => ({
    time: hour,
    isDisabled: isTimeReserved(hour, reservedTimeRanges, eventDuration),
  }));

  return hoursToDisplay;
};

function buildISOString(utcTimeStr) {
  // Split the UTC time string into hours and minutes
  const [hour, minute] = utcTimeStr.split(':').map(Number);

  // Get the current date in UTC
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth(); // Months are zero-indexed (0-11)
  const day = now.getUTCDate();

  // Create a new Date object in UTC with the specified time
  const utcDate = new Date(Date.UTC(year, month, day, hour, minute, 0));

  // Convert the Date object to an ISO string
  const isoString = utcDate.toISOString(); // Example: "2024-11-11T15:00:00.000Z"

  return isoString;
}

export function convertLocalToUTC(localTimeStr, returnISO) {
  // Split the input string into hours and minutes
  const [inputHour, inputMinute] = localTimeStr.split(':').map(Number);

  // Get the current UTC offset in minutes
  const utcOffsetMinutes = dayjs().utcOffset(); // e.g., +240 for GMT+4, -180 for GMT-3

  // Convert UTC offset to hours
  const utcOffsetHours = utcOffsetMinutes / 60;

  // Calculate UTC hour
  let utcHour = inputHour - utcOffsetHours;

  // Handle wrapping around 24-hour format
  if (utcHour < 0) {
    utcHour += 24;
  } else if (utcHour >= 24) {
    utcHour -= 24;
  }

  // Format hours and minutes with leading zeros if necessary
  const formattedUTCHour = String(Math.floor(utcHour)).padStart(2, '0');
  const formattedUTCMinute = String(inputMinute).padStart(2, '0');
  const result = `${formattedUTCHour}:${formattedUTCMinute}`;
  if (returnISO) {
    return buildISOString(result);
  }
  return result;
}

export const isWithinMorningHours = (timeArray) => {
  // Function to convert time string to minutes for easier comparison
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr?.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Convert range boundaries to minutes
  const startMinutes = timeToMinutes('01:00'); // 1 AM
  const endMinutes = timeToMinutes('12:30'); // 11 AM

  // Check each time string
  const morningSlots = timeArray.filter((timeStr) => {
    const currentMinutes = timeToMinutes(timeStr);
    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  });

  return {
    hasMorningHours: morningSlots.length,
    morningSlots: morningSlots,
    totalMorningSlots: morningSlots.length,
    originalSlots: timeArray.length,
    hasOnlyMorningHours: morningSlots.length === timeArray.length && timeArray.length > 0,
  };
};

export function getNextWorkingDay(workDays = []) {
  try {
    const today = dayjs();

    // Default to all days if workDays is empty
    if (!workDays.length) {
      workDays = [...daysOfWeek];
    }

    // Normalize and deduplicate workDays, allowing for shuffled input
    const workDaysIndex = [
      ...new Set(workDays.map((day) => daysOfWeek.indexOf(day.toLowerCase()))),
    ].filter((index) => index !== -1);

    if (!workDaysIndex.length) {
      throw new Error('Invalid workDays array: must contain valid days of the week');
    }

    let nextDay = today;
    do {
      nextDay = nextDay.add(1, 'day');
    } while (!workDaysIndex.includes(nextDay.day()));

    return nextDay;
  } catch (error) {
    console.error('Error determining the next working day:', error.message);
    return dayjs(); // Return today's date in case of failure
  }
}
