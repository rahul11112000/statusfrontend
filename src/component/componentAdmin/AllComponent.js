import React, { useState,useEffect } from "react";
import Sidebar from "../Sidebar";
import { deleteComponent, getComponents } from "../../api/ComponentApi";
import { Table, Button } from "react-bootstrap";
import { useNavigate ,useParams} from "react-router-dom";
const AllCompnonent = () => {

    const { app_id } = useParams();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [component, setComponet] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
          const response = await getComponents(app_id,token); 
          setComponet(response);
        };
    
        fetchProjects();
      }, [token]);
  
    const handleUpdate = (com_id) => {
        navigate(`/components/update/${com_id}`);
    };

    const handleDelete = async(com_id) => {
        const response = await deleteComponent(com_id,token); 
        navigate(`/components/${app_id}`);
    };

    const addComponents = async() => {
        navigate(`/components/add/${app_id}`);
    };
    const handleStatus = async(com_id) => {
        localStorage.setItem("com_id", com_id);
        navigate(`/status/${com_id}`);
    };

    return (
        <div className="d-flex">
        {/* Sidebar */}
        <Sidebar />
        
        <div className="container mt-5">
          <div className="card p-4 shadow" style={{ maxWidth: "100%", margin: "0 auto" }}>
            <h3 className="text-center mb-4">Components</h3>
            
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Component Name</th>
                  <th>Application Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {component.map((com) => (
                  <tr key={com.id}>
                    <td>{com.id}</td>
                    <td>{com.name}</td>
                    <td>{com.application.name}</td>
                    <td><Button variant="info" size="sm" className="me-2" onClick={() => handleStatus(com.id)}>Show status</Button></td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2"onClick={() => handleUpdate(com.id)}>Update</Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(com.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <br/>
              <Button variant="primary"  className="me-2"onClick={() => addComponents(app_id)}>Add</Button>
            </Table>
            
          </div>
          
        </div>
      </div>
    );
}

export default AllCompnonent;