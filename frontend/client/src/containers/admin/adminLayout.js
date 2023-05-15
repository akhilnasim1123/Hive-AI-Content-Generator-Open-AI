import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminPage from "./AdminPage";
import { useNavigate } from "react-router-dom";
import { checkAdmin } from "../../features/admin";

const AdminLayout = ({ title, content, children }) => {
  const { isAdminAuthenticated } = useSelector((state) => state.admin);

  console.log(isAdminAuthenticated);
  const navigate = useNavigate();
  if(!isAdminAuthenticated) return <Navigate to='/admin'/>
    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={content} />
        </Helmet>
        <div className='layout-admin'>  
    <div className='layout-sidebar-admin'>
        <AdminPage/>
        </div>   
    <div className="container layout-children-admin">
        {children}
    </div>
    </div>
      </>
    );
};
export default AdminLayout;
