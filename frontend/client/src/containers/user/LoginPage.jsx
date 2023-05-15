
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { useSelector, useDispatch } from "react-redux";
import { login } from '../../features/user';
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import Shimmer from '../shimmer/shimmer';
import { Dialog } from 'primereact/dialog';



export default function LoginPage() {
    const navigate = useNavigate()
    const {isAuthenticated,authLoading}=useSelector(state=>state.user)
    const [visible,setVisible] = useState()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    console.log(isAuthenticated)
    const {email, password} = formData
    const toast = useRef(null);
    const onchange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Login successful'});
    };

    const defaultValues = {
        value: ''
    };



    const {
        control,
        formState: { errors },
    } = useForm({ defaultValues });

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log(email, password);
        if (email.length > 30){
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Email is too long' });
        }else if (email && password) {
            dispatch(login({email, password})).then((result)=>{
                show();
                
            })

        }
        else {
            toast.current.show({ severity: 'error', summary: 'Please fill in all fields'});
        }
    };
    
    if (email.length > 20  && password.length > 8){

    }

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    if (authLoading) return <Shimmer />
    if (isAuthenticated) return <Navigate to="/home" />;
    return (
        <div className="login-page pt-5  column  justify-content-center">
            <div className='background-img'></div>


            <div className='card  pt-5 mx-5 user-login' style={{ height: '500px', backgroundColor: 'rgb(26 32 43)' }}>
                <div className='text-center' style={{ fontFamily: 'Kadwa', color: 'rgb(59 255 225)', fontSize: '10%' }} >
                    <h1><b>Welcome Back</b></h1>
                </div>
                <form className="user-login-form flex flex-column mt-5 " onSubmit={onSubmitHandler}>
                    <Toast ref={toast} />
                    <Controller
                        name="value"
                        control={control}
                        rules={{ required: 'Name - Surname is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <span className="p-float-label">
                                    <InputText id={field.name} name='email' value={email} className='form-inputs text-white' onChange={onchange}  />
                                    <label htmlFor={field.name} style={{ color: 'rgb(59 255 225)' }}>Email Address</label>
                                </span>
                                <span className="p-float-label mt-4" style={{ color: 'rgb(59 255 225)', backgroundColor: 'rgb(26 32 43)' }}>
                                    <Password style={{ color: 'rgb(59 255 225)', backgroundColor: 'rgb(26 32 43)' }} inputId="password" name='password' className='form-inputs text-white' value={password} onChange={onchange} toggleMask />
                                    <label htmlFor="password" style={{ color: 'rgb(59 255 225)' }}>Password</label>
                                </span>
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                    {/* <div className='forgot-password'>
                    <NavLink to='/otp'>forgot password?</NavLink>
                    </div> */}
                
                    <div>      
                   {email ? <Button label="Login" className='mt-3' style={{ backgroundColor: 'rgb(59 255 225)', color: 'rgb(26 32 43)', border: 'none' }} type="submit" icon="pi pi-check" />
:<Button disabled label="Login" className='mt-3' style={{ backgroundColor: 'rgb(59 255 225)', color: 'rgb(26 32 43)', border: 'none' }} type="submit" icon="pi pi-check" />
}                     
                    </div>
                </form>
                <div className='row account-signUp justify-content-center mt-3'>
                    <p style={{ width: 'auto' }}>Don't have an account?</p>
                    <NavLink to='/sign-up' className='login-signup' style={{ width: 'auto' }}>Sign Up</NavLink>
                </div>
                {/* <div className='text-secondary user-sign-or' >
                    <div></div><hr style={{ width: '21%' }} /><p>or</p> <hr style={{ width: '21%' }} /> <div></div>
                </div> */}

            </div>
           
        </div>
        
    )
}
