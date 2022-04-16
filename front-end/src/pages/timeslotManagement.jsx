import React, { useEffect, useState } from "react";
import ATable from "../components/atable";
import http from "../services/httpService";
import { Button } from "react-bootstrap";

const TimeslotManagement = () => {
  const [timeslots, setTimeslots] = useState([]);
  const [deleteShow, setDeleteShow] = useState(false);
  const [newShow, setNewShow] = useState(false);
  const [timeslotToDelete, setTimeSlotToDelete] = useState();

  const uri = process.env.REACT_APP_API_ENDPOINT + "/timeslot";

  useEffect(() => {
    async function fetchData() {
      const data = await http.get(uri);
      setTimeslots(data.data);
    }
    fetchData();
  }, []);

  const handleDelete = (timeslot) => {
    setTimeSlotToDelete(timeslot);
    setDeleteShow(true);
  };

  const handleNewTimeslot = () => {
    setNewShow(true);
  };

  return (
    <div>
      <div>
        <h3>Timeslot Management</h3>
      </div>
      <div>
        <ATable allAppointments={timeslots} onDelete={handleDelete} />
      </div>
      <div>
        <Button variant="primary" className="mx-2" onClick={handleNewTimeslot}>
          Create New Timeslot
        </Button>
      </div>
    </div>
  );
};

export default TimeslotManagement;
