import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { useRef, useState } from 'react'
import Layout from '../../components/Layout'
import { Slider } from "primereact/slider";
import { useDispatch, useSelector } from 'react-redux';
import { blogSections, contentGenerator, saveBlogIdea } from '../../features/user';
import { ShimmerSectionHeader } from "react-shimmer";
import Shimmer from '../shimmer/shimmer';
import { Toast } from 'primereact/toast';
import { Navigate } from 'react-router-dom';
import { Sidebar } from 'primereact/sidebar';
import { Checkbox } from "primereact/checkbox";

const GenerationPage = () => {
    const toast = useRef(null);
    const [blogSection,setBlogSection]=useState([])
    const [checked, setChecked] = useState(false);
    const { loading, user, isAuthenticated } = useSelector(state => state.user)
    if (user) {
        console.log(user.email)
    }
    const [blogContent, setBlogContent] = useState('')
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        topic: '',
        keywords: '',
    })

    const [checkedList, setCheckedList] = useState([]);
    console.log(blogContent)
    const { topic, keywords } = formData



    const onSubmitHandler = (e) => {
        const email = user.email
        e.preventDefault();
        dispatch(contentGenerator({ topic, keywords,email })).then((result) => {
            console.log(result)
            // console.log(res)
            setBlogContent(result.payload)
        })
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

    }


    const contentSave = (event, content, email) => {
        console.log(content, 'content')
        dispatch(saveBlogIdea({ content, email, topic, keywords })).then((result) => {
            console.log(result)
            toast.current.show({ severity: 'success', summary: 'Saved', life: 3000 })
        });

    }

    const generateBlog = () => {
        console.log(checkedList,topic,keywords)
        dispatch(blogSections({checkedList,topic,keywords})).then((result) => {
            setBlogSection(result.payload)
            console.log(result.payload)
        }).then((result) => {
            if (blogSection){
            setVisible(true)
            }
        })

    }

    const handleSelect = (event) => {
        const value = event.target.value;
        const isChecked = event.target.checked;
        console.log(value)
     
        if (isChecked) {
          //Add checked item into checkList
          setCheckedList([...checkedList, value]);

        } else {
          //Remove unchecked item from checkList
          const filteredList = checkedList.filter((item) => item !== value);
          setCheckedList(filteredList);
        }
        console.log(checkedList)
      };



    if (loading) return <Shimmer />
    if (!isAuthenticated) return <Navigate to="/login" />;
    return (
        <Layout>
            <div className='mt-4'>
                <h3><b>Enter Your Blog Ideas Below to <br /> Generate Blog Topic <br /> Suggestions</b></h3>
            </div>
            <form onSubmit={onSubmitHandler} className='w-50'>
                <Toast ref={toast} />
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

                    <div>


                        <table className=' mt-4 table text-white'>
                            <thead>
                                <th>BLog Title</th>
                                <th>Save Topic</th>
                                <th>Select </th>
                            </thead>
                            <tbody className='mt-5'>

                                {blogContent && blogContent.map((content, index) => {
                                    return (
                                        <tr className='mt-3'>
                                            <td className='content-col' key={index}>{index + 1}. {content}</td>
                                            <td>
                                                <button className='btn content-save-btn' onClick={(e) => contentSave(e.target.value, content, user.email)}>Save</button>
                                            </td>
                                            <td>
                                                <Checkbox value={content} onChange={handleSelect} key={index} ></Checkbox>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <button className='btn btn-outline-dark content-save-btn mt-3 mb-3' onClick={generateBlog}>Blog</button>

            <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen>
                <h2>Ooh.... Fuck</h2>
                <p>
                    {blogSection?blogSection:''}
                </p>
            </Sidebar>
        </Layout>
    )
}

export default GenerationPage