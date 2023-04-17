import React from 'react'
import AdminLayout from './adminLayout'
import Shimmer from '../shimmer/shimmer'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  // const {loading} = useSelector(state=>state.admin)
  // if (loading) return <Shimmer />
  return (
    <AdminLayout>
    <div>Dashboard</div>
    </AdminLayout>
  )
}

export default Dashboard