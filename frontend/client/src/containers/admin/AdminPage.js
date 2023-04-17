import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Shimmer from '../shimmer/shimmer'

const AdminPage = () => {
    // const {loading} = useSelector(state=>state.admin)
    // if (loading) return <Shimmer />
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
                        <div className="key-page mt-3">
                            <NavLink to='/users' className='nav-users '>Keys</NavLink>
                        </div>
                        <div className="prime-management mt-3">
                            <NavLink to='/admin-page/prime-management' className='nav-users '>Prime Management</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPage