import React, { useState } from 'react';
import { Form, Container, Card, Pagination, Col, Row, ListGroup, Button, Modal, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";

const products = [
    {
        id: 1,
        name: "Red Bull",
        price: "2.99",
        numberInStock: "193",
        type: "goods"
    },
    {
        id: 2,
        name: "Six Packs",
        price: 599,
        numberInStock: "5",
        type: "course",
        startDate: "2022-03-20",
        endDate: "2022-09-20",
        coachID: "2"
    },
    {
        id: 3,
        name: "0 Calorie Combo",
        price: "12.99",
        numberInStock: "30",
        type: "meal",
        calories: "123",
        allergies: ["peanut", "wheat"]
    },
    {
        id: 4,
        name: "Protein Bar",
        price: "3.99",
        numberInStock: "60",
        type: "goods",
    }
];



const Product = () => {
    const [show, setShow] = useState(false);
    const [product, setProduct] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = (c) => {
        setShow(true)
        setProduct(c);
    };

    const getProductContent = () => {
        return products.map(p =>
            <Card className="mb-3" onClick={() => handleShow(p)} key={p.id}>
                <Card.Body>
                    {Object.entries(p).map(a => <div key={a[0] + a[1]}>{a[0] + ": " + a[1]}</div>)}
                </Card.Body>
            </Card>
        )
    };

    return (
        <div>
            <Container>
                <h1>Product</h1>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col xs={8}>
                                {getProductContent()}
                            </Col>

                            <Col xs={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Search By Item ID</Card.Title>
                                        <Form.Control/>
                                        <Button className="mt-2">Search</Button>
                                    </Card.Body>
                                </Card>
                                <Card className="mt-3">
                                    <Card.Body>
                                        <Card.Title>Filter</Card.Title>
                                        <hr/>
                                        <p className="mb-1">Type:</p>
                                        <ListGroup>
                                            <ListGroup.Item>Meal</ListGroup.Item>
                                            <ListGroup.Item>Course</ListGroup.Item>
                                            <ListGroup.Item>Goods</ListGroup.Item>
                                        </ListGroup>

                                        <p className="mb-1 mt-3">Stock:</p>
                                        <ListGroup>
                                            <ListGroup.Item>In stock</ListGroup.Item>
                                            <ListGroup.Item>Out of stock</ListGroup.Item>
                                        </ListGroup>

                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
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
                        <Button className="mx-2" onClick={() => handleShow({})}>Add</Button>
                    </Card.Body>
                </Card>
            </Container>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{product === {} ? "Add a product" : "Edit a product"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Name">
                                <Form.Control placeholder=" "
                                              value={product.name}
                                              onChange={(e) => {setProduct({...product, name: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Price">
                                <Form.Control placeholder=" "
                                              value={product.price}
                                              onChange={(e) => {setProduct({...product, price: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <FloatingLabel label="Number In Stock">
                                <Form.Control placeholder=" "
                                              value={product.numberInStock}
                                              onChange={(e) => {setProduct({...product, numberInStock: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Select value={product.type}
                                         onChange={(e) => {setProduct({...product, type: e.currentTarget.value})}}
                                         size="lg"
                                         style={{fontSize: "16px", paddingLeft: "12px", paddingTop: "16px", paddingBottom: "16px"}}>
                                <option>Type</option>
                                <option value="meal">Meal</option>
                                <option value="course">Course</option>
                                <option value="goods">Goods</option>
                            </Form.Select>
                        </Form.Group>
                        {product.type === "course" && <div><Form.Group className="mb-2">
                            <FloatingLabel label="Start Date">
                                <Form.Control placeholder=" "
                                              value={product.startDate}
                                              onChange={(e) => {
                                                  setProduct({...product, startDate: e.currentTarget.value})
                                              }}/>
                            </FloatingLabel>
                        </Form.Group>
                            <Form.Group className="mb-2">
                                <FloatingLabel label="End Date">
                                    <Form.Control placeholder=" "
                                                  value={product.endDate}
                                                  onChange={(e) => {
                                                      setProduct({...product, endDate: e.currentTarget.value})
                                                  }}/>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <FloatingLabel label="Coach ID">
                                    <Form.Control placeholder=" "
                                                  value={product.coachID}
                                                  onChange={(e) => {
                                                      setProduct({...product, coachID: e.currentTarget.value})
                                                  }}/>
                                </FloatingLabel>
                            </Form.Group></div>}
                        {product.type === "meal" &&
                            <div>
                                <Form.Group className="mb-2">
                                    <FloatingLabel label="Calories">
                                        <Form.Control placeholder=" "
                                              value={product.calories}
                                              onChange={(e) => {
                                                  setProduct({...product, calories: e.currentTarget.value})
                                              }}/>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <FloatingLabel label="Allergies">
                                        <Form.Control placeholder=" "
                                                      value={product.allergies.toString()}
                                                      onChange={(e) => {
                                                          setProduct({...product, allergies: e.currentTarget.value.split(",")})
                                                      }}/>
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
                        {product === {} ? "Add" : "Save changes"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Product;