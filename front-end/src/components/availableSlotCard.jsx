import React from "react";
import getTimeSlots from "../services/availableTimeSlot";
import allViews from "react-calendar/dist/umd/Calendar";
import { getCoachById } from "../services/coach";
import { getBranchById } from "../services/branch";
import { useFormik } from "formik";
import * as Yup from "yup";

const AvailableSlotCard = ({ dateSelected, setSlotSelected, slotSelected }) => {
  function getTimeSlotEntry(timeSlot) {
    let result = "";
    let branch = getBranchById(timeSlot.branchId).name;
    result += branch + " ";

    let startTime = toISOLocal(timeSlot.startTime);
    let endTime = toISOLocal(timeSlot.endTime);

    startTime = startTime.substring(11, 16);
    endTime = endTime.substring(11, 16);
    result += " " + startTime + "-" + endTime;
    let coach = getCoachById(timeSlot.coachId).name;
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

  const availableSlots = getTimeSlots();
  const filtered = availableSlots.filter((timeSlot) => {
    return (
      dateSelected.getFullYear() == timeSlot.startTime.getFullYear() &&
      dateSelected.getMonth() + 1 == timeSlot.startTime.getMonth() &&
      dateSelected.getDate() == timeSlot.startTime.getDate() &&
      timeSlot.isBooked == false
    );
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
