import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { userCollection } from '../../features/user'




const UserDashboard = () => {

    const dispatch = useDispatch()

    const { user } = useSelector(state => state.user)

    const [Collection, setCollection] = useState()
    useEffect(() => {
        const email = user&&user.email
            if (email === undefined) {
                return null
            }
            
            dispatch(userCollection(email)).then((result) => {
            setCollection(result.payload)
            })
    
    }, [user])
    return (
        <Layout title="DashBoard" content="Profile">
            <div className='container mt-5'>
                <div className="surface-0 profile-block p-4 shadow-2 border-round border-dark">
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '10%' }}>
                            <img className='round profile-img' src={require('./media/pngfind.com-circle-shape-png-5453533.png')} alt="profile img" />
                        </div>
                        <div className='mx-3' style={{ width: '60%' }}>
                            <div className="text-3xl font-medium text-900 mb-2">{user && user.first_name + ' ' + user.last_name}</div>
                            <div className="font-medium text-500 ">{user && user.email}</div>
                            <div className="font-medium text-500 ">{user && user.phone_number}</div>
                        </div>
                    </div>
                </div>
            </div>



            <div className='container mt-5'>

                <div className="grid">
                    <div className="col-12 md:col-6 lg:col-3">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Blog Topic Idea</span>
                                    <div className="text-900 font-medium text-xl">{Collection&&Collection.blogIdeasCount}</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="fa-solid fa-blog text-blue-500 text-xl"></i>

                                </div>
                            </div>
                            <span className="text-green-500 font-medium">24 new </span>
                            <span className="text-500">since last visit</span>
                        </div>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Blog Sections</span>
                                    <div className="text-900 font-medium text-xl">{Collection&&Collection.blogSectionCount}</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="pi pi-map-marker text-orange-500 text-xl"></i>
                                </div>
                            </div>
                            <span className="text-green-500 font-medium">%52+ </span>
                            <span className="text-500">since last week</span>
                        </div>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Stories</span>
                                    <div className="text-900 font-medium text-xl">{Collection&&Collection.storyCount}</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="pi pi-inbox text-cyan-500 text-xl"></i>
                                </div>
                            </div>
                            <span className="text-green-500 font-medium">520  </span>
                            <span className="text-500">newly registered</span>
                        </div>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <span className="block text-500 font-medium mb-3">Total Words</span>
                                    <div className="text-900 font-medium text-xl">{Collection&&Collection.total_words}</div>
                                </div>
                                <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{ width: '2.5rem', height: '2.5rem' }}>
                                    <i className="pi pi-comment text-purple-500 text-xl"></i>
                                </div>
                            </div>
                            <span className="text-green-500 font-medium">85 </span>
                            <span className="text-500">responded</span>
                        </div>
                    </div>
                </div>

            </div>
            <div className="container mt-3 mb-3">
                <hr />
            </div>
            
            <div className='container mt-5'>
                <div className="surface-0 profile-block p-4 shadow-2 border-round border-dark">
                    <div style={{ display: 'flex' }}>
                        <div className='mx-3 mt-2' style={{ width: '90%' }}>
                            <div className="text-3xl font-medium text-900 mb-2">Blog Ideas</div>
                        </div>
                        <div className='text-center mt-3'>
                        <i className="pi pi-arrow-right text-cyan-500 text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default UserDashboard