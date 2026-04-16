import { useEffect, useMemo, useState } from 'react';
import { buildApiUrl } from '../config';

const DEBUG_FETCH_DELAY_MS = Number(import.meta.env.VITE_DEBUG_FETCH_DELAY_MS || 0);

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function useFetch(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestTick, setRequestTick] = useState(0);

  const url = useMemo(() => buildApiUrl(path), [path]);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    async function load() {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }

        const payload = await response.json();
        // Optional local testing delay to make loading states clearly visible.
        if (DEBUG_FETCH_DELAY_MS > 0) {
          await wait(DEBUG_FETCH_DELAY_MS);
        }
        if (isActive) {
          setData(payload);
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          return;
        }
        if (isActive) {
          setError(err.message || 'Unable to load data.');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [url, requestTick]);

  const refetch = () => setRequestTick((tick) => tick + 1);

  return { data, loading, error, refetch };
}
