import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../features/user'



const SideBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(logout)
    navigate('/login')

    
  }
  return (
    <div className='left-sidebar'>
        <div className='side-bar-items'>
          <div className='logout-user'>
          <div className='row'>
                <div className='signout-icon'>
                <i className='fa fa-sign-out sign-out-icon' aria-hidden="true"></i>
                </div>
                <div className='signout'>
                <NavLink  className="user-logout" onClick={onSubmitHandler}>Log Out</NavLink>
                </div>

            </div>
          </div>
        </div>
    </div>
  )
}

export default SideBar