import { useState, useCallback } from "react";

const useErrorMessage = (initialValue = "") => {
  const [error, setError] = useState(initialValue);

  const handler = useCallback((errMessage) => {
    setError(errMessage);
    setTimeout(() => {
      setError("");
    }, 2000);
  }, []);

  return [error, handler];
};

export default useErrorMessage;
