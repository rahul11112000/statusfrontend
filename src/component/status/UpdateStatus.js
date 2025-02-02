import React, { useState ,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addComponent, updateComponent } from "../../api/ComponentApi";
import { getComponent } from "../../api/ComponentApi";
import { Form, Button,Container, Card } from "react-bootstrap";
import { getStatu, updateStatus } from "../../api/StatusApi";



const UpdateStatus = () => {
    const token = localStorage.getItem("token");
        const { status_id } = useParams();
        const navigate = useNavigate();
        const [formData, setFormData] = useState({ name: "" ,status:""});
        useEffect(() => {
            const fetchApplication = async () => {
                const response = await getStatu(status_id,token); 
                setFormData(response);
            };
            fetchApplication();
        }, [status_id]);
    
        const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        };
    
        const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await updateStatus(status_id,formData,token);
        const com_id = response.component.id;
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

export default UpdateStatus;
