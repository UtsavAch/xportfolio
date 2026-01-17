import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import { DatePickerWrapper, CalendarFooter } from "./DateInput.Style";
import { StyledInput } from "../input/Input.Style";
import Button from "../button/Button.Component";

const DateInput = ({ value, onChange, placeholder }) => {
  const calendarRef = useRef(null);
  const selectedDate = value ? new Date(value) : null;

  return (
    <DatePickerWrapper>
      <DatePicker
        ref={calendarRef}
        selected={selectedDate}
        onChange={(date) => onChange(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder}
        customInput={<StyledInput />}
        // This allows us to add custom elements inside the calendar popup
        shouldCloseOnSelect={true}
      >
        <CalendarFooter>
          <Button
            type="secondary"
            onClick={() => calendarRef.current.setOpen(false)}
          >
            Close
          </Button>
        </CalendarFooter>
      </DatePicker>
    </DatePickerWrapper>
  );
};

export default DateInput;
