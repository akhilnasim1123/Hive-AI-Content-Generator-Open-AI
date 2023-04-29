import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { StyleClass } from 'primereact/styleclass';
import { Dialog } from 'primereact/dialog';
import { logout, premiumSubscription, premiumSubscriptionPlans } from '../../features/user';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';


const Navbar = () => {
    const dispatch = useDispatch()
        const {user} = useSelector(state=>state.user)
    return(
        <div className='navbar-landing'>
        <div className='main-navbar'>
            <div className='navbar-partOne-banner'></div>
            <div className='navbar-partTwo-banner'> 
                <div>
                    <NavLink className='about'>About</NavLink>
                </div>
    
                <div>{user?<NavLink className='login' onClick={()=>dispatch(logout())}>logout</NavLink>:<NavLink className='login' to='/login'>Login</NavLink>}</div>
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
                <img src={require('./media/IMG_20230320_201820_983-removebg-preview.png')} alt="banner img" style={{width:'100%'}}/>
            </div>
            </div>
            </div>
        </div>
    )
}

const OpenAi=()=>{
    return (
        <div style={{height:'100px'}}>
            <div className='d-flex justify-center' style={{height:'100%',alignItems:'center'}}>
                <img style={{    width: '165px'}} src={require('./media/OpenAI Logo Vector (1).png')} alt='open ai'/>
            </div>
        </div>
    )
}


const Subscription = ()=>{



    const navigate = useNavigate()
    const [subscribedData,setSubscribedData]=useState([])
    const [planName,setPlanName]=useState()
    const [plansName,setPlansName]=useState([])
  
    const [formData,setVisible]=useState({
      visible:false,
      key:''
    })
    const [plans,setPlans]=useState({
      freeTrail:'',
      beginner:'',
      advanced:'',
    });
    
    useEffect(()=>{
        const email = user&&user.email
        if (email === undefined) {
            return null
        }
          dispatch(premiumSubscriptionPlans(email)).then(result => {
              console.log(result.payload)
              setPlans({
                freeTrail:result.payload[1],
                beginner:result.payload[2],
                advanced:result.payload[0],
              })
    
          })
        },[])
  
  
  
  
    const dispatch = useDispatch()
    console.log(plans)
  
    const {visible,key} = formData
    const [amount,setAmount]=useState(0)
    const { user,isAuthenticated } = useSelector(state => state.user)
    console.log(user&&user.premium)
   
    const visibleContent = (event,prize,plan) =>{
        if (isAuthenticated){
            console.log(prize)
            console.log(plan)
            setAmount(prize)
            setVisible({
              key:plan,
              visible:true
            })
        }else{
            navigate('/login')
        }
  
    }
    console.log(amount)
    const onRazerPay = (amount,key) =>{
      console.log(process.env.RazorPayKeyId)
      const email = user&&user.email
      console.log(amount * 100)
      var options = {
        key:process.env.REACT_APP_RazorPayKeyId,
        key_secret:process.env.REACT_APP_RazorPayKeySecret,
        amount:amount * 100,
        currency:"INR",
        name:"Hive AI",
        description:"premium subscription",
        handler: function(response) {
          const paymentId = response.razorpay_payment_id
          dispatch(premiumSubscription({amount,paymentId,email,key})).then((result)=>{
            
          Swal.fire({
            text: response.razorpay_payment_id,
            icon: "Success",
          });
  
        })
        },
        prefill:{
          name:user&&user.first_name+' '+user.last_name,
          email:user&&user.email,
          contact:user&&user.phone_number
        },
        notes:{
          address:"address "
        },
        theme:{
          color:"#1a202b"
        }
      };
      var pay = new window.Razorpay(options)
      pay.open()
    }
    const {freeTrail,beginner,advanced} = plans
  console.log(user && user.currentSub)




    return (
        <>
<div className="surface-0 container mt-5">
        <div className="text-900 font-bold text-6xl mb-4 text-center">Subscription Plans</div>
        <div className="text-700 text-xl mb-6 text-center line-height-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div>
    
        <div className="grid">
            <div className="col-12 lg:col-4">
                <div className="p-3 h-full">
                    <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                        <div className="text-900 font-medium text-xl mb-2">{freeTrail&&freeTrail.prime}</div>
                        <div className="text-600">Plan description</div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <div className="flex align-items-center">
                            <span className="font-bold text-2xl text-900">${freeTrail&&freeTrail.prize}</span>
                            <span className="ml-2 font-medium text-600">per month</span>
                        </div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <ul className="list-none p-0 m-0 flex-grow-1">
                            <li className="flex align-items-center mb-3">
                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>{freeTrail&&freeTrail.words} words <span className='text-secondary'> per month</span></span>
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
                        <Button disabled label="Buy Now" className="p-3 w-full mt-auto" />
                    </div>
                </div>
            </div>
    
            <div className="col-12 lg:col-4">
                <div className="p-3 h-full">
                    <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px' }}>
                        <div className="text-900 font-medium text-xl mb-2">{beginner&&beginner.prime}</div>
                        <div className="text-600">Plan description</div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <div className="flex align-items-center">
                            <span className="font-bold text-2xl text-900">${beginner&&beginner.prize}</span>
                            <span className="ml-2 font-medium text-600">per month</span>
                        </div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <ul className="list-none p-0 m-0 flex-grow-1">
                            <li className="flex align-items-center mb-3">
                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>{beginner&&beginner.words} words <span className='text-secondary'> per month</span></span>
                            </li>
                            <li className="flex align-items-center mb-3">
                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>All use Cases</span>
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
                        <Button value={beginner&&beginner.prize} label="Buy Now" className="p-3 w-full" onClick={(e)=>{visibleContent(e.target.value,beginner&&beginner.prize,beginner&&beginner.prime)}}/>
                    </div>
                </div>
            </div>
    
            <div className="col-12 lg:col-4">
                <div className="p-3 h-full">
                    <div className="shadow-2 p-3 flex flex-column" style={{ borderRadius: '6px' }}>
                        <div className="text-900 font-medium text-xl mb-2">{advanced&&advanced.prime}</div>
                        <div className="text-600">Plan description</div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <div className="flex align-items-center">
                            <span className="font-bold text-2xl text-900">${advanced&&advanced.prize}</span>
                            <span className="ml-2 font-medium text-600">per month</span>
                        </div>
                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                        <ul className="list-none p-0 m-0 flex-grow-1">
                            <li className="flex align-items-center mb-3">
                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>{advanced&&advanced.words} words <span className='text-secondary'> per month</span></span>
                            </li>
                            <li className="flex align-items-center mb-3">
                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                <span>All use Cases</span>
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
                        <Button value={advanced&&advanced.prize}  label="Buy Now" className="p-3 w-full p-button-outlined" onClick={(e)=>{visibleContent(e.target.value,advanced&&advanced.prize,advanced&&advanced.prime)}} />
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
        <Button value={amount}  className='bg-dark'  onClick={(e)=>{onRazerPay(e.target.value,key)}}>Razer Pay</Button>
        {amount}
        </Dialog>
    
        </>
    )
}

const LandingPage = () => {
    const {user} = useSelector(state=>state.user)
  return (
    <div style={{fontFamily:'Kadwa'}}>
        <div className='landing min-h-screen'>
        <Navbar/>
            <Banner/>
            <OpenAi/>
            {user&&user.premium?<div></div>:<Subscription/>}
            

        </div>
    </div>
  )
}

export default LandingPage