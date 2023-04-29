import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { BlogDetails, deleteBlog } from '../../features/user'
import { Sidebar } from 'primereact/sidebar'
import { useNavigate } from 'react-router-dom'
import Shimmer from '../shimmer/shimmer'
import Swal from 'sweetalert2'

const Blog = () => {
    const {user,loading}=useSelector(state=>state.user)
    const dispatch = useDispatch()
    const [blog,setBlog]=useState([])
    const [visibleContent,setVisibleContent]=useState(false)
    const [viewContent,setViewContent]=useState([])
    useEffect(()=>{
        const email = user&&user.email
        if (email === undefined) {
            return null
        }
        dispatch(BlogDetails(email)).then(result=>{
            setBlog(result.payload)
        })
    },[user])

const navigate = useNavigate()
const visibleContentHandler = (event,content)=>{
    console.log(content)
    setViewContent(content)
    setVisibleContent(true)
    
     }

    const hideContentView = ()=>{
        setViewContent([])
        setVisibleContent(false)
    }
const deleteBlogDet=(email,content)=>{



    new Swal({
        title: 'Are you sure?',
        text: "It will permanently deleted !",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(result=> {
        if (result.isConfirmed){
            dispatch(deleteBlog({content,email})).then(result=>{
                setBlog(result.payload)
            }).then(result=>{
                new Swal(
                    'Deleted!',
                    'Your data has been deleted.',
                    'success'
                    );
    })
    }

      })
}
console.log(blog)

if (loading) return <Shimmer/>
if (blog&&blog.length<=0) {
    return(
        <Layout>
            <div style={{height:'723px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <div className='text-center' style={{color:'#1a202b'}}>
            <h2 style={{fontWeight:'7'}}>You didn't Generate Blogs Yet.......</h2><br />
                <h1>Generate Blog</h1>
        </div>
        <div className='mt-5'>
            <button className="btn" style={{borderColor:'#1a202b'}} onClick={()=>navigate('/blog-generate')}>Generate</button>
            </div>
    </div>
        </Layout>
    )
}

  return (
    <Layout>
       <div className="container blog-section-table">
       <div className='mt-5'>
            <h3>Blog Sections</h3>
        </div>
           <table className='table table-hover mt-5 '>
            <tbody>
                {blog&&blog.map((content,index)=>{
                    return(
                        <tr className='mt-3'>
                        <td>
                          <div> {content.title} </div>
                        </td>
                        <td>
                            <div style={{height:'69px',overflow:'hidden'}}>
                            {content.blog}
                            </div>
                        </td>
                        <td>
                            {content.date_created}
                        </td>
                        <td>
                            <button className="btn" style={{borderColor:'#1a202b'}} value={user?user.email:''} onClick={(e)=>deleteBlogDet(e.target.value,content.blog)}>delete</button>
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
                <h2>{viewContent ? viewContent.title : ''}</h2>
                <h5>{viewContent ? viewContent.date_created : ''}</h5>
                <p>
                {viewContent?viewContent.blog:''}
                </p>
            </Sidebar>
    </Layout>
  )
}

export default Blog