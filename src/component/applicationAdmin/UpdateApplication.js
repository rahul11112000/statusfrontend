import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getApplication } from "../../api/Api";
import { updateApplication } from "../../api/Api";
const UpdateApplication = () => {

    const token = localStorage.getItem("token");
    const { app_id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", description: "" });

    useEffect(() => {
    const fetchApplication = async () => {
        const response = await getApplication(app_id,token); 
        setFormData(response);
    };

    fetchApplication();
    }, [app_id]);

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateApplication(app_id,formData,token);
    navigate(`/application/admin`);
    };

    return (
    <div className="container mt-5">
        <div className="card p-4 shadow" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h3 className="text-center mb-4">Update Application</h3>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
            <Form.Label>Application Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            
            <Form.Group controlId="description" className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} required />
            </Form.Group>
            
            <Button variant="primary" type="submit" className="mt-3">Save Changes</Button>
        </Form>
        </div>
    </div>
    );
}

export default UpdateApplication;