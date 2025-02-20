/**
 * Check if a page has been rendered before
 *
 * @param {string} serviceId - The unique identifier for the service.
 */
const useHasBeenRenderedBefore = (entity, entityId) => {
  const STORAGE_KEY = `hasBeenRenderedBefore_${entity}`;
  const SERVICE_ID_STORAGE_KEY = `${STORAGE_KEY}_${entityId}_${entity}`;
  const COACH_ID_STORAGE_KEY = `${STORAGE_KEY}_${entityId}_${entity}`;

  const checkHasBeenRenderedBefore = () => {
    const localStorageValue = localStorage.getItem(
      entity === 'coach' ? COACH_ID_STORAGE_KEY : SERVICE_ID_STORAGE_KEY
    );
    if (localStorageValue === 'true') return true;
    return false;
  };

  const setFirstRender = () => {
    localStorage.setItem(
      entity === 'coach' ? COACH_ID_STORAGE_KEY : SERVICE_ID_STORAGE_KEY,
      'true'
    );
  };

  return {
    checkHasBeenRenderedBefore,
    setFirstRender,
  };
};

export default useHasBeenRenderedBefore;
