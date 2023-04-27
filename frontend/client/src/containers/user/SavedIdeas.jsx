import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { SavedIdea, blogSect, blogSections, deleteIdea } from '../../features/user'
import { Checkbox } from 'primereact/checkbox'
import { Toast } from 'primereact/toast'
import { Sidebar } from 'primereact/sidebar'
import Shimmer from '../shimmer/shimmer'
import copy from "copy-to-clipboard";  



const SavedIdeas = () => {
    const dispatch = useDispatch()
    const {user,loading}= useSelector(state=>state.user)
    let [blogSection,setBlogSection]=useState([])
    const [collection,setCollection]=useState()
    const [visible, setVisible] = useState(false)
    const [checkedList,setCheckedList]=useState([])
    useEffect(()=>{
        const email = user&&user.email
        if (email === undefined) {
            return null
        }
        dispatch(SavedIdea(email)).then((result) => {
        setCollection(result.payload)
        })
    },[user])

    const deleteContent = (event,content,email) => {
        dispatch(deleteIdea({content,email})).then(result => {
            setCollection(result.payload)
        })
    }
    const toast = useRef()

    const selectContent = (content) => {     
        if(!checkedList.find(id => id === content)){
            setCheckedList([ ...checkedList, content]);
          }  
           else {
            setCheckedList(checkedList.filter(studentId => studentId !== content)) 
            }  
        }

        const generateBlog = () => {
            console.log(checkedList)
            dispatch(blogSect(checkedList)).then((result) => {
                console.log(result.payload)
                const array = [];
                const data = result.payload
                for(let i = 0;i<data.length;i++){
                    const values = data[i]
                    console.log(values[0])
                    array[i]=values[0]
                }
                console.log(array)
                setBlogSection(array)

    
            }).then((result) => {
                if (checkedList.length>0) {
                    setVisible(true)
                    
                    }
                else{
                    toast.current.show({ severity: 'error', summary: 'Select Any Topic', life: 3000 })
                }
            })
    
        }


        const copyToClipboard = () => {
            if(blogSection[1].length > 0) {
                toast.current.show({ severity:'success', summary:'Csadfsdaf'
            })
        }
     
            copy(blogSection);
            toast.current.show({ severity:'success', summary: 'Copied to clipboard', life: 3000 })
         }
    
        console.log(checkedList)

        if (loading) return <Shimmer/>
  return (
        <Layout>
                <div className='mt-5 container'>
                    {user?
                <button className='btn' onClick={generateBlog}>Blog</button>:''}
                <form action="">
                <Toast ref={toast} />
                </form>
                    <table className='table table-hover mt-5'>
                        <tbody>
                           {collection&&collection.map((data,index)=>{
                            return (
                                <tr>
                                    <td>{data.title}</td>
                                    <td>{data.blog_ideas}</td>
                                    <td><button className='btn border-danger' onClick={(e)=>deleteContent(e.target.value,data.blog_ideas,user.email)}>Delete</button></td>
                                    
                                    <td>
                                                <Checkbox checked={checkedList.includes(data)} key={index} value={data} onChange={(e)=>selectContent(e.target.value)} ></Checkbox>
                                            </td>
                                </tr>
                            )
                           })}
                        </tbody>
                    </table>
                </div>
                <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen>
                <div className='d-flex justify-end'>
                   <i class="fa-solid fa-clipboard mx-4" onClick={copyToClipboard} style={{width:'3%',fontSize:'23px',cursor:'pointer'}}></i>
                   </div>
            {blogSection?blogSection.map((section,index)=>{
                section.body.replace('*','<br>')
                return(
                    <div>
                <h2>{section.title}</h2>
                <p>
                    {section.body}
                </p>
                </div>
                )
                    }):
                    <div>

                    </div>
                    }
            </Sidebar>
        </Layout>
  )
}

export default SavedIdeas