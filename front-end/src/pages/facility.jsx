import React from 'react';
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faLock } from "@fortawesome/free-solid-svg-icons";

const Facility = () => {
    return (
        <Container>
            <Row className="py-5">
                <Col>
                    <Card as={Link} to={ "/branch/facility/locker" } style={{ textDecoration: 'inherit', color: "inherit" }}>
                        <FontAwesomeIcon className="py-5" icon={faLock} size="8x"/>
                        <Card.Body>
                            <Card.Title style={{ fontSize: "40px" }} className="text-center">Locker</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card as={Link} to={ "/branch/facility/common" } style={{ textDecoration: 'inherit', color: "inherit" }}>
                        <FontAwesomeIcon className="py-5" icon={faDumbbell} size="8x"/>
                        <Card.Body>
                            <Card.Title style={{ fontSize: "40px" }} className="text-center">Common Facilities</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Facility;