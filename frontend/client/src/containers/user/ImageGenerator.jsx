import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { InputText } from 'primereact/inputtext'
import {  useDispatch } from 'react-redux'
import { Button } from 'primereact/button'
import { ImageGeneratorFun } from '../../features/user'

const ImageGenerator = () => {
  const dispatch = useDispatch();

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
  return (
      <Layout>
            <div className='w-90 mx-5'>
              <div className='container'>
                <form onSubmit={onSubmitHandler} className='container mt-5' style={{backgroundColor:'#1a202b',borderRadius:'5px',height:'180px'}}>
                <div className='row'>
                    <div className='mt-5 col-md-4'>
                        <span className="p-float-label">
                            <InputText size='sm' value={topic} name='topic' className='form-inputs' onChange={onChange} />
                            <label style={{ color: 'rgb(26 32 43)' }}>Topic</label>
                        </span>
                    </div>
                    <div className='mt-5 col-md-4'>
                        <span className="p-float-label">
                            <InputText size='sm' value={keywords} name='keywords' className='form-inputs' onChange={onChange} />
                            <label style={{ color: 'rgb(26 32 43)' }}>keywords</label>
                        </span>
                    </div>
                    <div className='mt-5 col-md-4'>
                      <select name="imageQuality" className='form-control w-7' style={{height:'50px'}} value={imageQuality} onChange={onChange}>
                        <option value="1024x1024">1024x1024</option>
                        <option value="512x512">512x512</option>
                        <option value="256x256">256x256</option>
                      </select>
                    </div>
                    </div>
                    <div className='mt-3'>
                    <Button label='Generate Image' className=' border-white' style={{backgroundColor:'#1a202b'}} type='submit' size="small"></Button>
                </div>
                </form>
              </div>

              <div className="container mt-3">
                {photo?<img src={photo} alt='ContentImage'></img>:<div></div>}
              </div>
            </div>
      </Layout>
  )
}

export default ImageGenerator