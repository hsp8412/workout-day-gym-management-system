import React, { useState } from "react";
import Calendar from "react-calendar";

const DateCalendar = ({ onChange, value }) => {
  return (
    <Calendar
      onChange={onChange}
      value={value}
      locale="en-US"
      className="mr-4"
    />
  );
};

export default DateCalendar;
