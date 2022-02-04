import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false); // This state lets the user that the request is loading.
  const [error, setError] = useState(null); // This state stores errors that comes from the api

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        // This request logic MUST be configurable in order to make this custom hook flexible.
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null, // Method, headers, & body are the 2nd parameters for the fetch function.
      });

      if (!response.ok) {
        throw new Error("Request failed!"); // Pt 1 evaluation:  This evaluates if the response is not good.
      }

      const data = await response.json(); // Pt 2 evaluation:  This evaluates if the response is working fine  Pt1/2 evaluates the response from the database.
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!"); // This is the error state
    }
    setIsLoading(false);
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
