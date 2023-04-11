import { Button } from 'primereact/button'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'
import Layout from '../../components/Layout'
import SideBar from '../../components/SideBar'
import Carousel from 'react-bootstrap/Carousel';
const UserDashboard = () => {
  const { isAuthenticated } = useSelector(state => state.user)
  // if (!isAuthenticated) return <Navigate to='/login'/>
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
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
                    <Button className='mt-3 new-button' size='sm'><NavLink className='navlink ' to='/generate-page'>New</NavLink></Button>
                  </div>
                </div>
              </div>
              <div>
                <div className='service-category row mt-5'>

                  <div className='card col-md-4 col-12 .col-md-6 services mt-4 blog-idea-service'>
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


                  <div className=' card col-md-4 col-12 .col-md-6 services mt-4 blog-service'>
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
                  <div className='card col-md-4 col-12 .col-md-6 mt-4 services story-service'>
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

            <div className='card  chat-block'>
              <div className="container">
              <div className='mt-3'>
                <p><b>ChatGPT is the perfect way to stay connected and make new friends. <br /> So what are you waiting for? <br /> Invite your friends to join Chat</b></p>
              </div>
              <div className="mt-3">
                <Button label='Chat' size='sm'> </Button>
              </div>
              </div>
            </div>



            {/* <div className='mt-5 '>



            <Carousel variant="dark" className='text-white'>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-image-style"
          src={require('./media/ios-13-stock-ipados-dark-green-black-background-amoled-ipad-3840x2160-794.jpg')}
          alt="First slide"
          style={{height: '200px'}}
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>  AI Blog writing assistant
                        generates blog posts based on your
                        specific needs, so you can write
                        more without taking up extra time.</p>
          <button className='btn btn-white text-white'>Create</button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className='bg-dark'>

        </div>
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>  AI Blog writing assistant
                        generates blog posts based on your
                        specific needs, so you can write
                        more without taking up extra time.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=e5e5e5"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>





            </div> */}

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UserDashboard