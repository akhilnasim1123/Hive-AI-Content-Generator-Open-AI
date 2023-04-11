import { Button } from 'primereact/button'
import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
    return(
        <div className='navbar-landing'>
        <div className='main-navbar'>
            <div className='navbar-partOne-banner'></div>
            <div className='navbar-partTwo-banner'> 
                <div>
                    <NavLink className='about'>About</NavLink>
                </div>
    
                <div><NavLink className='login' to='/login'>Login</NavLink></div>
            </div>
        </div>
    </div>
    )
}

const Banner = ()=>{
    return(
        <div className='landing-banner'>
            <div className='container'>
            <div className='banner-cat'>
            <div className='banner-title'>
                <div><h1><b>Great Write, <br></br> Simplified</b></h1></div>
                <div className='mt-4'>
                    <p>Compose bold, clear, mistake-free writing with <br /> Blacknotes’s AI powered Writing Assistant.</p>
                </div>
                <div>
                    <Button  className='create-from-landing'><NavLink className='landing-create' to='/home'>Create</NavLink> </Button>
                </div>
            </div>
            <div className='banner-img'>
                <img src={require('./media/IMG_20230320_201820_983-removebg-preview.png')} alt="banner img" />
            </div>
            </div>
            </div>
        </div>
    )
}

const LandingPage = () => {
  return (
    <div style={{fontFamily:'Kadwa'}}>
        <div className='landing'>
        <Navbar/>
            <Banner/>
        </div>
    </div>
  )
}

export default LandingPage