import React, { useEffect, useState } from 'react';
import { Table, Container, Button, Modal, Form, FloatingLabel, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import http from "../../services/httpService"
import MyPagination from "../../utils/pagination";

const empty = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    gender: "",
    emergencyContact: {
        name: "",
        phoneNumber: ""
    }
}
const uri = process.env.REACT_APP_API_ENDPOINT + "/customer/";
const itemsPerPage = 10;

const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [show, setShow] = useState(false);
    const [customer, setCustomer] = useState(empty);
    const [adding, setAdding] = useState(false);
    const [currentPage, setPage] = useState(1);
    const handleClose = () => setShow(false);
    const handleSave = async () => {
        if (adding)
            await http.post(uri, customer);
        else
            await http.put(uri + customer._id, customer);
        const data = await http.get(uri);
        setCustomers(data.data);
        handleClose();
    };
    const handleEdit = (c) => {
        setAdding(false);
        setCustomer(c);
        setShow(true);
    }
    const handleAdd = () => {
        setAdding(true);
        setCustomer(empty);
        setShow(true);
    };
    const handleDelete = async () => {
        await http.delete(uri + customer._id);
        const data = await http.get(uri);
        setCustomers(data.data);
        handleClose();
    };
    const getPagedItems = (items) => {
        return items.filter(item => (items.indexOf(item) >= (currentPage - 1) * itemsPerPage) && (items.indexOf(item) < currentPage * itemsPerPage));
    };

    useEffect(() => {
        async function fetchData() {
            const data = await http.get(uri);
            setCustomers(data.data);
        }
        fetchData();
    }, []);

    const getTableContent = (customers) => {
        return customers.map(c =>
            <tr key={c._id}>
                <td>{c._id}</td>
                <td>{c.firstName}</td>
                <td>{c.lastName}</td>
                <td>{c.gender}</td>
                <td>{c.phoneNumber}</td>
                <td>{c.email}</td>
                <td>{c.emergencyContact.name}</td>
                <td>{c.emergencyContact.phoneNumber}</td>
                <td><Button className="pb-0 pt-0" variant="danger" onClick={() => handleEdit(c)}>Edit</Button></td>
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
                                <th>Emergency Contact</th>
                                <th>Emergency Contact Phone</th>
                                <th>Edit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {getTableContent(getPagedItems(customers))}
                            </tbody>
                        </Table>

                        <MyPagination totalItems={customers.length}
                                      itemsPerPage={itemsPerPage}
                                      currentPage={currentPage}
                                      onPageChange={setPage} />

                        <Button as={Link} to="/branch/manage">Back</Button>
                        <Button onClick={handleAdd} className="mx-3">Add</Button>
                    </Card.Body>
                </Card>
            </Container>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{adding ? "Add a customer" : "Edit a customer"}</Modal.Title>
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
                                              placeholder="phoneNumber"
                                              value={customer.phoneNumber}
                                              onChange={(e) => {setCustomer({...customer, phoneNumber: e.currentTarget.value})}}/>
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
                        {adding && <Form.Group className="mb-2">
                            <FloatingLabel label="Password">
                                <Form.Control type="password"
                                              placeholder="password"
                                              value={customer.password}
                                              onChange={(e) => {
                                                  setCustomer({...customer, password: e.currentTarget.value})
                                              }}/>
                            </FloatingLabel>
                        </Form.Group>}
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Emergency Contact Name">
                                <Form.Control type="text"
                                              placeholder="name"
                                              value={customer.emergencyContact.name}
                                              onChange={(e) => {setCustomer({...customer, emergencyContact: {...customer.emergencyContact, name: e.currentTarget.value}})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Emergency Contact Phone Number">
                                <Form.Control type="text"
                                              placeholder="name"
                                              value={customer.emergencyContact.phoneNumber}
                                              onChange={(e) => {setCustomer({...customer, emergencyContact: {...customer.emergencyContact, phoneNumber: e.currentTarget.value}})}}/>
                            </FloatingLabel>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        {adding ? "Add" : "Save changes"}
                    </Button>
                    {!adding && <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Customer;