import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { addComponent } from "../../api/ComponentApi";
const AddComponent = () => {

    const token = localStorage.getItem("token");
    const { app_id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "" });


    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addComponent(app_id,formData,token);
    navigate(`/components/${app_id}`);
    };

    return (
    <div className="container mt-5">
        <div className="card p-4 shadow" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h3 className="text-center mb-4">Add Component</h3>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
            <Form.Label>Component Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            
            <Button variant="primary" type="submit" className="mt-3">Save Changes</Button>
        </Form>
        </div>
    </div>
    );
}

export default AddComponent;