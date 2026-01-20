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
    overflow: hidden;
  }

  .react-datepicker__header {
    background-color: var(--color-bg);
    border-bottom: 1px solid var(--color-low-opacity-border);
    padding: 15px 0 10px 0;
  }

  .react-datepicker__navigation {
    display: none;
  }

  .react-datepicker__current-month {
    display: none;
  }

  /* Container for the dropdowns */
  .react-datepicker__header__dropdown {
    margin: 0;
    display: flex;
    justify-content: center;
    gap: 12px;
  }

  .react-datepicker__month-select,
  .react-datepicker__year-select {
    background-color: var(--color-card-bg);
    color: var(--color-text);
    border: 1px solid var(--color-low-opacity-border);
    border-radius: 4px;
    padding: 2px 4px;
    font-family: var(--font-main);
    font-size: 0.85rem;
    cursor: pointer;
    outline: none;

    &:hover {
      border-color: var(--color-highlight);
    }

    option {
      background-color: var(--color-bg);
      color: var(--color-text);
    }
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

  button {
    padding: 6px 16px;
    font-size: 0.8rem;
  }
`;
