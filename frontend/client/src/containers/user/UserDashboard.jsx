import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { emailVerify, otpEmailVerification, otpLogin, otpVerification, userCollection } from '../../features/user'
import {  NavLink, useNavigate } from 'react-router-dom'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'




const UserDashboard = () => {

    const dispatch = useDispatch()

    const [visible,setVisible]=useState(false)
    const [otp,setOtp]=useState()
    const toast = useRef()

    const { user } = useSelector(state => state.user)
    console.log(user&&user)
    const navigate = useNavigate()
    const [Collection, setCollection] = useState()
    useEffect(() => {
        const email = user&&user.email
            if (email === undefined) {
                return null
            }else{
            console.log(email)
            dispatch(userCollection(email)).then((result) => {
            setCollection(result.payload)
            })
        }
    }, [user])


    const onOtpVerification = (e)=>{
        e.preventDefault();
        const email = user&&user.email
        dispatch(otpEmailVerification({otp,email})).then(result=>{
            console.log(result.payload)
            if (result.payload ==='Verification Success'){
                setVisible(false)
                toast.current.show({ severity: 'success', summary: result.payload})
            }
        })
    }
const emailVerification = () => {
    dispatch(emailVerify(user&&user.email)).then(result=>{
        console.log(result.error)
        if (result.error){
            toast.current.show({ severity: 'error', summary: "can't send otp to this email"})

        }else{
            toast.current.show({ severity: 'success', summary: "otp sent successfully"})
            setVisible(true)
        }
      
    })
}


    return (
        <Layout title="DashBoard" content="Profile">
            <div className='container mt-5' onClick={()=>navigate('/home/dashboard/profile-view')}>
                <div className="surface-0 profile-block p-4 shadow-2 border-round border-dark">
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '10%' }}>
                            <img className='rounded profile-img' src={user && user.image_url ? user.image_url : require('./media/pngfind.com-circle-shape-png-5453533.png')} alt="profile img" />
                        </div>
                        <div className='mx-3' style={{ width: '60%' }}>
                            <div className="text-3xl font-medium text-900 mb-2">{user && user.first_name + ' ' + user.last_name}</div>
                            <div className="font-medium text-500 ">{user && user.email}</div>
                            <div className="font-medium text-500 ">{user && user.phone_number}</div>
                        </div>
                    </div>
                </div>
            </div>
            <form >
            <Toast ref={toast} />
            </form>
            {/* {user&&user.email_verified ===false?
                <div className='container'>
                    <div className="alert alert-danger mt-3 " role="alert" >
                    Your Email is not Verified. <NavLink onClick={emailVerification} className="alert-link" >click here</NavLink> to verify your email.
                  </div>   
                </div>
        :
        <div></div>
        } */}
         <Dialog header="Otp" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <h6>OTP Sended into this {user&&user.email}</h6>
<form onSubmit={onOtpVerification}>
<span className="p-float-label mt-4">
        <InputText type='number' value={otp} name='otp' className='form-inputs'  onChange={(e)=>{setOtp(e.target.value)}}  maxlength="16" />
        <label  >OTP</label>
    </span>

<Button value='' type='submit' className='bg-dark'>Verify</Button>
</form>
            </div>

</Dialog>

            <div className='container mt-5'>

                <div className="grid">
                    <div className="col-12 md:col-6 lg:col-3">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Blog Topic Idea</span>
                                    <div className="text-900 font-medium text-xl">{Collection&&Collection.blogIdeasCount}</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="fa-solid fa-blog text-blue-500 text-xl"></i>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Blog Sections</span>
                                    <div className="text-900 font-medium text-xl">{Collection&&Collection.blogSectionCount}</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="pi pi-map-marker text-orange-500 text-xl"></i>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Stories</span>
                                    <div className="text-900 font-medium text-xl">{Collection&&Collection.storyCount}</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="pi pi-inbox text-cyan-500 text-xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Total Words</span>
                                    <div className="text-900 font-medium text-xl">{user&&user.wordCount}</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="pi pi-comment text-purple-500 text-xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="container mt-3 mb-3">
                <hr />
            </div>
            
            <div className='container mt-5'>
                <div className="surface-0 profile-block p-4 shadow-2 border-round border-dark">
                    <div style={{ display: 'flex' }} onClick={()=>{navigate('/home/dashboard/profile-view/saved')}}>
                        <div className='mx-3 mt-2' style={{ width: '90%' }}>
                            <div className="text-3xl font-medium text-900 mb-2" >Saved Blog Ideas</div>
                        </div>
                        <div className='text-center mt-3'>
                        <i className="pi pi-arrow-right text-cyan-500 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mt-5'>
                <div className="surface-0 profile-block p-4 shadow-2 border-round border-dark">
                    <div style={{ display: 'flex' }} onClick={()=>navigate('/home/dashboard/profile-view/Blog-Section')}>
                        <div className='mx-3 mt-2' style={{ width: '90%' }} >
                            <div className="text-3xl font-medium text-900 mb-2">Blog Sections</div>
                        </div>
                        <div className='text-center mt-3'>
                        <i className="pi pi-arrow-right text-cyan-500 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mt-5'>
                <div className="surface-0 profile-block p-4 shadow-2 border-round border-dark" onClick={()=>navigate('/home/dashboard/profile-view/Blog-details')}>
                    <div style={{ display: 'flex' }}>
                        <div className='mx-3 mt-2' style={{ width: '90%' }}>
                            <div className="text-3xl font-medium text-900 mb-2">Blog</div>
                        </div>
                        <div className='text-center mt-3'>
                        <i className="pi pi-arrow-right text-cyan-500 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mt-5'>
                <div className="surface-0 profile-block p-4 shadow-2 border-round border-dark">
                    <div style={{ display: 'flex' }}>
                        <div className='mx-3 mt-2' style={{ width: '90%' }}>
                            <div className="text-3xl font-medium text-900 mb-2">Story</div>
                        </div>
                        <div className='text-center mt-3'>
                        <i className="pi pi-arrow-right text-cyan-500 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5 mb-3">
                <hr />
            </div>

            <div className='container mt-5 mb-5'>
                <div className="surface-0 profile-block p-4 shadow-2 border-round border-dark" onClick={()=>navigate('/home/dashboard/billing-page')}>
                    <div style={{ display: 'flex' }}>
                        <div className='mx-3 mt-2' style={{ width: '90%' }}>
                            <div className="text-3xl font-medium text-900 mb-2">Billing</div>
                        </div>
                        <div className='text-center mt-3'>
                        <i className="pi pi-arrow-right text-cyan-500 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default UserDashboard