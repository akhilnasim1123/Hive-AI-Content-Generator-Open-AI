import React from 'react'
import AdminLayout from './adminLayout'
import { useSelector } from 'react-redux'
import Shimmer from '../shimmer/shimmer';

const AdvancedLevel = () => {
  // const {loading} = useSelector(state=>state.admin)
  // if (loading) return <Shimmer />
  return (
    <AdminLayout>
            <div>Advanced Level</div>
    </AdminLayout>
  )
}

export default AdvancedLevel