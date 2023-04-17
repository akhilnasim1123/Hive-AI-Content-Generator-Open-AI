import { Button } from 'primereact/button'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { StyleClass } from 'primereact/styleclass';


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

const Subscription = ()=>{
    return (
        <>
        <div className="surface-0 container mt-5">
        <div className="text-900 font-bold text-6xl mb-4 text-center">Subscription Plans</div>
        <div className="text-700 text-xl mb-6 text-center line-height-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div>
    
        <div className="grid">
            <div className="col-12 lg:col-4">
                <div className="p-3 h-full">
                    <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                        <div className="text-900 font-medium text-xl mb-2">Free Trail</div>
                        <div className="text-600">Plan description</div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <div className="flex align-items-center">
                            <span className="font-bold text-2xl text-900">$0.00</span>
                            <span className="ml-2 font-medium text-600">per month</span>
                        </div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <ul className="list-none p-0 m-0 flex-grow-1">
                            <li className="flex align-items-center mb-3">
                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>20000 words <span className='text-secondary'> per month</span></span>
                            </li>
                            <li className="flex align-items-center mb-3">
                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>All use Cases</span>
                            </li>
                            <li className="flex align-items-center mb-3">
                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Morbi tincidunt augue</span>
                            </li>
                        </ul>
                        <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
                        <Button label="Buy Now" className="p-3 w-full mt-auto" />
                    </div>
                </div>
            </div>
    
            <div className="col-12 lg:col-4">
                <div className="p-3 h-full">
                    <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                        <div className="text-900 font-medium text-xl mb-2">Premium</div>
                        <div className="text-600">Plan description</div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <div className="flex align-items-center">
                            <span className="font-bold text-2xl text-900">$29</span>
                            <span className="ml-2 font-medium text-600">per month</span>
                        </div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <ul className="list-none p-0 m-0 flex-grow-1">
                            <li className="flex align-items-center mb-3">
                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Arcu vitae elementum</span>
                            </li>
                            <li className="flex align-items-center mb-3">
                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Dui faucibus in ornare</span>
                            </li>
                            <li className="flex align-items-center mb-3">
                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Morbi tincidunt augue</span>
                            </li>
                            <li className="flex align-items-center mb-3">
                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Duis ultricies lacus sed</span>
                            </li>
                        </ul>
                        <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <Button label="Buy Now" className="p-3 w-full" />
                    </div>
                </div>
            </div>
    
            <div className="col-12 lg:col-4">
                <div className="p-3 h-full">
                    <div className="shadow-2 p-3 flex flex-column" style={{ borderRadius: '6px' }}>
                        <div className="text-900 font-medium text-xl mb-2">Enterprise</div>
                        <div className="text-600">Plan description</div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <div className="flex align-items-center">
                            <span className="font-bold text-2xl text-900">$49</span>
                            <span className="ml-2 font-medium text-600">per month</span>
                        </div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <ul className="list-none p-0 m-0 flex-grow-1">
                            <li className="flex align-items-center mb-3">
                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Arcu vitae elementum</span>
                            </li>
                            <li className="flex align-items-center mb-3">
                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Dui faucibus in ornare</span>
                            </li>
                            <li className="flex align-items-center mb-3">
                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Morbi tincidunt augue</span>
                            </li>
                            <li className="flex align-items-center mb-3">
                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Duis ultricies lacus sed</span>
                            </li>
                            <li className="flex align-items-center mb-3">
                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Imperdiet proin</span>
                            </li>
                            <li className="flex align-items-center mb-3">
                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>Nisi scelerisque</span>
                            </li>
                        </ul>
                        <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <Button label="Buy Now" className="p-3 w-full p-button-outlined" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    
        </>
    )
}

const LandingPage = () => {
  return (
    <div style={{fontFamily:'Kadwa'}}>
        <div className='landing'>
        <Navbar/>
            <Banner/>
            <Subscription/>

        </div>
    </div>
  )
}

export default LandingPage