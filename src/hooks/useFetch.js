import { useCallback, useEffect, useMemo, useState } from 'react';
import { buildApiUrl } from '../config';

const DEBUG_FETCH_DELAY_MS = Number(import.meta.env.VITE_DEBUG_FETCH_DELAY_MS || 0);

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isJsonResponse(response) {
  const contentType = response.headers.get('content-type') || '';
  return contentType.includes('application/json');
}

async function readResponseBody(response) {
  if (response.status === 204) {
    return null;
  }

  if (isJsonResponse(response)) {
    return response.json();
  }

  const text = await response.text();
  return text.trim() ? text : null;
}

function getErrorMessage(response, payload) {
  if (typeof payload === 'string' && payload.trim()) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    return payload.detail || payload.message || payload.error || `Request failed (${response.status})`;
  }

  return `Request failed (${response.status})`;
}

export async function requestApi(path, options = {}) {
  const { method = 'GET', body, headers = {}, signal } = options;
  const url = buildApiUrl(path);
  const requestHeaders = { ...headers };
  const requestOptions = {
    method,
    headers: requestHeaders,
    signal,
  };

  if (body !== undefined) {
    requestOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
    if (!requestHeaders['Content-Type'] && !requestHeaders['content-type']) {
      requestHeaders['Content-Type'] = 'application/json';
    }
  }

  const response = await fetch(url, requestOptions);
  const payload = await readResponseBody(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(response, payload));
  }

  if (DEBUG_FETCH_DELAY_MS > 0) {
    await wait(DEBUG_FETCH_DELAY_MS);
  }

  return payload;
}

export default function useFetch(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestTick, setRequestTick] = useState(0);

  const url = useMemo(() => buildApiUrl(path), [path]);
  const request = useCallback((options = {}) => requestApi(path, options), [path]);

  useEffect(() => {
    const controller = new AbortController();
    // Guard against race conditions:
    // if the user navigates quickly, an older request may resolve after a newer one.
    // We only update state while this effect instance is still the active one.
    let isActive = true;

    async function load() {
      setLoading(true);
      setError('');

      try {
        const payload = await requestApi(path, { signal: controller.signal });
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

  // Consumer-friendly retry API: components can call refetch() without coupling
  // to URL construction or effect dependencies.
  const refetch = () => setRequestTick((tick) => tick + 1);

  return { data, loading, error, refetch, request };
}
