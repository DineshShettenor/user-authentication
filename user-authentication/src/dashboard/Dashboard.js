import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"; // Assuming you have CSS for styling

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (role) => {
    navigate(`/login?role=${role}`);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to the Dashboard</h1>
      <div className="button-container">
        <button
          className="role-button admin-button"
          onClick={() => handleNavigation("admin")}
        >
          Admin
        </button>
        <button
          className="role-button manager-button"
          onClick={() => handleNavigation("manager")}
        >
          Manager
        </button>
        <button
          className="role-button staff-button"
          onClick={() => handleNavigation("staff")}
        >
          Staff
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
