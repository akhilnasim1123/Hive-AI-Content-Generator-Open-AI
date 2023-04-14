import { Button } from 'primereact/button'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'
import Layout from '../../components/Layout'
import SideBar from '../../components/SideBar'
import Carousel from 'react-bootstrap/Carousel';
const HomeDashboard = () => {
  const { isAuthenticated } = useSelector(state => state.user)
  if (!isAuthenticated) return <Navigate to='/login'/>
  // const [index, setIndex] = useState(0);

  // const handleSelect = (selectedIndex, e) => {
  //   setIndex(selectedIndex);
  // };
  return (
    <Layout title="auth site | Home" content="Hom Page">
      <div className=" text-700 chatGPT-intro mb-5 text-center">
    <div className="text-blue-600 font-bold mb-3"><i className="pi pi-discord"></i>&nbsp;POWERED BY OPEN AI</div>
    <div className="text-900 font-bold text-5xl mb-3">Chat The Powerful A I</div>
    <div className="text-700 text-2xl mb-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div>
    <Button label="Chat Now" icon="pi pi-discord" className="chat-now-btn font-bold px-5 py-3 p-button-raised p-button-rounded white-space-nowrap" />
</div>
      <div className='generate-page' style={{paddingLeft: '5%'}}>
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
                    <Button className='mt-3 new-button' size='sm'><NavLink className='navlink ' to='/generate-page'>New</NavLink></Button>
                  </div>
                </div>
              </div>
              <div>
                <div className='service-category row mt-5'>

                  <div className='card services mt-4 blog-idea-service'>
                    <div id="blog-idea">
                    <div className='mt-4 blog-idea'>
                      <i class="fa-solid fa-blog blog-idea-logo"></i>
                    </div>
                    <div className='blog-idea-assistant'><h className='mt-3 heading'><b>Blog Idea Assistance</b></h></div>
                    <div className='mt-3'>
                      <p className='para-idea'>  AI Blog writing assistant
                        generates blog posts based on your
                        specific needs, so you can write
                        more without taking up extra time.</p>
                    </div>
                    <div className='mt-3'>
                      <Button size='sm' className='create-button'><NavLink to='/blog-idea' className='navlink'>Create</NavLink></Button>
                    </div>
                    </div>
                  </div>


                  <div className=' card  services mt-4 blog-service'>
                    <div className='blog-ass'>
                    <div className='blog-logo mt-4'>
                    <i class="fa-brands fa-blogger-b blog-gen-logo"></i>
                    </div>
                    <div className='blog-idea-assistant'>
                      <h className='mt-3 heading'> <b>Blog Writing Assistance</b></h>
                    </div>
                    <div className='mt-3'>
                      <p className='para-blog'>  AI Blog writing assistant
                        generates blog posts based on your
                        specific needs, so you can write
                        more without taking up extra time.</p>
                    </div>
                    <div className=''>
                      <Button size='sm' className='create-button'><NavLink to='/blog-generate' className='navlink'>Create</NavLink></Button>
                    </div>
                    </div>
                  </div>
                  <div className='card  mt-4 services story-service'>
                    <div className='story-ass'>
                    <div className='story-logo mt-4'>
                    <i class="fa-solid fa-book story-logo"></i>
                    </div>
                    <div className='story-assistance'>
                      <h className='mt-3 heading'> <b>Story Writing Assistance</b></h>
                    </div>
                    <div className='mt-3'>
                      <p className='para-story'>  AI Blog writing assistant
                        generates blog posts based on your
                        specific needs, so you can write
                        more without taking up extra time.</p>
                    </div>
                    <div className=''>
                      <Button size='sm' className='create-button'><NavLink to='/story-generate' className='navlink'>Create</NavLink></Button>
                    </div>
                    </div>
                  </div>
                </div>
              </div>





            </div>
          </div>
        </div>
      </div>
    
    </Layout>
  )
}

export default HomeDashboard