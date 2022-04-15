import React, { useEffect, useState } from 'react';
import { Form, Container, Card, Pagination, Col, Row, ListGroup, Button, Modal, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import MyPagination from "../utils/pagination";

const uri = process.env.REACT_APP_API_ENDPOINT + "/product/";
const itemsPerPage = 3;

const empty =
    {
        "InStock": 0,
        "price": 0,
        "name": "",
        "isCourse": true,
        "isMeal": false,
        "isGoods": false,
        "startTime": "",
        "endTime": "",
        "courseCoachId": "",
        "allergies": [],
        "calories": 0
    };

const Product = () => {
    const [selectedType, setSelectedType] = useState("meal");
    const [nameKeyword, setNameKeyword] = useState("");
    const [idKeyword, setIdKeyword] = useState("");
    const [type, setType] = useState("all");
    const [stockType, setStockType] = useState("all");
    const [allProducts, setAllProducts] = useState([])
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [product, setProduct] = useState({});
    const [adding, setAdding] = useState(false);
    const [currentPage, setPage] = useState(1);
    const handleClose = () => setShow(false);
    const handleSave = async () => {
        if (adding)
            await axios.post(uri, product);
        else
            await axios.put(uri + product._id, product);
        const data = await axios.get(uri);
        setProducts(data.data);
        handleClose();
    };
    const handleEdit = (c) => {
        if (c.isCourse) setSelectedType("course");
        if (c.isMeal) setSelectedType("meal");
        if (c.isGoods) setSelectedType("goods");
        setAdding(false);
        setProduct(c);
        setShow(true);
    }
    const handleAdd = () => {
        setAdding(true);
        setProduct(empty);
        setShow(true);
    };
    const handleDelete = async () => {
        await axios.delete(uri + product._id);
        const data = await axios.get(uri);
        setProducts(data.data);
        handleClose();
    };
    const handleSelectionChange = (e) => {
        switch (e.currentTarget.value) {
            case "meal":
                setProduct({...product, isMeal: true, isCourse: false, isGoods: false});
                setSelectedType("meal");
                break;
            case "goods":
                setProduct({...product, isMeal: false, isCourse: false, isGoods: true});
                setSelectedType("goods");
                break;
            case "course":
                setProduct({...product, isMeal: false, isCourse: true, isGoods: false});
                setSelectedType("course");
                break;
        }
    };
    const getPagedItems = (items) => {
        return items.filter(item => (items.indexOf(item) >= (currentPage - 1) * itemsPerPage) && (items.indexOf(item) < currentPage * itemsPerPage));
    };

    useEffect(() => {
        async function fetchData() {
            const data = await axios.get(uri);
            setProducts(data.data);
            setAllProducts(data.data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        let filtered = allProducts;
        switch (type) {
            case "all":
                break;
            case "course":
                filtered = filtered.filter(p => p.isCourse);
                break;
            case "meal":
                filtered = filtered.filter(p => p.isMeal);
                break;
            case "goods":
                filtered = filtered.filter(p => p.isGoods);
                break;
        }
        switch (stockType) {
            case "all":
                break;
            case "in" :
                filtered = filtered.filter(p => p.InStock > 0);
                break;
            case "out":
                filtered = filtered.filter(p => p.InStock == 0);
                break;
        }
        if (nameKeyword !== "")
            filtered = filtered.filter(p => p.name.toLowerCase().includes(nameKeyword.toLowerCase()));
        if (idKeyword !== "")
            filtered = filtered.filter(p => p._id.toLowerCase().includes(idKeyword.toLowerCase()));
        setProducts(filtered);
    }, [type, stockType, idKeyword, nameKeyword]);

    const getProductContent = (products) => {
        return products.map(p =>
            <Card className="mb-3" onClick={() => handleEdit(p)} key={p._id} style={{cursor: "pointer"}}>
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
                                {getProductContent(getPagedItems(products))}
                            </Col>

                            <Col xs={4}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Search By Item ID</Card.Title>
                                        <Form.Control onChange={e => setIdKeyword(e.currentTarget.value)}/>
                                    </Card.Body>
                                </Card>
                                <Card className="mt-3">
                                    <Card.Body>
                                        <Card.Title>Search By Name</Card.Title>
                                        <Form.Control onChange={e => setNameKeyword(e.currentTarget.value)}/>
                                    </Card.Body>
                                </Card>
                                <Card className="mt-3">
                                    <Card.Body>
                                        <Card.Title>Filter</Card.Title>
                                        <hr/>
                                        <p className="mb-1">Type:</p>
                                        <ListGroup>
                                            <ListGroup.Item as={Button}
                                                            active={type === "all"}
                                                            onClick={() => setType("all")}>All</ListGroup.Item>
                                            <ListGroup.Item as={Button}
                                                            active={type === "meal"}
                                                            onClick={() => setType("meal")}>Meal</ListGroup.Item>
                                            <ListGroup.Item as={Button}
                                                            active={type === "course"}
                                                            onClick={() => setType("course")}>Course</ListGroup.Item>
                                            <ListGroup.Item as={Button}
                                                            active={type === "goods"}
                                                            onClick={() => setType("goods")}> Goods</ListGroup.Item>
                                        </ListGroup>
                                        <p className="mb-1 mt-3">Stock:</p>
                                        <ListGroup>
                                            <ListGroup.Item as={Button} active={stockType === "all"} onClick={() => setStockType("all")} >All</ListGroup.Item>
                                            <ListGroup.Item as={Button} active={stockType === "in"} onClick={() => setStockType("in")} >In stock</ListGroup.Item>
                                            <ListGroup.Item as={Button} active={stockType === "out"} onClick={() => setStockType("out")} >Out of stock</ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <MyPagination onPageChange={setPage}
                                      currentPage={currentPage}
                                      itemsPerPage={itemsPerPage}
                                      totalItems={products.length}/>
                        <Button as={Link} to="/branch">Back</Button>
                        <Button className="mx-2" onClick={handleAdd}>Add</Button>
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
                            <FloatingLabel label="Stock">
                                <Form.Control placeholder=" "
                                              value={product.InStock}
                                              onChange={(e) => {setProduct({...product, InStock: e.currentTarget.value})}}/>
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
                            <FloatingLabel label="Name">
                                <Form.Control placeholder=" "
                                              value={product.name}
                                              onChange={(e) => {setProduct({...product, name: e.currentTarget.value})}}/>
                            </FloatingLabel>
                        </Form.Group>
                        {adding && <Form.Group className="mb-2">
                            <Form.Select
                                value={selectedType}
                                onChange={handleSelectionChange}
                                size="lg"
                                style={{
                                    fontSize: "16px",
                                    paddingLeft: "12px",
                                    paddingTop: "16px",
                                    paddingBottom: "16px"
                                }}>
                                <option>Type</option>
                                <option value="meal">Meal</option>
                                <option value="course">Course</option>
                                <option value="goods">Goods</option>
                            </Form.Select>
                        </Form.Group>}
                        {selectedType === "course" && <div><Form.Group className="mb-2">
                            <FloatingLabel label="Start Date">
                                <Form.Control placeholder=" "
                                              value={product.startTime}
                                              onChange={(e) => {
                                                  setProduct({...product, startTime: e.currentTarget.value})
                                              }}/>
                            </FloatingLabel>
                        </Form.Group>
                            <Form.Group className="mb-2">
                                <FloatingLabel label="End Date">
                                    <Form.Control placeholder=" "
                                                  value={product.endTime}
                                                  onChange={(e) => {
                                                      setProduct({...product, endTime: e.currentTarget.value})
                                                  }}/>
                                </FloatingLabel>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <FloatingLabel label="Coach ID">
                                    <Form.Control placeholder=" "
                                                  value={product.courseCoachId}
                                                  onChange={(e) => {
                                                      setProduct({...product, courseCoachId: e.currentTarget.value})
                                                  }}/>
                                </FloatingLabel>
                            </Form.Group></div>}
                        {selectedType === "meal" &&
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
                                                      value={product.allergies}
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
                    <Button variant="primary" onClick={handleSave}>
                        {product === {} ? "Add" : "Save changes"}
                    </Button>
                    {!adding && <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Product;