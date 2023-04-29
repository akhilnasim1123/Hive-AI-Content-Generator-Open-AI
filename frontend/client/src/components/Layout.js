import {Helmet} from 'react-helmet' 
import SideBar from './SideBar'

const Layout = ({title,content,children}) =>(
    <>
    <Helmet>
    <title>{title}</title>
        <meta name='description' content={content}/>
    </Helmet>
    <div className='layout min-h-screen'>  
    <div className='layout-sidebar'>
        <SideBar/>
        </div>   
    <div className=" layout-children">
        {children}
    </div>
    </div>

    </>
)
export default Layout