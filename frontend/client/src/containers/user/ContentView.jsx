import React from 'react'
import { useSelector } from 'react-redux'

const ContentView = () => {
    const { content} = useSelector(state=>state.user)
  return (
    <div>
        <p>
            {content}
        </p>
    </div>
  )
}

export default ContentView