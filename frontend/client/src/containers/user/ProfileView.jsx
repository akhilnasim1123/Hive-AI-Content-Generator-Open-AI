import React from 'react'
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux'
import { Button } from 'primereact/button'

const ProfileView = () => {
    const {user} = useSelector(state=>state.user)
  return (
        <Layout>
            <div className='container mx-5'>
                    <div className='card mt-5 mx-5' style={{height:'310px',width:'75%',display:'flex',alignItems:'center', justifyContent:'center'}}>
                        <form action="" className='container' style={{display:'flex',alignItems:'center', justifyContent:'center',flexDirection:'column'}}>
                        <div className='mt-5'  style={{width:'10%'}}>
                             <img className='profile-img'  src={require('./media/pngfind.com-circle-shape-png-5453533.png')} alt="Profile pic" />
                        </div>
                        <div className='mt-4'>
                          <div className='d-flex'>
                          <div className='mt-3 mx-3'>
                                <input value={user&&user.first_name} type="text" className="form-control" />
                            </div>
                            <div className='mt-3 mx-3'>
                                <input value={user&&user.last_name} type="text" className="form-control" />
                            </div>
                          </div>

                          <div className='d-flex'>
                          <div className='mt-3 mx-3'>
                                <input value={user&&user.email} type="email" className="form-control" />
                            </div>
                            <div className='mt-3 mx-3'>
                                <input value={user&&user.phone_number} type="text" className="form-control" />
                            </div>
                          </div>
                          <div className='mt-3 mx-3'>
                            <Button label='submit' size='small'></Button>
                          </div>


                        </div>
                        </form>
                        </div>
                    </div>
        
        </Layout>
  )
}

export default ProfileView