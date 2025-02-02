import React, { useState,useEffect } from "react";
import Sidebar from "../Sidebar";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getApp } from "../../api/ViewerApi";

const Viewer = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [application, setApplication] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
          const response = await getApp(token); 
          setApplication(response);
        };
    
        fetchProjects();
      }, [token]);
  
    const handleComponent = async(app_id) => {
        navigate(`/viewer/components/${app_id}`);
    };
    
    return (
        <div className="d-flex">
        {/* Sidebar */}
        <Sidebar />
        
        <div className="container mt-5">
          <div className="card p-4 shadow" style={{ maxWidth: "100%", margin: "0 auto" }}>
            <h3 className="text-center mb-4">Applications</h3>
            
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Application Name</th>
                  <th>Description</th>
                  <th>User ID</th>
                  <th>Component</th>
                </tr>
              </thead>
              <tbody>
                {application.map((app) => (
                  <tr key={app.id}>
                    <td>{app.id}</td>
                    <td>{app.name}</td>
                    <td>{app.description}</td>
                    <td>{app.user.email}</td>
                    <td><Button variant="info" size="sm" className="me-2" onClick={() => handleComponent(app.id)}>Show component</Button></td>
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

export default Viewer;