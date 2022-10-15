import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import http from "../../services/httpService";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";

const coachUri = process.env.REACT_APP_API_ENDPOINT + "/branch_staff/coach";
const apUri = process.env.REACT_APP_API_ENDPOINT + "/appointment";

const array = Array.from(Array(9).keys());
const customerId = localStorage.getItem("id");

const offset = 8;

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [occupiedSlots, setOccupiedSlots] = useState(array);
  const [coaches, setCoaches] = useState([]);
  const [coach, setCoach] = useState({});
  const [value, setValue] = useState(new Date());
  const [date, setDate] = useState(0);
  const [slot, setSlot] = useState(-1);

  useEffect(() => {
    async function fetchData() {
      const coaches = await http.get(coachUri);
      const appointments = await http.get(apUri + "/" + customerId);
      setCoaches(coaches.data);
      setAppointments(appointments.data);
    }
    fetchData();
  }, []);

  const handleCoachSelect = async (c) => {
    setCoach(c);
    setSlot(-1);
    const date = Math.floor(value.getTime() / 1000 / 86400);
    const coachId = c.coachId;
    setOccupiedSlots(array);
    const occupiedSlots = await http.get(apUri + "/" + date + "/" + coachId);
    setOccupiedSlots(occupiedSlots.data);
  };
  const handleCalendarSelect = async (d) => {
    setValue(d);
    setCoach({});
    setOccupiedSlots(array);
    setSlot(-1);
  };
  const handleSubmit = async () => {
    const data = {
      coachId: coach.coachId,
      date: Math.floor(value.getTime() / 1000 / 86400),
      slot,
      customerId,
    };
    try {
      await http.post(apUri, data);
      window.location.reload();
    } catch (e) {}
  };
  const handleDelete = async (a) => {
    await http.delete(apUri + "/" + a._id);
    window.location.reload();
  };

  const getAppointmentContent = (a) => {
    const c = coaches.find((c) => c.coachId === a.coachId);
    const date = new Date((a.date + 0.25) * 1000 * 86400);
    const result = [];
    result[0] = <div>{"Coach: " + c.firstName + " " + c.lastName}</div>;
    result[1] = <div>{"Date: " + date.toString().slice(0, 15)}</div>;
    result[2] = (
      <div>
        {"Timeslot: " + `${a.slot + offset}:00 - ${a.slot + offset + 1}:00`}
      </div>
    );
    return result;
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h3>Date</h3>
              <hr />
              <Calendar
                onChange={handleCalendarSelect}
                value={value}
                locale="en"
              />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <h3>Coach</h3>
              <hr />
              <ListGroup>
                {coaches.map((c) => (
                  <ListGroup.Item
                    action
                    key={c.coachId}
                    active={c === coach}
                    onClick={() => handleCoachSelect(c)}
                  >
                    {c.firstName + " " + c.lastName}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <h3>Timeslot</h3>
              <hr />
              <ListGroup>
                {array.map((a) => (
                  <ListGroup.Item
                    action
                    key={a}
                    active={slot === a}
                    disabled={occupiedSlots.indexOf(a) >= 0}
                    onClick={() => setSlot(a)}
                  >
                    {`${a + offset}:00-${a + offset + 1}:00`}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="p-3">
        <Button disabled={slot === -1} onClick={handleSubmit}>
          Make an appointment
        </Button>
      </Row>
      <Card>
        <Card.Body>
          <h3>My Appointments</h3>
          <hr />
          {appointments.map((a) => (
            <Card>
              <Card.Body className="d-flex flex-row justify-content-between">
                <div>{getAppointmentContent(a)}</div>
                <Button variant="danger" onClick={() => handleDelete(a)}>
                  Cancel
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Appointments;
