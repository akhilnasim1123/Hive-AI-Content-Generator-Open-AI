import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { BlogSectionDetails, deleteSections } from '../../features/user'
import { Sidebar } from 'primereact/sidebar'
import { Toast } from 'primereact/toast'
import copy from "copy-to-clipboard";  
import Shimmer from '../shimmer/shimmer'

const BlogSection = () => {
    const {user,loading}=useSelector(state=>state.user)
    const dispatch = useDispatch()
    const [blogSection,setBlogSection]=useState([])
    const [visibleContent,setVisibleContent]=useState(false)
    const [viewContent,setViewContent]=useState([])
    const toast = useRef()
    useEffect(()=>{
        const email = user&&user.email
        if (email === undefined) {
            return null
        }
        dispatch(BlogSectionDetails(email)).then(result=>{
            setBlogSection(result.payload)
        })
    },[user])


const visibleContentHandler = (event,content)=>{
    console.log(content)
    setViewContent(content)
    setVisibleContent(true)
    
     }

    const hideContentView = ()=>{
        setViewContent([])
        setVisibleContent(false)
    }
const deleteSection=(email,content)=>{
    dispatch(deleteSections({content,email})).then(result=>{
        setBlogSection(result.payload)
    })
}

const copyToClipboard = () => {
    if(viewContent > 0) {
        toast.current.show({ severity:'success', summary:'Csadfsdaf'
    })
}

    copy(viewContent);
    toast.current.show({ severity:'success', summary: 'Copied to clipboard', life: 3000 })
 }
 if (loading) return <Shimmer/>
  return (
    <Layout>
       <div className="container blog-section-table">
        <form action="">
        <Toast ref={toast} />
        </form>
       <div className='mt-5'>
            <h3>Blog Sections</h3>
        </div>
           <table className='table table-hover mt-5 '>
            <tbody>
                {blogSection&&blogSection.map((content,index)=>{
                    return(
                        <tr className='mt-3'>
                        <td>
                           {content.title} 
                        </td>
                        <td>
                            <div style={{height:'69px',overflow:'hidden'}}>
                            {content.body}
                            </div>
                        </td>
                        <td>
                            {content.date_created}
                        </td>
                        <td>
                            <button className="btn" style={{borderColor:'#1a202b'}} value={user?user.email:''} onClick={(e)=>deleteSection(e.target.value,content.body)}>delete</button>
                        </td>
                        <td>
                        <i className="fa-sharp fa-solid fa-expand "  onClick={(e)=>visibleContentHandler(e.target.value,content)} style={{width:'3%',fontSize:'23px',cursor:'pointer'}}></i>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
           </table>

       </div>
       <Sidebar visible={visibleContent} onHide={hideContentView} fullScreen>
        <div className='d-flex justify-end'>
        <i class="fa-solid fa-clipboard mx-4" onClick={copyToClipboard} style={{width:'3%',fontSize:'23px'}}></i>

        </div>
                <h2>{viewContent ? viewContent.title : ''}</h2>
                <h5>{viewContent ? viewContent.date_created : ''}</h5>
                <p>
                {viewContent?viewContent.body:''}
                </p>
            </Sidebar>
    </Layout>
  )
}

export default BlogSection