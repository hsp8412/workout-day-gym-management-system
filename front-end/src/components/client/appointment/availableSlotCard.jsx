import React, { useState } from "react";

const AvailableSlotCard = ({
  dateSelected,
  setSlotSelected,
  slotSelected,
  timeslots,
}) => {
  const [allTimeslots, setTimeSlots] = useState([]);
  function getTimeSlotEntry(timeSlot) {
    const branch = timeSlot.branch;
    let result = "";
    result += branch + " ";

    let startTimeDate = new Date(timeSlot.startTime);
    let endTimeDate = new Date(timeSlot.endTime);
    let startTime = toISOLocal(startTimeDate);
    let endTime = toISOLocal(endTimeDate);

    startTime = startTime.substring(11, 16);
    endTime = endTime.substring(11, 16);
    result += " " + startTime + "-" + endTime;

    let coach = timeSlot.coach;
    result += " " + coach;
    return result;
  }

  function toISOLocal(d) {
    let z = (n) => ("0" + n).slice(-2);
    let zz = (n) => ("00" + n).slice(-3);
    let off = d.getTimezoneOffset();
    let sign = off > 0 ? "-" : "+";
    off = Math.abs(off);

    return (
      d.getFullYear() +
      "-" +
      z(d.getMonth() + 1) +
      "-" +
      z(d.getDate()) +
      "T" +
      z(d.getHours()) +
      ":" +
      z(d.getMinutes()) +
      ":" +
      z(d.getSeconds()) +
      "." +
      zz(d.getMilliseconds()) +
      sign +
      z((off / 60) | 0) +
      ":" +
      z(off % 60)
    );
  }

  const filtered = timeslots.filter((timeslot) => {
    const startTime = new Date(timeslot.startTime);
    const flag =
      dateSelected.getFullYear() == startTime.getFullYear() &&
      dateSelected.getMonth() == startTime.getMonth() &&
      dateSelected.getDate() == startTime.getDate() &&
      timeslot.isBooked == false;
    return flag;
  });

  function renderRadio() {
    const radios = filtered.map((timeSlot) => (
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="exampleRadios"
          id="exampleRadios1"
          value={timeSlot._id}
          checked={slotSelected ? slotSelected._id == timeSlot._id : false}
          onChange={() => {
            setSlotSelected(timeSlot);
          }}
        />
        <label className="form-check-label" htmlFor="exampleRadios1">
          {getTimeSlotEntry(timeSlot)}
        </label>
      </div>
    ));
    return radios;
  }
  // console.log(filtered);
  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">Available coaches and time slot:</h5>
        <form>
          <div role="group" className="card-text d-flex flex-column">
            {filtered.length > 0 ? (
              renderRadio()
            ) : (
              <p>No available slot for the selected day.</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AvailableSlotCard;
