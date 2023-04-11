import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Slider } from "primereact/slider";
import { useDispatch, useSelector } from 'react-redux';
import { contentGenerator } from '../../features/user';
import { ShimmerSectionHeader } from "react-shimmer";
import Shimmer from '../shimmer/shimmer';


const GenerationPage = () => {
    const { loading } = useSelector(state => state.user)
    const [blogContent, setBlogContent] = useState('')
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        topic: '',
        keywords: '',
    })
    console.log(blogContent)
    const { topic, keywords } = formData


    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(contentGenerator({ topic, keywords })).then((result) => {
            console.log(result)
            // console.log(res)
            setBlogContent(result.payload)
        })
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }
    if (loading) return <Shimmer/>
    return (
        <Layout>
            <div className='mt-4'>
                <h3><b>Enter Your Blog Ideas Below to <br /> Generate Blog Topic <br /> Suggestions</b></h3>
            </div>
            <form onSubmit={onSubmitHandler} className='w-50'>
                <div className='row'>
                    <div className='mt-5 col-md-6'>
                        <span className="p-float-label">
                            <InputText size='sm' value={topic} name='topic' className='form-inputs' onChange={onChange} />
                            <label style={{ color: 'rgb(26 32 43)' }}>Topic</label>
                        </span>
                    </div>
                    <div className='mt-5 col-md-6'>
                        <span className="p-float-label">
                            <InputText name='keywords' value={keywords} className='form-inputs' onChange={onChange} />
                            <label style={{ color: 'rgb(26 32 43)' }}>Keywords</label>
                        </span>
                    </div>
                </div>
                <div className='mt-3'>
                    <Button label='Generate Blog Topic Ideas' className='generate-blog-topic-ideas' type='submit' size="small"></Button>
                </div>
            </form>

            <div className='card text-white content-card mt-3' >
                <div className='container'>
                    <div className='mt-3'>
                        <h3 style={{ textDecoration: 'underline' }}>{blogContent ? blogContent[0] : ''}</h3>
                    </div>
                    <div>

                        <ul>
                            {blogContent && blogContent.map((content, index) => {
                                return <li key={index}>{content}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default GenerationPage