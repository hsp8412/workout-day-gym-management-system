import React, { useState } from 'react';
import { Table, Container, Button, Modal, Form, FloatingLabel, Card, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

const customers = [
    {
        id: 1,
        firstName: "Maria",
        lastName: "Otto",
        phone: "825-988-9231",
        email: "mariaotto1@gmail.com",
        username: "maria111",
        password: "123123123",
        status: "Active",
        gender: "Female",
        emergencyContact: "821-101-3213",
    },
    {
        id: 2,
        firstName: "John",
        lastName: "Marston",
        phone: "821-123-4232",
        email: "jmarston@gmail.com",
        username: "john",
        password: "123123123",
        status: "Active",
        gender: "Male",
        emergencyContact: "823-502-2121",
    },
    {
        id: 3,
        firstName: "Arthur",
        lastName: "Morgan",
        phone: "825-662-1251",
        email: "arthur1@gmail.com",
        username: "goodman1",
        password: "123123123",
        status: "Active",
        gender: "Male",
        emergencyContact: "814-121-0123",
    },
    {
        id: 4,
        firstName: "Dutch",
        lastName: "van der Linde",
        phone: "825-132-4291",
        email: "dutch222@gmail.com",
        username: "ihaveaplan",
        password: "123123123",
        status: "Active",
        gender: "Female",
        emergencyContact: "825-321-1291",
    },
];

const empty = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    status: "",
    gender: "",
    emergencyContact: ""
}

const Customer = () => {
    const [show, setShow] = useState(false);
    const [customer, setCustomer] = useState(empty);
    const handleClose = () => setShow(false);
    const handleShow = (c) => {
        setShow(true)
        setCustomer(c);
    };

    const getTableContent = () => {
        return customers.map(c =>
            <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.firstName}</td>
                <td>{c.lastName}</td>
                <td>{c.gender}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
                <td>{c.username}</td>
                <td>{c.status}</td>
                <td>{c.emergencyContact}</td>
                <td><Button className="pb-0 pt-0" variant="danger" onClick={() => handleShow(c)}>Edit</Button></td>
            </tr>)
    };

    return (
        <div>
            <Container className="my-2">
                <h1>Customer</h1>
                <Card>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Gender</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Status</th>
                                <th>Emergency Contact</th>
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
                    <Modal.Title>{customer === empty ? "Add a customer" : "Edit a customer"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="First Name">
                                <Form.Control type="text"
                                              placeholder="first"
                                              value={customer.firstName}
                                              onChange={(e) => {setCustomer({...customer, firstName: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Last Name">
                                <Form.Control type="text"
                                              placeholder="last"
                                              value={customer.lastName}
                                              onChange={(e) => {setCustomer({...customer, lastName: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Select value={customer.gender}
                                         onChange={(e) => {setCustomer({...customer, gender: e.currentTarget.value})}}
                                         size="lg"
                                         style={{fontSize: "16px", paddingLeft: "12px", paddingTop: "16px", paddingBottom: "16px"}}>
                                <option>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Phone Number">
                                <Form.Control type="text"
                                              placeholder="phone"
                                              value={customer.phone}
                                              onChange={(e) => {setCustomer({...customer, phone: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Email Address">
                                <Form.Control type="email"
                                              placeholder="name@example.com"
                                              value={customer.email}
                                              onChange={(e) => {setCustomer({...customer, email: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Username">
                                <Form.Control type="text"
                                              placeholder="username"
                                              value={customer.username}
                                              onChange={(e) => {setCustomer({...customer, username: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Password">
                                <Form.Control type="password"
                                              placeholder="password"
                                              value={customer.password}
                                              onChange={(e) => {setCustomer({...customer, password: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        {customer === empty ? "Add" : "Save changes"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Customer;