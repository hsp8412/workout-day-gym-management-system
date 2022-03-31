import React, { useState } from 'react';
import { Button, Card, Container, FloatingLabel, Form, Modal, Pagination, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const allStaff = [
    {
        firstName: "Jack",
        lastName: "Smith",
        ssn: "12332412",
        email: "jack1@gmail.com",
        address: "10 Brentwood Common NW, Calgary, AB",
        phone: "823-231-0234",
        salary: "52231.3",
        isCoach: "Yes"
    },
    {
        firstName: "Andy",
        lastName: "Dufresne",
        ssn: "15233242",
        email: "andyd1@gmail.com",
        address: "3840 Brentwood Common NW, Calgary, AB",
        phone: "821-311-4254",
        salary: "432324.2",
        isCoach: "No"
    },
    {
        firstName: "Carey",
        lastName: "Williamson",
        ssn: "23122123",
        email: "carey2@gmail.com",
        address: "102 Morley Trail NW, Calgary, AB",
        phone: "821-341-6434",
        salary: "42437.6",
        isCoach: "No"
    },
    {
        firstName: "Ryan",
        lastName: "Hamilton",
        ssn: "132552321",
        email: "ryann@hotmail.com",
        address: "113 Banff Trail NW, Calgary, AB",
        phone: "823-312-4531",
        salary: "63221.5",
        isCoach: "Yes"
    },
    {
        firstName: "Tony",
        lastName: "Stark",
        ssn: "12324212",
        email: "tonyrich@gmail.com",
        address: "Stark Industrial Building, New York City, NY",
        phone: "888-888-8888",
        salary: "52231.3",
        isCoach: "Yes"
    },
    {
        firstName: "Amir",
        lastName: "Ahmed",
        ssn: "23451232",
        email: "amirahmed@gmail.com",
        address: "4031 Charleswood Drive NW, Calgary, AB",
        phone: "811-8321-9246",
        salary: "63334.9",
        isCoach: "Yes"
    },

];

const empty = {
    firstName: "",
    lastName: "",
    ssn: "",
    email: "",
    address: "",
    phone: "",
    salary: "",
    isCoach: ""
};

const Staff = () => {
    const [show, setShow] = useState(false);
    const [staff, setStaff] = useState(empty);
    const handleClose = () => setShow(false);
    const handleShow = (c) => {
        setShow(true)
        setStaff(c);
    };

    const getTableContent = () => {
        return allStaff.map(c =>
            <tr key={c.ssn}>
                <td>{c.firstName}</td>
                <td>{c.lastName}</td>
                <td>{c.ssn}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.address}</td>
                <td>{c.salary}</td>
                <td>{c.isCoach}</td>
                <td><Button className="pb-0 pt-0" variant="danger" onClick={() => handleShow(c)}>Edit</Button></td>
            </tr>)
    };

    return (
        <div>
            <Container className="my-2">
                <h1>Staff</h1>
                <Card>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>SSN</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Salary</th>
                                <th>Is Coach</th>
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
                    <Modal.Title>{staff === empty ? "Add a staff" : "Edit a staff"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="First Name">
                                <Form.Control type="text"
                                              placeholder=" "
                                              value={staff.firstName}
                                              onChange={(e) => {setStaff({...staff, firstName: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Last Name">
                                <Form.Control type="text"
                                              placeholder=" "
                                              value={staff.lastName}
                                              onChange={(e) => {setStaff({...staff, lastName: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="SSN">
                                <Form.Control type="text"
                                              placeholder=" "
                                              value={staff.ssn}
                                              onChange={(e) => {setStaff({...staff, ssn: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Email">
                                <Form.Control type="text"
                                              placeholder=" "
                                              value={staff.email}
                                              onChange={(e) => {setStaff({...staff, email: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Phone">
                                <Form.Control type="text"
                                              placeholder=" "
                                              value={staff.phone}
                                              onChange={(e) => {setStaff({...staff, phone: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Address">
                                <Form.Control type="text"
                                              placeholder=" "
                                              value={staff.address}
                                              onChange={(e) => {setStaff({...staff, address: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Salary">
                                <Form.Control type="text"
                                              placeholder=" "
                                              value={staff.salary}
                                              onChange={(e) => {setStaff({...staff, salary: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Select value={staff.isCoach}
                                         onChange={(e) => {setStaff({...staff, isCoach: e.currentTarget.value})}}
                                         size="lg"
                                         style={{fontSize: "16px", paddingLeft: "12px", paddingTop: "16px", paddingBottom: "16px"}}>
                                <option>Select</option>
                                <option value="Yes">Is a coach</option>
                                <option value="No">Not a coach</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        {staff === empty ? "Add" : "Save changes"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Staff;