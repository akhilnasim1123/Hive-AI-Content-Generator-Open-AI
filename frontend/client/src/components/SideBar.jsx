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
        <div className='side-bar-items mt-5'>

          <div>
            <div>
              <div className='row'>
                <div className='dashboard-icon'>
                <i class="fa-solid fa-gauge dashboard-icons"></i>
                </div>
                <div className='dashboard'>
                  <NavLink className='side-bar-item-link dashboard-logo' to='/home'>Dashboard</NavLink>
                  </div>
              </div>

              <div className='row mt-3'>
              <div className='dashboard-icon'>
                <i class="fa-solid fa-gauge dashboard-icons"></i>
                </div>
                <div className='dashboard'><NavLink className='side-bar-item-link dashboard-logo'>Generate Blog</NavLink></div>
              </div>
              <div></div>
            </div>
          </div>


          <div className='logout-user mt-3'>
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