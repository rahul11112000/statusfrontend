import React, { useState,useEffect } from "react";
import Sidebar from "../Sidebar";
import { getViewerComponents } from "../../api/ViewerApi";
import { Table, Button } from "react-bootstrap";
import { useNavigate ,useParams} from "react-router-dom";
const ViewerComponents = () => {

    const { app_id } = useParams();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [component, setComponet] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
          const response = await getViewerComponents(app_id,token); 
          setComponet(response);
        };
    
        fetchProjects();
      }, [token]);
  
    const handleStatus = async(com_id) => {
        localStorage.setItem("com_id", com_id);
        navigate(`/viewer/status/${com_id}`);
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
                </tr>
              </thead>
              <tbody>
                {component.map((com) => (
                  <tr key={com.id}>
                    <td>{com.id}</td>
                    <td>{com.name}</td>
                    <td>{com.application.name}</td>
                    <td><Button variant="info" size="sm" className="me-2" onClick={() => handleStatus(com.id)}>Show status</Button></td>
                  </tr>
                ))}
              </tbody>
              <br/>
            </Table>
            
          </div>
          
        </div>
      </div>
    );
}

export default ViewerComponents;