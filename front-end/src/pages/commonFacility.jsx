import React, { useEffect, useState } from 'react';
import { Button, Card, Container, FloatingLabel, Form, Modal, Pagination, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import MyPagination from "../utils/pagination";

const empty = {
    isEquipment: true,
    isTemporaryLocker: false,
    price: 0,
    condition: 0,
    type: "",
    };

const uri = process.env.REACT_APP_API_ENDPOINT + "/facility/common/";
const itemsPerPage = 10;

const CommonFacility = () => {
    const [facilities, setFacilities] = useState([]);
    const [show, setShow] = useState(false);
    const [facility, setFacility] = useState(empty);
    const [adding, setAdding] = useState(true);
    const [currentPage, setPage] = useState(1);
    const handleClose = () => setShow(false);
    const handleSave = async () => {
        if (adding)
            await axios.post(uri, facility);
        else
            await axios.put(uri + facility._id, facility);
        const data = await axios.get(uri);
        setFacilities(data.data);
        handleClose();
    };
    const handleEdit = (c) => {
        setAdding(false);
        setFacility(c);
        setShow(true);
    }
    const handleAdd = () => {
        setAdding(true);
        setFacility(empty);
        setShow(true);
    };
    const handleDelete = async () => {
        await axios.delete(uri + facility._id);
        const data = await axios.get(uri);
        setFacilities(data.data);
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
            setFacilities(data.data);
        }
        fetchData();
    }, []);

    const getTableContent = (facilities) => {
        return facilities.map(c =>
            <tr key={c._id}>
                <td>{c._id}</td>
                <td>{c.type}</td>
                <td>{c.price}</td>
                <td>{c.condition}</td>
                <td><Button className="pb-0 pt-0" variant="danger" onClick={() => handleEdit(c)}>Edit</Button></td>
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
                                <th>Edit</th>
                            </tr>
                            </thead>
                            <tbody>
                            {getTableContent(getPagedItems(facilities))}
                            </tbody>
                        </Table>

                        <MyPagination onPageChange={setPage}
                                      currentPage={currentPage}
                                      itemsPerPage={itemsPerPage}
                                      totalItems={facilities.length}/>

                        <Button as={Link} to="/branch/manage">Back</Button>
                        <Button onClick={handleAdd} className="mx-3">Add</Button>
                    </Card.Body>
                </Card>
            </Container>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{adding ? "Add a facility" : "Edit a facility"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Type">
                                <Form.Control type="text"
                                              placeholder=" "
                                              value={facility.type}
                                              onChange={(e) => {setFacility({...facility, type: e.currentTarget.value})}}/>
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
                                {getOptions(11)}
                            </Form.Select>
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

export default CommonFacility;