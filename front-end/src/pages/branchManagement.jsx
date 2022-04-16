import React from 'react';
import { Col, Row, Card, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPeopleGroup, faCartShopping, faDumbbell, faClipboardUser, faList } from "@fortawesome/free-solid-svg-icons";


const entries = [
    { name: "Customer", icon: faPeopleGroup },
    { name: "Product", icon: faCartShopping },
    { name: "Facility", icon: faDumbbell},
    { name: "Staff", icon: faClipboardUser},
    { name: "Order", icon: faList}
];

const getCards = () => {
    return entries.map(entry =>
        <Col key={entry.name}>
            <Card as={Link} to={ `/branch/${entry.name.toLowerCase()}` } style={{ textDecoration: 'inherit', color: "inherit" }}>
                <FontAwesomeIcon className="py-5" icon={entry.icon} size="8x"/>
                <Card.Body>
                    <Card.Title style={{ fontSize: "40px" }} className="text-center">{ entry.name }</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    )
}

const BranchManagement = () => {
    return (
        <Container>
            <Row className="py-5">
                {getCards()}
            </Row>
            <Row>
                <Button variant="danger" onClick={() => {localStorage.removeItem("manager_token");window.location = "/branch"}}>Logout</Button>
            </Row>
        </Container>
    );
};

export default BranchManagement;