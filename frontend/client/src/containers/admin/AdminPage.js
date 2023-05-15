import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'


import { adminLogout, checkAdmin } from '../../features/admin'



const AdminPage = () => {
    const dispatch = useDispatch()
    // useEffect(() => {
    //   dispatch(checkAdmin());
    // }, []);
    const {loading} = useSelector(state=>state.admin)


    const { isAdminAuthenticated } = useSelector((state) => state.admin);
    console.log(isAdminAuthenticated);
    const navigate = useNavigate();
    if(!isAdminAuthenticated) return <Navigate to='/admin'/>
    return (
        <div className='row admin-body'>
            <div className='navbar-admin bg-dark'>
                <div className=" col logo-admin text-white" >
                    <p className='mt-3'><b></b><NavLink className='admin-logo' to='/admin-page'>Admin</NavLink></p>
                </div>
                <hr className='text-white' />
                <div className="col text-white">
                    <div className='col admin-pages'>
                        <div className="userpage">
                            <NavLink to='/users-list' className='nav-users '>Users Management</NavLink>
                        </div>
                        <div className="prime-management mt-3">
                            <NavLink to='/admin-page/prime-management' className='nav-users '>Prime Management</NavLink>
                        </div>
                        <div className="key-page mt-5">
                            <NavLink  className='nav-users' onClick={()=>dispatch(adminLogout()).then(result=>{navigate('/admin')})}>Logout</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage