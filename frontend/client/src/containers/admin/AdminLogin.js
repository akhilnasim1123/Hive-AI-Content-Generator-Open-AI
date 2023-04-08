import React, { useState } from 'react'
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { adminLog } from '../../features/admin';
import { Navigate, NavLink } from 'react-router-dom';

const AdminLogin = () => {
    const {isAdminAuthenticated}=useSelector(state=>state.admin)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData

    const onchange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(adminLog({email,password}))

    }
    if (isAdminAuthenticated)return <Navigate to='/admin-page'/>
    return (
        <div className=' admin-page '>
            <div className="card col mt-5  text-white   admin-login" style={{backgroundColor: 'rgb(26 32 43)' }}>
                <div className="col mt-5">
                    <p style={{ fontSize: '2rem' }}><b>Admin Login</b></p>
                </div>
                <form className="col" onSubmit={onSubmitHandler} >
                <div className="col">
                    <span className="p-float-label">
                        <InputText name='email' value={email} className='form-inputs' onChange={onchange} maxlength="16" />
                        <label style={{ color: 'rgb(59 255 225)' }}>Email Address</label>
                    </span>
                    <span className="p-float-label mt-4" style={{ color: 'rgb(59 255 225)', backgroundColor: 'rgb(26 32 43)' }}>
                        <Password style={{ color: 'rgb(59 255 225)', backgroundColor: 'rgb(26 32 43)' }} value={password} inputId="password" name='password' className='form-inputs' onChange={onchange} toggleMask />
                        <label htmlFor="password" style={{ color: 'rgb(59 255 225)' }}>Password</label>
                    </span>
                    <Button label="Login" className='mt-3' style={{ backgroundColor: 'rgb(59 255 225)', color: 'rgb(26 32 43)', border: 'none' }} type="submit" icon="pi pi-check" />
                </div>
                </form>
                <div className="col"></div>
            </div>
        </div>
    )
}

export default AdminLogin