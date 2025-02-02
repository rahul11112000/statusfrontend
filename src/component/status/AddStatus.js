import React, { useState } from "react";
import { Form, Button,Container, Card } from "react-bootstrap";
import { addStatus } from "../../api/StatusApi";
import { useNavigate, useParams } from "react-router-dom";


const AddStatus = () => {
    const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({ name: "", status: "Operational" });
  const { com_id } = useParams();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await addStatus(com_id,formData,token);
    navigate(`/status/${com_id}`);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg border rounded" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Add Status</h3>
        <Form onSubmit={handleSubmit}>
          
          <Form.Group className="mt-3">
            
            <Form.Label>Status Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            <Form.Label>Status</Form.Label>
            <div className="d-flex flex-column">
              <Form.Check 
                type="radio" 
                label="Operational" 
                name="status" 
                value="Operational" 
                checked={formData.status === "Operational"} 
                onChange={handleChange} 
              />
              <Form.Check 
                type="radio" 
                label="Major Outage" 
                name="status" 
                value="MajorOutage" 
                checked={formData.status === "MajorOutage"} 
                onChange={handleChange} 
              />
              <Form.Check 
                type="radio" 
                label="Maintenance" 
                name="status" 
                value="Maintenance" 
                checked={formData.status === "Maintenance"} 
                onChange={handleChange} 
              />
            </div>
          </Form.Group>
          
          <Button variant="primary" type="submit" className="mt-3 w-100">Save Status</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddStatus;
