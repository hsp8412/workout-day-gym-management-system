import React, { useState } from 'react';
import { Button, Card, Container, FloatingLabel, Form, Modal, Pagination, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const facilities = [
    {
        id: "1",
        name: "Dumbbell Set",
        price: "1300",
        condition: "new",
        type: "fitness equipment"
    },
    {
        id: "2",
        name: "Adjustable Bench",
        price: "200",
        condition: "fair",
        type: "fitness equipment"
    },
    {
        id: "3",
        name: "Water Dispenser",
        price: "100",
        condition: "good",
        type: "office supply"
    },
    {
        id: "4",
        name: "Desk",
        price: "150",
        condition: "good",
        type: "office supply"
    },
    {
        id: "5",
        name: "Barbell",
        price: "100",
        condition: "fair",
        type: "fitness equipment"
    },
    {
        id: "6",
        name: "Weight Rack",
        price: "500",
        condition: "fair",
        type: "fitness equipment"
    },
    {
        id: "7",
        name: "Treadmill",
        price: "700",
        condition: "bad",
        type: "fitness equipment"
    }
];

const empty = {
    id: "",
    name: "",
    price: "",
    condition: "",
    type: ""
};

const CommonFacility = () => {
    const [show, setShow] = useState(false);
    const [facility, setFacility] = useState(empty);
    const handleClose = () => setShow(false);
    const handleShow = (c) => {
        setShow(true)
        setFacility(c);
    };

    const getTableContent = () => {
        return facilities.map(c =>
            <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.price}</td>
                <td>{c.condition}</td>
                <td>{c.type}</td>
                <td><Button className="pb-0 pt-0" variant="danger" onClick={() => handleShow(c)}>Edit</Button></td>
            </tr>)
    };

    return (
        <div>
            <Container className="my-2">
                <h1>Common Facility</h1>
                <Card>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Facility ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Condition</th>
                                <th>Type</th>
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
                    <Modal.Title>{facility === empty ? "Add a facility" : "Edit a facility"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="ID">
                                <Form.Control type="text"
                                              placeholder=" "
                                              value={facility.id}
                                              onChange={(e) => {setFacility({...facility, id: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Name">
                                <Form.Control type="text"
                                              placeholder=" "
                                              value={facility.name}
                                              onChange={(e) => {setFacility({...facility, name: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Price">
                                <Form.Control type="text"
                                              placeholder=" "
                                              value={facility.price}
                                              onChange={(e) => {setFacility({...facility, price: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Select value={facility.condition}
                                         onChange={(e) => {setFacility({...facility, condition: e.currentTarget.value})}}
                                         size="lg"
                                         style={{fontSize: "16px", paddingLeft: "12px", paddingTop: "16px", paddingBottom: "16px"}}>
                                <option>Select Condition</option>
                                <option value="new">New</option>
                                <option value="good">Good</option>
                                <option value="fair">Fair</option>
                                <option value="bad">Bad</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Select value={facility.type}
                                         onChange={(e) => {setFacility({...facility, type: e.currentTarget.value})}}
                                         size="lg"
                                         style={{fontSize: "16px", paddingLeft: "12px", paddingTop: "16px", paddingBottom: "16px"}}>
                                <option>Select Type</option>
                                <option value="fitness equipment">Fitness Equipment</option>
                                <option value="office supply">Office Supply</option>
                            </Form.Select>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        {facility === empty ? "Add" : "Save changes"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CommonFacility;