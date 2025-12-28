import { UilExclamationTriangle } from "@iconscout/react-unicons";
import { StyledError } from "./Error.Style";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <StyledError>
      <UilExclamationTriangle size="18" />
      {message}
    </StyledError>
  );
};

export default ErrorMessage;
