import React, { useState,useEffect } from "react";
import Sidebar from "../Sidebar";
import { deleteComponent, getComponents } from "../../api/ComponentApi";
import { useNavigate ,useParams} from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import {  Button } from "react-bootstrap";
import { deleteStatus, getStatus } from "../../api/StatusApi";
import useWebSocket from "./UseWebSocket";

const AllStatus = () => {
    const { com_id } = useParams();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const statuses = useWebSocket();
  
    const handleUpdate = (status_id) => {
        navigate(`/status/update/${status_id}`);
    };

    const handleDelete = async(status_id) => {
        const response = await deleteStatus(status_id,token); 
        navigate(`/status/${com_id}`);
    };

    const addStatus = async() => {
        navigate(`/status/add/${com_id}`);
    };
        
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
                            <Card.Title>{status.component.name}</Card.Title>
                            <Card.Text>{status.name}</Card.Text>
                            <Card.Text className={
                              status.status === "Online" ? "text-success" :
                              status.status === "Offline" ? "text-danger" : "text-warning"
                            }>
                              {status.status}
                            </Card.Text>
                            <Button variant="warning" size="sm" className="me-2"onClick={() => handleUpdate(status.id)}>Update</Button>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(status.id)}>Delete</Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card>
                <Button variant="primary"  className="me-2"onClick={() => addStatus(com_id)}>Add Status</Button>
              </Container>
            </div>
            </div>
          );
};

export default AllStatus;