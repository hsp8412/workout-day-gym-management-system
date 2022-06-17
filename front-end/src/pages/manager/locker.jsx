import React, { useEffect, useState } from 'react';
import { Button, Card, Container, FloatingLabel, Form, Modal, Pagination, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import MyPagination from "../../utils/pagination";

const empty = {
    facilityId: "",
    locker_number: "",
    isTemporaryLocker: false,
    isEquipment: false,
    type: "Locker",
    price: 0,
    condition: 0,
    rental: {
        renterId: null,
        startDate: null,
        endDate: null
    }
};

const uri = process.env.REACT_APP_API_ENDPOINT + "/facility/locker/";
const itemsPerPage = 10;

const Locker = () => {
    const [lockers, setLockers] = useState([]);
    const [show, setShow] = useState(false);
    const [locker, setLocker] = useState(empty);
    const [adding, setAdding] = useState(true);
    const [currentPage, setPage] = useState(1);
    const handleClose = () => setShow(false);
    const handleSave = async () => {
        if (adding)
            await axios.post(uri, locker);
        else
            await axios.put(uri + locker._id, locker);
        const data = await axios.get(uri);
        setLockers(data.data);
        handleClose();
    };
    const handleEdit = (c) => {
        setAdding(false);
        setLocker(c);
        setShow(true);
    }
    const handleAdd = () => {
        setAdding(true);
        setLocker(empty);
        setShow(true);
    };
    const handleDelete = async () => {
        await axios.delete(uri + locker._id);
        const data = await axios.get(uri);
        setLockers(data.data);
        handleClose();
    };
    const getPagedItems = (items) => {
        return items.filter(item => (items.indexOf(item) >= (currentPage - 1) * itemsPerPage) && (items.indexOf(item) < currentPage * itemsPerPage));
    };

    const getOptions = (num) => {
        const arr = Array.from(Array(num).keys())
        return arr.map(num => <option value={num} key={num}>{num}</option> )
    }

    useEffect(() => {
        async function fetchData() {
            const data = await axios.get(uri);
            setLockers(data.data);
        }
        fetchData();
    }, []);

    const getTableContent = (lockers) => {
        return lockers.map(c =>
            <tr key={c._id}>
                <td>{c._id}</td>
                <td>{c.locker_number}</td>
                <td>{c.isTemporaryLocker ? "Yes" : "No"}</td>
                <td>{c.price}</td>
                <td>{c.condition}</td>
                <td>{c.rental.renterId}</td>
                <td>{c.rental.startDate ? c.rental.startDate.slice(0, 10) : null}</td>
                <td>{c.rental.endDate ? c.rental.startDate.slice(0, 10) : null}</td>
                <td><Button className="pb-0 pt-0" variant="danger" onClick={() => handleEdit(c)}>Edit</Button></td>
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
                                <th>Is Temporary Locker</th>
                                <th>Price</th>
                                <th>Condition</th>
                                <th>Renter ID</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Edit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {getTableContent(getPagedItems(lockers))}
                            </tbody>
                        </Table>

                        <MyPagination totalItems={lockers.length}
                                      itemsPerPage={itemsPerPage}
                                      currentPage={currentPage}
                                      onPageChange={setPage}/>

                        <Button as={Link} to="/branch/manage">Back</Button>
                        <Button onClick={handleAdd} className="mx-3">Add</Button>
                    </Card.Body>
                </Card>
            </Container>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{adding ? "Add a locker" : "Edit a locker"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Locker Number">
                                <Form.Control type="text"
                                              placeholder=" "
                                              value={locker.locker_number}
                                              onChange={(e) => {setLocker({...locker, locker_number: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Price">
                                <Form.Control type="text"
                                              placeholder=" "
                                              value={locker.price}
                                              onChange={(e) => {setLocker({...locker, price: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Select value={locker.condition}
                                         onChange={(e) => {setLocker({...locker, condition: e.currentTarget.value})}}
                                         size="lg"
                                         style={{fontSize: "16px", paddingLeft: "12px", paddingTop: "16px", paddingBottom: "16px"}}>
                                <option>Select Condition</option>
                                {getOptions(11)}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Select value={locker.isTemporaryLocker ? "Yes" : "No"}
                                         onChange={(e) => {setLocker({...locker, isTemporaryLocker: e.currentTarget.value === "Yes"})}}
                                         size="lg"
                                         style={{fontSize: "16px", paddingLeft: "12px", paddingTop: "16px", paddingBottom: "16px"}}>
                                <option>Select</option>
                                <option value="Yes">Is Temporary</option>
                                <option value="No">Not Temporary</option>
                            </Form.Select>
                        </Form.Group>
                        {!locker.isTemporaryLocker &&
                            <div>
                            <Form.Group className="mb-2">
                                <FloatingLabel label="Renter ID">
                                    <Form.Control type="text"
                                                  placeholder=" "
                                                  value={locker.rental.renterId}
                                                  onChange={(e) => {setLocker({...locker, rental: {...locker.rental, renterId:e.currentTarget.value} })}}/>
                                </FloatingLabel>
                            </Form.Group>
                                <Form.Group className="mb-2">
                                    <FloatingLabel label="Start Date">
                                        <Form.Control type="text"
                                                      placeholder=" "
                                                      value={locker.rental.startDate}
                                                      onChange={(e) => {setLocker({...locker, rental: {...locker.rental, startDate: e.currentTarget.value}})}}/>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <FloatingLabel label="End Date">
                                        <Form.Control type="text"
                                                      placeholder=" "
                                                      value={locker.rental.endDate}
                                                      onChange={(e) => {setLocker({...locker, rental: {...locker.rental, endDate: e.currentTarget.value}})}}/>
                                    </FloatingLabel>
                                </Form.Group>
                        </div>}
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

export default Locker;