import React from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminPage from "./adminPage";
import { useNavigate } from "react-router-dom";

const AdminLayout = ({ title, content, children }) => {
  const { isAdminAuthenticated } = useSelector((state) => state.admin);
  console.log(isAdminAuthenticated);
  const navigate = useNavigate();
  if (isAdminAuthenticated) {
    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={content} />
        </Helmet>
        <AdminPage />
        <div className="container mt-5">{children}</div>
      </>
    );
  } else {
    navigate("/admin");
  }
};
export default AdminLayout;
