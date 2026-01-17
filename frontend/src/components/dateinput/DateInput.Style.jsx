import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

export const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker {
    background-color: var(--color-card-bg);
    border: 1px solid var(--color-low-opacity-border);
    border-radius: var(--radius);
    font-family: var(--font-main);
    box-shadow: var(--shadow);
    color: var(--color-text);
    overflow: hidden; /* Ensures footer doesn't break border radius */
  }

  /* ... keep your previous styles for header and days ... */

  .react-datepicker__header {
    background-color: var(--color-bg);
    border-bottom: 1px solid var(--color-low-opacity-border);
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name {
    color: var(--color-text);
  }

  .react-datepicker__day {
    color: var(--color-text);
    &:hover {
      background-color: rgba(249, 178, 123, 0.2);
    }
  }

  .react-datepicker__day--selected {
    background-color: var(--color-highlight) !important;
    color: var(--color-icon-dark) !important;
  }
`;

export const CalendarFooter = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  background-color: var(--color-bg);
  border-top: 1px solid var(--color-low-opacity-border);

  /* Make the close button slightly smaller to fit well */
  button {
    padding: 6px 16px;
    font-size: 0.8rem;
  }
`;
