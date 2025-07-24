import { useState, useRef } from "react";

export default function useDebouncedApi(callback, delay = 600) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const timeout = useRef(null);

  const trigger = async (value) => {
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(async () => {
      if (!value) return;

      try {
        setLoading(true);
        const response = await callback(value);
        setResult(response);
        setError(null);
      } catch (err) {
        setResult(null);
        setError(err);
      } finally {
        setLoading(false);
      }
    }, delay);
  };

  return { trigger, loading, result, error };
}
