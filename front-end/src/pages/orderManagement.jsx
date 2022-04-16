import React, { useEffect, useState } from "react";
import axios from "axios";
import http from "../services/httpService";
import OrderCard from "../components/orderCard";
import DeleteOrderConfirm from "../components/deleteOrderConfirm";
import { Row } from "react-bootstrap";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState();
  const uri = process.env.REACT_APP_API_ENDPOINT + "/order";

  useEffect(() => {
    async function fetchData() {
      const data = await http.get(uri);
      setOrders(data.data);
    }
    fetchData();
  }, []);

  const handleDelete = (order) => {
    setOrderToDelete(order);
    setShow(true);
  };

  const handleDeleteOrderConfirm = async () => {
    await http.delete(uri + `/branch/${orderToDelete._id}`);
    setShow(false);
    setOrderToDelete(null);
    window.location.reload();
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-3">
        <h3>Order Management</h3>
      </div>
      <div>
        {orders.map((order) => (
          <Row className="d-flex justify-content-center">
            <OrderCard order={order} onDelete={handleDelete} />
          </Row>
        ))}
      </div>
      <DeleteOrderConfirm
        onClose={() => setShow(false)}
        order={orderToDelete}
        onConfirm={handleDeleteOrderConfirm}
        ifVisible={show}
      />
    </div>
  );
};

export default OrderManagement;
