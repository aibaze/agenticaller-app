import useSWR from 'swr';
import { useMemo } from 'react';
import keyBy from 'lodash/keyBy';

import { standardfetcher, fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetLabels(coachId) {
  const URL = `/request/coach/${coachId}/types`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      labels: data?.labels || [],
      labelsLoading: isLoading,
      labelsError: error,
      labelsValidating: isValidating,
      labelsEmpty: !isLoading && !data?.labels.length,
    }),
    [data?.labels, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetRequests(coachId ,type , searchTerm) {



  const memoizedValue = useMemo(() => {
 
    return {
      requests: { byId: [], allIds: [] },
      requestsLoading: null,
      mailsError: null,
      mailsValidating: false,
      mailsEmpty: true,
      refetch: mutate,
    };
  }, []);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetMail(mailId) {
  const URL = mailId
    ? [
        `/request/${mailId}`,
        {
          /*  params: { mailId }  */
        },
      ]
    : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      mail: data?.request,
      mailLoading: isLoading,
      mailError: error,
      mailValidating: isValidating,
    }),
    [data?.request, error, isLoading, isValidating]
  );

  return memoizedValue;
}
