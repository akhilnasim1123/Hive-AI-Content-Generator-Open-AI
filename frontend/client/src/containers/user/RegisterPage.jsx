
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { InputMask } from "primereact/inputmask";
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
import { register } from '../../features/user';



export default function RegisterPage() {
    const dispatch = useDispatch();

    const { registered, loading } = useSelector((state) => state.user);

    console.log(registered,loading)
    const [formData, setFormData] = useState({
        first_name:'',
        last_name:'',
        phone:'',
        email:'',
        password:'',
        confirm_password:'',
    });

    const {first_name, last_name,phone, email, password, confirm_password} = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(register({first_name, last_name, phone, email, password,confirm_password}))
        
        
    }


    const toast = useRef(null);

    const defaultValues = {
        value: ''
    };

    const {
        control,
    } = useForm({ defaultValues });
    if (registered) return <Navigate to="/login" />;
    return (
        <div className="login-page pt-5  column  justify-content-center">
            <div className='re-background-img'></div>


            <div className='card  pt-5 mx-5 register-page' style={{  backgroundColor: 'rgb(26 32 43)' }}>
                <div className='text-center' style={{ fontFamily: 'Kadwa', color: 'rgb(59 255 225)', fontSize: '10%' }} >
                    <h1><b>Register</b></h1>
                </div>
                <form className="user-login-form flex flex-column mt-5 "  onSubmit={onSubmitHandler}>
                    <Toast ref={toast} />
                    <Controller
                        name="value"
                        control={control}
                        rules={{ required: 'Name - Surname is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <span className="p-float-label">
                                    <InputText id={field.name} value={first_name} name='first_name' className='form-inputs' onChange={onChange} maxlength="16" />
                                    <label htmlFor={field.name} style={{ color: 'rgb(59 255 225)' }}>First Name</label>
                                </span>
                                <span className="p-float-label mt-4">
                                    <InputText id={field.name} value={last_name} name='last_name' className='form-inputs' onChange={onChange} maxlength="16" />
                                    <label htmlFor={field.name} style={{ color: 'rgb(59 255 225)' }}>Last Name</label>
                                </span>
                                <span className="p-float-label mt-4">
                                    <InputText id={field.name} value={email} name='email' className='form-inputs'  onChange={onChange}  maxlength="16" />
                                    <label htmlFor={field.name} style={{ color: 'rgb(59 255 225)' }}>Email Address</label>
                                </span>
                                <span className="p-float-label mt-4">
                                     <InputMask mask='+91-9999999999' placeholder="+91 9999999999" value={phone} name='phone' onChange={onChange} className="form-inputs"/>
                                    <label htmlFor={field.name} style={{ color: 'rgb(59 255 225)' }}>Phone Number</label>
                                </span>

                                <span className="p-float-label mt-4" style={{ color: 'rgb(59 255 225)', backgroundColor: 'rgb(26 32 43)' }}>
                                    <Password value={password} style={{ color: 'rgb(59 255 225)', backgroundColor: 'rgb(26 32 43)' }} inputId="password" name='password' className='form-inputs' onChange={onChange} toggleMask />
                                    <label htmlFor="password" style={{ color: 'rgb(59 255 225)' }}>Password</label>
                                </span>
                                <span className="p-float-label mt-4" style={{ color: 'rgb(59 255 225)', backgroundColor: 'rgb(26 32 43)' }}>
                                    <Password value={confirm_password} style={{ color: 'rgb(59 255 225)', backgroundColor: 'rgb(26 32 43)' }} inputId="password" name='confirm_password' className='form-inputs'  onChange={onChange} toggleMask />
                                    <label htmlFor="password" style={{ color: 'rgb(59 255 225)' }}>Confirm Password</label>
                                </span>
                            </>
                        )}
                    />
                    <div>
                        <Button  label="Sign Up" className='mt-3' style={{ backgroundColor: 'rgb(59 255 225)', color: 'rgb(26 32 43)', border: 'none' }} type="submit" icon="pi pi-check" />
                    </div>
                </form>

                <div className='text-secondary user-sign-or mt-3' >
                    <div></div><hr style={{ width: '21%' }} /><p>or</p> <hr style={{ width: '21%' }} /> <div></div>
                </div>

            </div>
        </div>
    )
}
