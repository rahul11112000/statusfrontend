import React from "react";
import Sidebar from "../Sidebar";
import { useParams } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import useWebSocket from "./UseWebSocket";

const ViewerStatus = () => {
    const { com_id } = useParams();
    const token = localStorage.getItem("token");
    const statuses = useWebSocket(); // Use corrected WebSocket hook

    return (
        <div>
            <div className="d-flex">
                {/* Sidebar */}
                <Sidebar />

                <Container className="mt-5">
                    <Card className="p-4 shadow" style={{ maxWidth: "100%", margin: "0 auto" }}>
                        <h3 className="text-center mb-4">Status</h3>
                        <Row>
                            {statuses.map((status) => (
                                <Col key={status.id} md={6} lg={4} className="mb-3">
                                    <Card className="text-center p-3 shadow-sm">
                                        <Card.Body>
                                            <Card.Title>{status.component?.name || "No Component"}</Card.Title>
                                            <Card.Text>{status.name}</Card.Text>
                                            <Card.Text className={
                                                status.status === "Online" ? "text-success" :
                                                status.status === "Offline" ? "text-danger" : "text-warning"
                                            }>
                                                {status.status}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Card>
                </Container>
            </div>
        </div>
    );
};

export default ViewerStatus;
