import { useState, useEffect, useCallback } from "react";

/**
 *
 * @param {*} initialValue
 * @returns
 */
const useErrorMessage = (initialValue = "") => {
  const [error, setError] = useState(initialValue);
  const showMessage = useCallback((errMessage) => {
    setError(errMessage);
  }, []);

  useEffect(() => {
    const hideMessage = setTimeout(() => {
      setError("");
    }, 2000);

    return () => clearTimeout(hideMessage);
  }, [error]);

  return [error, showMessage];
};

export default useErrorMessage;
