
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { InputMask } from "primereact/inputmask";
import { Dialog } from 'primereact/dialog';
import { NavLink, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
import { otpVerification, register } from '../../features/user';
import { otpLogin } from '../../features/user';



export default function RegisterPage() {
    const dispatch = useDispatch();
    const [visible,setVisible]=useState(false)
    const { registered, loading } = useSelector((state) => state.user);
    const [bool,setBool]=useState(false)
    const [otp,setOtp]=useState();
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

        if (first_name !=='' && last_name!=='' && email !=='' && password !=='' && confirm_password !=='') {
            dispatch(register({first_name, last_name, phone, email, password,confirm_password}))

        }
        else{
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'All Fields are Required' })
        }

                
        
    }


    const toast = useRef(null);

    const defaultValues = {
        value: ''
    };

    const emailOTP = (e)=>{
        e.preventDefault();
        console.log(email,email.length)
        if (email.length<4){
            console.log('true')
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please Enter a Valid Email' })
            return
        }
        dispatch(otpLogin(email)).then(result => {
            setVisible(true)
        })
    }
    console.log(bool)

    const onOtpVerification = (e)=>{
        e.preventDefault();
        dispatch(otpVerification({otp,email})).then(result=>{
            console.log(result.payload)
            if (result.payload ==='Verification Success'){
                setBool(true)
                setVisible(false)
                toast.current.show({ severity: 'success', summary: result.payload})
            }
        })
    }

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
                                    <InputText id={field.name} value={first_name} name='first_name' className='form-inputs text-white' onChange={onChange} maxlength="16"/>
                                    <label htmlFor={field.name} style={{ color: 'rgb(59 255 225)' }}>First Name</label>
                                </span>
                                <span className="p-float-label mt-4">
                                    <InputText id={field.name} value={last_name} name='last_name' className='form-inputs text-white' onChange={onChange} maxlength="16" />
                                    <label htmlFor={field.name} style={{ color: 'rgb(59 255 225)' }}>Last Name</label>
                                </span>
                           
                                    <span className="p-float-label mt-4">
                                    <InputText id={field.name} value={email} name='email' className='form-inputs text-white'  onChange={onChange}   />
                                    <label htmlFor={field.name} style={{ color: 'rgb(59 255 225)' }}>Email Address</label>
                                    </span>

                                <span className="p-float-label mt-4">
                                     <InputMask mask='+91-9999999999' placeholder="+91 9999999999" value={phone} name='phone' onChange={onChange} className="form-inputs text-white"/>
                                    <label htmlFor={field.name} style={{ color: 'rgb(59 255 225)' }}>Phone Number</label>
                                </span>

                                <span className="p-float-label mt-4" style={{ color: 'rgb(59 255 225)', backgroundColor: 'rgb(26 32 43)' }}>
                                    <Password value={password} style={{ color: 'rgb(59 255 225)', backgroundColor: 'rgb(26 32 43)' }} inputId="password" name='password' className='form-inputs text-white' onChange={onChange} toggleMask />
                                    <label htmlFor="password" style={{ color: 'rgb(59 255 225)' }}>Password</label>
                                </span>
                                <span className="p-float-label mt-4" style={{ color: 'rgb(59 255 225)', backgroundColor: 'rgb(26 32 43)' }}>
                                    <Password value={confirm_password} style={{ color: 'rgb(59 255 225)', backgroundColor: 'rgb(26 32 43)' }} inputId="password" name='confirm_password' className='form-inputs text-white'  onChange={onChange} toggleMask />
                                    <label htmlFor="password" style={{ color: 'rgb(59 255 225)' }}>Confirm Password</label>
                                </span>
                            </>
                        )}
                    />
                    <div>
                        {bool?
                       <Button  label="Sign Up" className='mt-3' style={{ backgroundColor: 'rgb(59 255 225)', color: 'rgb(26 32 43)', border: 'none' }} type="submit" icon="pi pi-check" />
                            : 
                            <Button label="Verify Email" className='mt-3' style={{ backgroundColor: 'rgb(59 255 225)', color: 'rgb(26 32 43)', border: 'none' }} onClick={emailOTP} icon="pi pi-check" />

                    }
                     </div>
                </form>

                <div className='text-secondary user-sign-or mt-3' >
                    <div></div><hr style={{ width: '21%' }} /><p>or</p> <hr style={{ width: '21%' }} /> <div></div>
                </div>

            </div>
            <Dialog header="Otp" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <h6>OTP Sended into this {email&&email}</h6>
<form onSubmit={onOtpVerification}>
<span className="p-float-label mt-4">
        <InputText type='number' value={otp} name='otp' className='form-inputs'  onChange={(e)=>{setOtp(e.target.value)}}  maxlength="16" />
        <label  >OTP</label>
    </span>

<Button value='' type='submit' className='bg-dark'>Verify</Button>
</form>
            </div>

</Dialog>

        </div>
        
    )
}
