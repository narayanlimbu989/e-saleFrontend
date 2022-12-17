import React from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Addproduct from "./Pages/Addproduct";
import Manageorders from "./Pages/Manageorders";
import Manageproduct from "./Pages/Manageproduct";
import { useNavigate } from "react-router-dom";
import Fackorder from "./Pages/Fackorder";

const App = () => {
  const linkto = useNavigate();

  return (
    <div className="mainpage">
      <div className="top">
        <h1>online seller center</h1>
      </div>
      <div className="down">
        <div className="sidenavbar">
          <div className="options" onClick={() => linkto("/")}>
            Add products
          </div>
          <div className="options" onClick={() => linkto("/manageproduct")}>
            Manage & update products
          </div>
          <div className="options" onClick={() => linkto("/manageorder")}>
            Order & Reviews products
            {Fackorder.length > 0 && (
              <span className="Torders">{Fackorder.length}</span>
            )}
          </div>
        </div>

        <div className="showpages">
          <Routes>
            <Route path="/" element={<Addproduct />} />
            <Route path="/manageproduct" element={<Manageproduct />} />
            <Route path="/manageorder" element={<Manageorders />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
