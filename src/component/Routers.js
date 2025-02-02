import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import AllApplication from "./applicationAdmin/AllApplication";
import UpdateApplication from "./applicationAdmin/UpdateApplication";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AddApplication from "./applicationAdmin/AddApplication";
import AllCompnonent from "./componentAdmin/AllComponent";
import AddComponent from "./componentAdmin/AddComponent";
import UpdateComponent from "./componentAdmin/UpdateComponent";
import AllStatus from "./status/AllStatus";
import AddStatus from "./status/AddStatus";
import UpdateStatus from "./status/UpdateStatus";
import Viewer from "./viewer/Viewer";
import ViewerComponents from "./viewer/ViewerComponent";
import ViewerStatus from "./viewer/ViewerStatus";
import AllCompnonentsApplication from "./componentAdmin/AllComponentsApplication";
import ApplicationStatus from "./status/ApplicationStatus";
import ComponentStatus from "./status/ComponentStatus";
function Routers() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />


            <Route path="/application/admin" element={<AllApplication />} />
            <Route path="/application/update/:app_id" element={<UpdateApplication />} />
            <Route path="/application/add/" element={<AddApplication />} />


            <Route path="/components/app" element={<AllCompnonentsApplication />} />
            <Route path="/components/:app_id" element={<AllCompnonent />} />
            <Route path="/components/add/:app_id" element={<AddComponent />} />
            <Route path="/components/update/:com_id" element={<UpdateComponent />} />


            <Route path="/status/app" element={<ApplicationStatus />} />
            <Route path="/status/components/:app_id" element={<ComponentStatus />} />
            <Route path="/status/:com_id" element={<AllStatus />} />
            <Route path="/status/add/:com_id" element={<AddStatus />} />
            <Route path="/status/update/:status_id" element={<UpdateStatus />} />

            <Route path="/viewer/app/" element={<Viewer />} />
            <Route path="/viewer/components/:app_id" element={<ViewerComponents />} />
            <Route path="/viewer/status/:com_id" element={<ViewerStatus />} />
            
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default Routers;