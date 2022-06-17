import React, { useEffect, useState } from 'react';
import { Button, Card, Container, FloatingLabel, Form, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import http from "../../services/httpService"
import MyPagination from "../../utils/pagination";

const empty = {
    firstName: "",
    lastName: "",
    ssn: "",
    email: "",
    address: "",
    phone: "",
    salary: 0,
    isCoach: false
};

const uri = process.env.REACT_APP_API_ENDPOINT + "/branch_staff/";
const itemsPerPage = 10;

const Staff = () => {
    const [allStaff, setAllStaff] = useState([]);
    const [show, setShow] = useState(false);
    const [staff, setStaff] = useState(empty);
    const [adding, setAdding] = useState(true);
    const [currentPage, setPage] = useState(1);
    const handleClose = () => setShow(false);
    const handleSave = async () => {
        if (adding)
            await http.post(uri, staff);
        else
            await http.put(uri + staff._id, staff);
        const data = await http.get(uri);
        setAllStaff(data.data);
        handleClose();
    };
    const handleEdit = (c) => {
        setAdding(false);
        setStaff(c);
        setShow(true);
    }
    const handleAdd = () => {
        setAdding(true);
        setStaff(empty);
        setShow(true);
    };
    const handleDelete = async () => {
        await http.delete(uri + staff._id);
        const data = await http.get(uri);
        setAllStaff(data.data);
        handleClose();
    };
    const getPagedItems = (items) => {
        return items.filter(item => (items.indexOf(item) >= (currentPage - 1) * itemsPerPage) && (items.indexOf(item) < currentPage * itemsPerPage));
    };

    useEffect(() => {
        async function fetchData() {
            const data = await http.get(uri);
            setAllStaff(data.data);
        }
        fetchData();
    }, []);

    const getTableContent = (allStaff) => {
        return allStaff.map(c =>
            <tr key={c.ssn}>
                <td>{c._id}</td>
                <td>{c.firstName}</td>
                <td>{c.lastName}</td>
                <td>{c.ssn}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.address}</td>
                <td>{c.salary}</td>
                <td>{c.isCoach ? "Yes" : "No"}</td>
                <td><Button className="pb-0 pt-0" variant="danger" onClick={() => handleEdit(c)}>Edit</Button></td>
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
                                <th>ID</th>
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
                            {getTableContent(getPagedItems(allStaff))}
                            </tbody>
                        </Table>

                        <MyPagination  currentPage={currentPage} onPageChange={setPage} itemsPerPage={itemsPerPage} totalItems={allStaff.length}/>

                        <Button as={Link} to="/branch/manage">Back</Button>
                        <Button onClick={handleAdd} className="mx-3">Add</Button>
                    </Card.Body>
                </Card>
            </Container>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{adding ? "Add a staff" : "Edit a staff"}</Modal.Title>
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
                            <Form.Select value={staff.isCoach ? "Yes" : "No"}
                                         onChange={(e) => {setStaff({...staff, isCoach: e.currentTarget.value === "Yes"})}}
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
                    <Button variant="primary" onClick={handleSave}>
                        {adding ? "Add" : "Save Changes"}
                    </Button>
                    {!adding && <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Staff;