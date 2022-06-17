import React, { useEffect, useState } from "react";
import http from "../../services/httpService";
import { Button, Card, Container, FloatingLabel, Form, Modal, Row, Table } from "react-bootstrap";
import MyPagination from "../../utils/pagination";
import { Link } from "react-router-dom";

const empty = {
  products: [],
  createDate: Date.now(),
  customerId: "",
  isFulfilled: false
};

const uri = process.env.REACT_APP_API_ENDPOINT + "/order/";
const itemsPerPage = 10;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [order, setOrder] = useState(empty);
  const [currentPage, setPage] = useState(1);
  const handleClose = () => setShow(false);
  const handleSave = async () => {
    await http.patch(uri + order._id, order);
    const data = await http.get(uri);
    setOrders(data.data);
    handleClose();
  };
  const handleEdit = (c) => {
    setOrder(c);
    setShow(true);
  }
  const handleDelete = async () => {
    await http.delete(uri + order._id);
    const data = await http.get(uri);
    setOrders(data.data);
    handleClose();
  };
  const getPagedItems = (items) => {
    return items.filter(item => (items.indexOf(item) >= (currentPage - 1) * itemsPerPage) && (items.indexOf(item) < currentPage * itemsPerPage));
  };

  useEffect(() => {
    async function fetchData() {
      const data = await http.get(uri);
      setOrders(data.data);
    }
    fetchData();
  }, []);

  const getTableContent = (orders) => {
    return orders.map(c =>
        <tr key={c._id}>
          <td>{c._id}</td>
          <td>{c.createDate.slice(0, 10)}</td>
          <td>{c.products.map(p => p.name).join(", ")}</td>
          <td>{c.customerId}</td>
          <td>{c.isFulfilled.toString()}</td>
          <td><Button className="pb-0 pt-0" variant="danger" onClick={() => handleEdit(c)}>Edit</Button></td>
        </tr>)
  };

  return (
      <div>
        <Container className="my-2">
          <h1>Order</h1>
          <Card>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Create Date</th>
                  <th>Products</th>
                  <th>Customer ID</th>
                  <th>Fulfilled</th>
                  <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                {getTableContent(getPagedItems(orders))}
                </tbody>
              </Table>

              <MyPagination onPageChange={setPage}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            totalItems={orders.length}/>
              <Button as={Link} to="/branch/manage">Back</Button>
            </Card.Body>
          </Card>
        </Container>

        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit an order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div>Is Fulfilled</div>
              <Form.Group className="mb-2">
                <Form.Select value={order.isFulfilled ? "Yes" : "No"}
                             onChange={(e) => {
                               setOrder({...order, isFulfilled: e.currentTarget.value === "Yes"})
                             }}
                             size="lg"
                             style={{fontSize: "16px", paddingLeft: "12px", paddingTop: "16px", paddingBottom: "16px"}}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
  );
};

export default OrderManagement;
