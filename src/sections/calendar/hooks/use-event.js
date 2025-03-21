import { useMemo } from 'react';
import merge from 'lodash/merge';

import { CALENDAR_COLOR_OPTIONS } from 'src/_mock/_calendar';

// ----------------------------------------------------------------------

export default function useEvent(events, selectEventId, selectedRange, openForm) {
  const currentEvent = events.find((event) => event._id === selectEventId);
  const defaultValues = useMemo(
    () => ({
      id: '',
      service: '',
      studentName: '',
      studentEmail: '',
      color: CALENDAR_COLOR_OPTIONS[1],
      sendEmail: false,
      duration: '',
      start: selectedRange ? selectedRange.start : new Date().getTime(),
      end: selectedRange ? selectedRange.end : new Date().getTime(),
    }),
    [selectedRange]
  );

  if (!openForm) {
    return undefined;
  }

  if (currentEvent || selectedRange) {
    const merged = merge({}, defaultValues, currentEvent);

    return { ...merged, service: merged.serviceId };
  }
  return defaultValues;
}
