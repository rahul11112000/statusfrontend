import React, { useState ,useEffect} from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { addComponent, updateComponent } from "../../api/ComponentApi";
import { getComponent } from "../../api/ComponentApi";
const UpdateComponent = () => {

    const token = localStorage.getItem("token");
    const { com_id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "" });

    useEffect(() => {
        const fetchApplication = async () => {
            const response = await getComponent(com_id,token); 
            setFormData(response);
        };
        fetchApplication();
    }, [com_id]);

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateComponent(com_id,formData,token);
    const app_id = response.application.id;
    navigate(`/components/${app_id}`);

    };

    return (
    <div className="container mt-5">
        <div className="card p-4 shadow" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h3 className="text-center mb-4">Update Component</h3>
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

export default UpdateComponent;