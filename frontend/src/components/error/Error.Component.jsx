import { useEffect } from "react";
import { UilExclamationTriangle } from "@iconscout/react-unicons";
import { StyledError } from "./Error.Style";

const ErrorMessage = ({ message, onClear }) => {
  useEffect(() => {
    if (!message) return;

    // Set a timer to clear the error after 5 seconds
    const timer = setTimeout(() => {
      if (onClear) onClear();
    }, 5000);

    // Cleanup the timer if the component unmounts or message changes
    return () => clearTimeout(timer);
  }, [message, onClear]);

  if (!message) return null;

  return (
    <StyledError>
      <UilExclamationTriangle size="18" />
      {message}
    </StyledError>
  );
};

export default ErrorMessage;
