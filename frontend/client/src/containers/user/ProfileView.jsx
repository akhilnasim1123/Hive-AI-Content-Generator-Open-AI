import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'primereact/button'
import { FileUpload } from "primereact/fileupload";
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { ProfileEdit, changeUserImage } from '../../features/user';
import { set } from 'react-hook-form';

const ProfileView = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const [photo, setPhoto] = useState("");
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
    })
    const [img, setImg] = useState()
    const { toast } = useRef()
    const onUpload = () => {
        toast.current.show({
            severity: "info",
            summary: "Success",
            detail: "File Uploaded",
        });
        console.log("sdfasfssadfsafasfsafasdfhrjfgjfgjgfg");
    };


    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(ProfileEdit({first_name,last_name,email,phone_number})).then((result)=>{
            const data = result.payload
            setFormData({
                first_name: data.first_name,
                last_name: data.last_name,
                email:data.email,
                phone_number:data.phone_number

            })
        })
    }


    const { first_name, last_name, email, phone_number } = formData

    useEffect(()=>{
        if(user){
            setFormData({
            first_name : user.first_name,
            last_name : user.last_name,
            email:user.email,
            phone_number:user.phone_number,
            })
        };
    },[user])


    const onchange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }


    const navigate = useNavigate()
    const addphoto = (files, email) => {
        console.log(files)
        setPhoto(files)
        console.log(files.objectURL);
        const data = new FormData();
        console.log(photo)
        data.append("file", photo);
        console.log(data)
        data.append("upload_preset", process.env.REACT_APP_Preset);
        data.append("cloud_name", process.env.REACT_APP_CloudName);
        console.log(process.env.REACT_APP_CloudImageUrl)
        console.log(data)
        fetch(`${process.env.REACT_APP_CloudImageUrl}`, {
            method: "post",
            body: data,
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.url);
          const url = data.url;
          console.log(url);
          console.log(email);
          let obj = {
            url: data.url,
            email,
          };
          dispatch(changeUserImage(obj));
        })
        .then((res) => {
          navigate("http://localhost:3000/home/dashboard/profile-view");
        })
        .catch((err) => console.log(err));
    };

    console.log(photo)

    return (
        <Layout>

            <div className='container mx-5'>
                <div className='card border-danger mt-5 mx-5' style={{ height: '450px', width: '75%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className='' style={{ width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent:'center' }}>
                        <div className='mx-3 d-flex justify-center' style={{ width: '50%' }} >
                            <img className='profile-img ' style={{ width: '50%',borderRadius:'25px' }} src={user && user.image_url ? user.image_url : require('./media/pngfind.com-circle-shape-png-5453533.png')} alt="Profile pic" />
                        </div>

                        <div className='d-flex justify-center' style={{ width: '50%' }}>
                        <div className='' >
                            <FileUpload
                                mode="basic"
                                name="demo[]"
                                customUpload={true}
                                accept="image/*"
                                uploadHandler={(e) => addphoto(e.files[0], user && user.email)}
                                maxFileSize={1000000}
                                onUpload={onUpload}
                                className='mt-5'
                                style={{ width: '10%' }} />
                        </div>
                        </div>
                    </div>
                    <form onSubmit={ onSubmitHandler } action="" className='container ' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <Toast ref={toast} />

                        <div className='mt-4'>
                            <div className='d-flex'>
                                <div className='mt-3 mx-3'>
                                    <input value={first_name} name='first_name' type="text" className="form-control" onChange={onchange}/>
                                </div>
                                <div className='mt-3 mx-3'>
                                    <input value={last_name} name='last_name' type="text" className="form-control" onChange={onchange} />
                                </div>
                            </div>

                            <div className='d-flex'>
                                <div className='mt-3 mx-3'>
                                    <input disabled value={email} name='email' type="email" className="form-control" onChange={onchange} />
                                </div>
                                <div className='mt-3 mx-3'>
                                    <input value={phone_number} name='phone_number' type="tel" className="form-control" onChange={onchange} />
                                </div>
                            </div>
                            <div className='mt-3 mx-3'>
                                <Button label='submit' size='small'></Button>
                            </div>


                        </div>
                    </form>
                </div>
            </div>

        </Layout>
    )
}

export default ProfileView