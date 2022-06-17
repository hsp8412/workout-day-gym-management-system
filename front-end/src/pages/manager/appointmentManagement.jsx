import React, { useEffect, useState } from 'react';
import { Button, Card, Container, FloatingLabel, Form, Modal, Table } from "react-bootstrap";
import MyPagination from "../../utils/pagination";
import { Link } from "react-router-dom";
import http from "../../services/httpService";
import Calendar from "react-calendar";

const empty = {
    coachId: "",
    date: 0,
    slot: 0,
    customerId: ""
};

const coachUri = process.env.REACT_APP_API_ENDPOINT + "/branch_staff/coach"
const uri = process.env.REACT_APP_API_ENDPOINT + "/appointment/";
const itemsPerPage = 10;
const offset = 8;

const AppointmentManagement = () => {
    const [coaches, setCoaches] = useState([]);
    const [value, setValue] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const [show, setShow] = useState(false);
    const [appointment, setAppointment] = useState(empty);
    const [currentPage, setPage] = useState(1);
    const handleClose = () => setShow(false);
    const handleSave = async () => {
        const newAppointment = {...appointment}
        newAppointment.date = Math.floor(value.getTime() / 1000 / 86400);
        await http.put(uri + appointment._id, newAppointment);
        const data = await http.get(uri);
        setAppointments(data.data);
        handleClose();
    };
    const handleEdit = (c) => {
        setAppointment(c);
        setShow(true);
    }
    const handleDelete = async () => {
        await http.delete(uri + appointment._id);
        const data = await http.get(uri);
        setAppointments(data.data);
        handleClose();
    };

    const getCoaches = () => {
        return coaches.map(c => <option value={c.coachId} key={c.coachId}>{c.firstName + " " + c.lastName}</option> )
    }

    const getOptions = (num) => {
        const arr = Array.from(Array(num).keys())
        return arr.map(num => <option value={num} key={num}>{`${num+offset}:00-${num+offset+1}:00`}</option> )
    }

    const getPagedItems = (items) => {
        return items.filter(item => (items.indexOf(item) >= (currentPage - 1) * itemsPerPage) && (items.indexOf(item) < currentPage * itemsPerPage));
    };

    useEffect(() => {
        async function fetchData() {
            const appointments = await http.get(uri);
            const coaches = await http.get(coachUri);
            setAppointments(appointments.data);
            setCoaches(coaches.data)
        }
        fetchData();
    }, []);

    const getTableContent = (appointments) => {
        return appointments.map(c =>
            <tr key={c._id}>
                <td>{c._id}</td>
                <td>{c.coachId}</td>
                <td>{new Date((c.date+0.25) * 1000 * 86400).toString().slice(4, 15)}</td>
                <td>{`${c.slot+offset}:00-${c.slot+offset+1}:00`}</td>
                <td>{c.customerId}</td>
                <td><Button className="pb-0 pt-0" variant="danger" onClick={() => handleEdit(c)}>Edit</Button></td>
            </tr>)
    };

    return (
        <div>
            <Container className="my-2">
                <h1>Appointment</h1>
                <Card>
                    <Card.Body>
                        <Table striped bappointmented hover>
                            <thead>
                            <tr>
                                <th>Appointment ID</th>
                                <th>Coach ID</th>
                                <th>Date</th>
                                <th>Slot</th>
                                <th>Customer ID</th>
                                <th>Edit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {getTableContent(getPagedItems(appointments))}
                            </tbody>
                        </Table>

                        <MyPagination onPageChange={setPage}
                                      currentPage={currentPage}
                                      itemsPerPage={itemsPerPage}
                                      totalItems={appointments.length}/>
                        <Button as={Link} to="/branch/manage">Back</Button>
                    </Card.Body>
                </Card>
            </Container>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit an appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Calendar onChange={setValue} value={value} locale="en"/>
                        <div>Timeslot</div>
                        <Form.Group className="mb-2">
                            <Form.Select value={appointment.slot}
                                         onChange={(e) => {
                                             setAppointment({...appointment, slot: parseInt(e.currentTarget.value)})
                                         }}
                                         size="lg"
                                         style={{fontSize: "16px", paddingLeft: "12px", paddingTop: "16px", paddingBottom: "16px"}}>
                                {getOptions(9)}
                            </Form.Select>
                        </Form.Group>
                        <div>Coach</div>
                        <Form.Group className="mb-2">
                            <Form.Select value={appointment.coachId}
                                         onChange={(e) => {
                                             setAppointment({...appointment, coachId: e.currentTarget.value})
                                         }}
                                         size="lg"
                                         style={{fontSize: "16px", paddingLeft: "12px", paddingTop: "16px", paddingBottom: "16px"}}>
                                {getCoaches()}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Customer ID">
                                <Form.Control type="text"
                                              placeholder=" "
                                              value={appointment.customerId}
                                              onChange={(e) => {setAppointment({...appointment, customerId: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AppointmentManagement;