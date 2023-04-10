import { Button } from 'primereact/button'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import SideBar from '../../components/SideBar'

const UserDashboard = () => {
  const {isAuthenticated} = useSelector(state=>state.user)
  // if (!isAuthenticated) return <Navigate to='/login'/>
  return (
<Layout title="auth site | Home" content="Hom Page">
<div className='generate-page'>
<div className='row generate-layout'>
      <div className='generatePage-body'>
        <div>
          <div className=''>
              <div className=' col card generate-intro mt-5 '>
             <div className=" mt-5 text-block">
             <h2>
                  <b>Write Captivating <br /> Blog Introductions <br /> <span className='with-ai'> With A I</span></b>
                </h2>
             </div>
             <div className=' intro-new'>
              <Button label='New' className='mt-3 new-button' size='sm'></Button>
             </div>
              </div>
          </div>
          <div></div>
        </div>
      </div>
      <div className='right-sidebar'></div>
    </div>
</div>
</Layout>
  )
}

export default UserDashboard