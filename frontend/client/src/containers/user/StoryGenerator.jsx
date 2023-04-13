import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { useRef, useState } from 'react'
import Layout from '../../components/Layout'
import { Slider } from "primereact/slider";
import { useDispatch, useSelector } from 'react-redux';
import { BlogGenerator, contentGenerator, StoryGenerator } from '../../features/user';
import { ShimmerSectionHeader } from "react-shimmer";
import Shimmer from '../shimmer/shimmer';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import copy from "copy-to-clipboard";  
import { Sidebar } from 'primereact/sidebar';

const StoryGeneratorPage = () => {
    const navigate = useNavigate()
    const { loading } = useSelector(state => state.user)
    const [blogContent, setBlogContent] = useState('')
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        topic: '',
        keywords: '',
        words: 300,
        accuracy: 0.4,
    })
    const toast = useRef(null);
    console.log(blogContent)
    const { topic, keywords,words,accuracy } = formData
    const [visible, setVisible] = useState(false);


    const onSubmitHandler = (e) => {
        e.preventDefault();
        // eslint-disable-next-line no-mixed-operators
        if (topic=== '' &&keywords === '' ) {
            toast.current.show({ severity: 'error', summary: 'Please fill in all fields'});
        }
        else if (topic === '' && keywords !== '') {
            toast.current.show({ severity: 'error', summary: 'Please enter topic',life: 3000 })
        }else if (words > 1000){
            toast.current.show({ severity: 'error', summary: 'Please not enter more than 1000 words',life: 3000 })
        }else if (words < 100){
            toast.current.show({ severity: 'error', summary: 'Please enter more than 100 words',life: 3000 })
        }else if (accuracy <0.4){
            toast.current.show({ severity: 'error', summary: 'Please enter more than 0.4 accuracy',life: 3000 })
        }
        else {
            dispatch(StoryGenerator({ topic, keywords,words,accuracy })).then((result) => {
                console.log(result)
                // console.log(res)
                setBlogContent(result.payload)
            })

        }

    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value || e.value})


    }
    const content = ()=>{
        navigate('/content-view')
    }
    console.log(words, accuracy)



    // function onCopy() {
    //     // Get the text field
    //     var copyText = document.getElementById("myInput");
    //     console.log(copyText)
    //     // Select the text field
    //     copyText.select();
    //     copyText.setSelectionRange(0, 99999); // For mobile devices
      
    //     // Copy the text inside the text field
    //     navigator.clipboard.writeText(copyText.value);
        
    //     // Alert the copied text
    //     toast.current.show({ severity:'success', summary: 'Copied', life: 3000 })
    //   }

    const copyToClipboard = () => {
        if(blogContent[1].length > 0) {
            toast.current.show({ severity:'success', summary:'Csadfsdaf'
        })
    }
 
        copy(blogContent);
        toast.current.show({ severity:'success', summary: 'Copied to clipboard', life: 3000 })
     }
     const visibleContent = ()=>{
        setVisible(true)
     }




    if (loading) return <Shimmer/>
    return (
        <Layout>
            <div className='mt-4'>
                <h3><b>Enter Your Story ideas Below to <br /> Generate Full Story <br /> </b></h3>
            </div>
            <form onSubmit={onSubmitHandler} className='blog-form'>
            <Toast ref={toast} />
                <div className='row'>
                    <div className='mt-5 col-lg-3 col-md-6'>
                        <span className="p-float-label">
                            <InputText size='sm' value={topic} name='topic' className='form-inputs' onChange={onChange} />
                            <label style={{ color: 'rgb(26 32 43)' }}>Topic</label>
                        </span>
                    </div>
                    <div className='mt-5 col-lg-3 col-md-6'>
                        <span className="p-float-label">
                            <InputText name='keywords' value={keywords} className='form-inputs' onChange={onChange} />
                            <label style={{ color: 'rgb(26 32 43)' }}>Keywords</label>
                        </span>
                    </div>
                    <div className='mt-5 col-lg-3 col-md-6'>
                        <span className="p-float-label">
                            <InputText name='words' type='number' value={words} className='form-inputs' onChange={onChange} />
                            <label style={{ color: 'rgb(26 32 43)' }}>Words</label>
                        </span>
                    </div>
                 
                 
                    <div className='mt-5 col-lg-3 col-md-6'>
                    <span className="p-float-label">
                <InputText value={accuracy} name='accuracy'  onChange={onChange} className="w-full form-inputs" />
                <label style={{ color: 'rgb(26 32 43)' }}>Accuracy</label>
                </span>
                <Slider value={accuracy}  name='accuracy' className="w-full" step={0.05} max={1} min={0.1} onChange={(e)=>{setFormData({ ...formData, accuracy:e.value})}}/>

            </div>     
            
                 
                 
                    </div>
                <div className='mt-3'>
                    <Button label='Generate Blog Topic Ideas' className='generate-blog-topic-ideas' type='submit' size="small"></Button>
                </div>
            </form>

            <div className='card text-white content-card mt-3' >
                <div className='container'>

                    <div className='mt-4'  style={{display:'flex',justifyContent:'end',cursor: "pointer"}}>
                    
                    <i class="fa-sharp fa-solid fa-expand fa-fade" onClick={visibleContent} style={{width:'3%',fontSize:'23px'}}></i>
                        <i class="fa-solid fa-clipboard mx-4" onClick={copyToClipboard} style={{width:'3%',fontSize:'23px'}}></i>
                    
                    </div>

                    <div className='mt-3'>
                        {/* <h3 style={{ textDecoration: 'underline' }}>{blogContent ? blogContent[0] : ''}</h3> */}
                    </div>
                    <div className='generation-block' onClick={content} style={{width:'100%',display:'block'}}>

                            {/* {blogContent && blogContent.map((content, index) => {
                                return <li key={index}>{content}</li>
                            })} */}
<p id='myInput'>                            {blogContent?blogContent:''}</p>

                    </div>
                </div>
            </div>
            <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen>
                <h2>{blogContent ? blogContent[0] : ''}</h2>
                <p>
                {blogContent?blogContent:''}
                </p>
            </Sidebar>
        </Layout>
    )
}

export default StoryGeneratorPage