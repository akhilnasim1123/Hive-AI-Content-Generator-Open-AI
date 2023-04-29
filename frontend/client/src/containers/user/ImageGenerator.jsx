import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { InputText } from 'primereact/inputtext'
import {  useDispatch, useSelector } from 'react-redux'
import { Button } from 'primereact/button'
import { ImageGeneratorFun } from '../../features/user'
import { NavLink } from 'react-router-dom'
import Shimmer from '../shimmer/shimmer'

const ImageGenerator = () => {
  const dispatch = useDispatch();
  const {loading } = useSelector(state=>state.user)
  const [formData, setFormData] = useState({
    topic:'',
    keywords:'',
    imageQuality:'1024x1024',
  });
  const [photo,setPhoto] = useState();
  const {topic,keywords,imageQuality}=formData
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log('dispatch: ')
    dispatch(ImageGeneratorFun({topic,keywords,imageQuality})).then((result)=>{
      setPhoto(result.payload)
    })
  
  }
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

}

console.log(imageQuality)
console.log(topic)
if (loading) return <Shimmer/>
  return (
      <div className='min-h-screen' style={{backgroundColor:'#1a202b'}}>
                <div style={{ backgroundColor: '#1a202b',zIndex:'1' }} className={`w-full h-18  fixed  justify-between`}>
          <div style={{ color: '#3bffe1' }} className=' text-2xl font-bold p-5 font-sans'><NavLink style={{textDecoration:'none',color: '#3bffe1'}} to='/'>Hive AI</NavLink></div>
          <hr className='bg-white text-white'/>
        </div>
      <div className="container">
      <div className='w-full row py-32 justify-center' >
              <div className=' col-sm-12 col-md-12 col-lg-2 d-flex justify-center' >
                <form onSubmit={onSubmitHandler} className=' mt-5'>
                <div className=''>
                    <div className='mt-5'>
                    <label style={{ color: 'white' }}>topic</label>
                            <InputText size='sm' value={topic} name='topic' placeholder='ex. bmw car, dog' className='form-inputs' style={{width:'100%'}} onChange={onChange} />

                    </div>
                    <div className='mt-4'>
                    <label style={{ color: 'white' }}>keywords</label>

                            <InputText size='sm' value={keywords} name='keywords' placeholder='ex. black car' className='form-inputs' style={{width:'100%'}} onChange={onChange} />
                                                   
                    </div>
                    <div className='mt-4'>
                    <label style={{ color: 'white' }}>Size</label>
                      <select name="imageQuality" className='form-control p-component' style={{height:'46px',    width: '206px'}} value={imageQuality} onChange={onChange}>
                        <option value="1024x1024">1024x1024</option>
                        <option value="512x512">512x512</option>
                        <option value="256x256">256x256</option>
                      </select>
                    </div>
                    <div className='mt-3'>
                    <Button label='Generate Image' className=' border-white' style={{backgroundColor:'#1a202b'}} type='submit' size="small"></Button>
                </div>
                    </div>

                </form>
              </div>

              <div className="mt-3 col-sm-12 col-md-12 col-lg-10">
                {photo?<img src={photo} alt='ContentImage' style={{width:'100%'}}></img>:<div></div>}
              </div>
            </div>
      </div>
      </div>
  )
}

export default ImageGenerator