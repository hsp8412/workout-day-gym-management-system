import React, { useState } from 'react';
import { Button, Card, Container, FloatingLabel, Form, Modal, Pagination, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const lockers = [
    {
        facilityId: "54",
        lockerNo: "1",
        isReserved: "Yes",
        renterId: "3",
        renterName: "Arthur",
        startDate: "2022-02-12",
        endDate: "2022-03-12"
    },
    {
        facilityId: "55",
        lockerNo: "2",
        isReserved: "No"
    },
    {
        facilityId: "56",
        lockerNo: "3",
        isReserved: "No"
    },
    {
        facilityId: "57",
        lockerNo: "4",
        isReserved: "No"
    },
    {
        facilityId: "58",
        lockerNo: "5",
        isReserved: "Yes",
        renterId: "2",
        renterName: "John",
        startDate: "2022-03-10",
        endDate: "2022-04-10"
    },
    {
        facilityId: "59",
        lockerNo: "6",
        isReserved: "No",
    },

];

const empty = {
    facilityId: "",
    lockerNo: "",
    isReserved: "",
    renterId: "",
    renterName: "",
    startDate: "",
    endDate: ""
};

const Locker = () => {
    const [show, setShow] = useState(false);
    const [locker, setLocker] = useState(empty);
    const handleClose = () => setShow(false);
    const handleShow = (c) => {
        setShow(true)
        setLocker(c);
    };

    const getTableContent = () => {
        return lockers.map(c =>
            <tr key={c.facilityId}>
                <td>{c.facilityId}</td>
                <td>{c.lockerNo}</td>
                <td>{c.isReserved}</td>
                <td>{c.renterId}</td>
                <td>{c.renterName}</td>
                <td>{c.startDate}</td>
                <td>{c.endDate}</td>
                <td><Button className="pb-0 pt-0" variant="danger" onClick={() => handleShow(c)}>Edit</Button></td>
            </tr>)
    };

    return (
        <div>
            <Container className="my-2">
                <h1>Locker</h1>
                <Card>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Facility ID</th>
                                <th>Locker Number</th>
                                <th>Is Reserved</th>
                                <th>Renter ID</th>
                                <th>Renter Name</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Edit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {getTableContent()}
                            </tbody>
                        </Table>

                        {/* Implement this (this causes error) !!!!!!!!*/}
                        <Pagination s>
                            <Pagination.Item>
                                {"<"}
                            </Pagination.Item>
                            <Pagination.Item active>
                                1
                            </Pagination.Item>
                            <Pagination.Item>
                                {">"}
                            </Pagination.Item>
                        </Pagination>

                        <Button as={Link} to="/branch">Back</Button>
                        <Button onClick={() => handleShow(empty)} className="mx-3">Add</Button>
                    </Card.Body>
                </Card>
            </Container>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{locker === empty ? "Add a locker" : "Edit a locker"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Locker Number">
                                <Form.Control type="text"
                                              placeholder=" "
                                              value={locker.lockerNo}
                                              onChange={(e) => {setLocker({...locker, lockerNo: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Select value={locker.isReserved}
                                         onChange={(e) => {setLocker({...locker, isReserved: e.currentTarget.value})}}
                                         size="lg"
                                         style={{fontSize: "16px", paddingLeft: "12px", paddingTop: "16px", paddingBottom: "16px"}}>
                                <option>Select</option>
                                <option value="Yes">Reserved</option>
                                <option value="No">Not reserved</option>
                            </Form.Select>
                        </Form.Group>
                        {locker.isReserved === "Yes" &&
                            <div>
                            <Form.Group className="mb-2">
                                <FloatingLabel label="Renter ID">
                                    <Form.Control type="text"
                                                  placeholder=" "
                                                  value={locker.renterId}
                                                  onChange={(e) => {setLocker({...locker, renterId: e.currentTarget.value})}}/>
                                </FloatingLabel>
                            </Form.Group>
                                <Form.Group className="mb-2">
                                    <FloatingLabel label="Renter Name">
                                        <Form.Control type="text"
                                                      placeholder=" "
                                                      value={locker.renterName}
                                                      onChange={(e) => {setLocker({...locker, renterName: e.currentTarget.value})}}/>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <FloatingLabel label="Start Date">
                                        <Form.Control type="text"
                                                      placeholder=" "
                                                      value={locker.startDate}
                                                      onChange={(e) => {setLocker({...locker, startDate: e.currentTarget.value})}}/>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <FloatingLabel label="End Date">
                                        <Form.Control type="text"
                                                      placeholder=" "
                                                      value={locker.endDate}
                                                      onChange={(e) => {setLocker({...locker, endDate: e.currentTarget.value})}}/>
                                    </FloatingLabel>
                                </Form.Group>

                        </div>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        {locker === empty ? "Add" : "Save changes"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Locker;