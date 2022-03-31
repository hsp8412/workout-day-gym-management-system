import React, { useState } from "react";
import Calendar from "react-calendar";

const DateCalendar = (props) => {
  const [value, onChange] = useState(new Date());

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
