import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../features/user'
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';



const SideBar = () => {

  const [visible, setVisible] = useState(false);


  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    
    <div className="flex justify-content-center mt-4">
    <Sidebar visible={visible} onHide={() => setVisible(false)} className='left-sidebar'>

        <div className='side-bar-items mt-5'>

          <div>
            <div>
              <div className='row'>
                <div className='dashboard-icon'>
                <i class="fa-solid fa-gauge dashboard-icons"></i>
                </div>
                <div className='dashboard'>
                  <NavLink className='side-bar-item-link dashboard-logo' to='/home/dashboard'>Dashboard</NavLink>
                  </div>
              </div>

              <div className='row mt-3'>
              <div className='dashboard-icon'>
                <i class="fa-solid fa-gauge dashboard-icons"></i>
                </div>
                <div className='dashboard'><NavLink className='side-bar-item-link dashboard-logo' to='/home'>Generate Blog</NavLink></div>
              </div>

              <div className='row mt-3'>
              <div className='dashboard-icon'>
                <i class="fa-solid fa-gauge dashboard-icons"></i>
                </div>
                <div className='dashboard'><NavLink to='/home/dashboard/billing-page' className='side-bar-item-link dashboard-logo'>Billing</NavLink></div>
              </div>

            </div>
          </div>

          


          <div className='logout-user mt-3'>
          <div className='row'>
                <div className='signout-icon'>
                <i className='fa fa-sign-out sign-out-icon' aria-hidden="true"></i>
                </div>
                <div className='signout'>
                <NavLink  className="user-logout" onClick={()=>dispatch(logout())}>Log Out</NavLink>
                </div>

            </div>
          </div>
        </div>
    </Sidebar>
    <Button icon="pi pi-bars sidebar-han" size='sm' onClick={() => setVisible(true)}  style={{backgroundColor:'white',color:'rgb(26 32 43)',borderColor: 'rgb(26 32 43)'}}/>

    </div>
  )
}

export default SideBar