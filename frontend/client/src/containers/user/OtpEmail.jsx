import React, { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login, otpLogin, otpVerification } from '../../features/user';
import Shimmer from '../shimmer/shimmer';
import { NavLink, Navigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { InputMask } from 'primereact/inputmask';
import { Dialog } from 'primereact/dialog';
import { resetLogin } from '../../features/admin';

const OtpEmail = () => {

    const [visible,setVisible] = useState()

    const {isAuthenticated,authLoading}=useSelector(state=>state.user)
    const dispatch = useDispatch()
    const [email, setFormData] = useState();
    console.log(isAuthenticated)
    const toast = useRef(null);
    const [otp,setOtp]=useState();
    const onchange = (e) => {
        setFormData(e.target.value)
    }
    console.log(email)

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'OTP Sented'});
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
         if (email) {
            dispatch(otpLogin(email)).then((result)=>{
                console.log(result.payload)
                if (result.payload === 'Otp Sended'){
                show();
                setVisible(true)
                }
            })

        }
        else {
            toast.current.show({ severity: 'error', summary: 'Please fill in all fields'});
        }
    };

    const onOtpVerification = (e)=>{
        e.preventDefault();
        dispatch(otpVerification(otp)).then(result=>{
            console.log(result.payload.message)
            if (result.payload.message ==='Verification Success'){
                console.log(result.payload.user)
                const password =result.payload.user
                dispatch(login({email, password})).then(result=>{
                    toast.current.show({ severity: 'success', summary: 'Logged in successfully' });
                })
            }
        })
    }


    console.log(email)

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    if (authLoading) return <Shimmer />
    if (isAuthenticated) return <Navigate to="/home" />;
    return (
        <div className="login-page pt-5  column  justify-content-center">
            <div className='background-img'></div>


            <div className='card  pt-5 mx-5 user-login' style={{ height: '400px', backgroundColor: 'rgb(26 32 43)' }}>
                <div className='text-center' style={{ fontFamily: 'Kadwa', color: 'rgb(59 255 225)', fontSize: '10%' }} >
                    <h3>verify Your <br /><b>Identity</b></h3>
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
                                    <InputText id={field.name} name='email' value={email} className='form-inputs' onChange={onchange} />
                                    <label htmlFor={field.name} style={{ color: 'rgb(59 255 225)' }}>Email Address</label>
                                </span>
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                    <div>
                        
                   <Button label="Verify" className='mt-3' style={{ backgroundColor: 'rgb(59 255 225)', color: 'rgb(26 32 43)', border: 'none' }} type="submit" icon="pi pi-check" />                   
                    </div>
                </form>
            

            </div>
            <Dialog header="Otp" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>

                            <form onSubmit={onOtpVerification}>
                            <span className="p-float-label mt-4">
                                    <InputText type='number' value={otp} name='otp' className='form-inputs'  onChange={(e)=>{setOtp(e.target.value)}}  maxlength="16" />
                                    <label  >OTP</label>
                                </span>

        <Button value='' className='bg-dark'>Verify</Button>
        </form>

        </Dialog>

        </div>

    )
}

export default OtpEmail