import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import AdminLayout from './adminLayout'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useDispatch, useSelector } from 'react-redux'
import { PrimeData, primeUsers, searchData } from '../../features/admin'
import { useNavigate } from 'react-router-dom'
import { CascadeSelect } from 'primereact/cascadeselect'
import Shimmer from '../shimmer/shimmer'

const PrimeManagement = () => {
  const dispatch = useDispatch()
  const [users,setUsers] = useState([])
  const [searchInput, setSearchInput] = useState(users);
  const [prime,setPrime]=useState([])
  useEffect(()=> {
    dispatch(primeUsers(null)).then((result)=>{
      setUsers(result.payload)
    })
  },[])
  useEffect(()=> {
    dispatch(PrimeData()).then((result)=>{
      console.log(result.payload)
      const data = result.payload
      console.log(data)
      setPrime(result.payload)
    })
  },[])
  const navigate = useNavigate()
  const onCellSelect = () => {

  }
  console.log(prime)

  useEffect(()=>{
    if (searchInput.length > 0) {
      dispatch(searchData(searchInput)).then((result)=>{
        console.log(result.payload)
        setUsers(result.payload)
      })
    }else if (searchInput.length === 0){
      dispatch(primeUsers(null)).then((result)=>{
        setUsers(result.payload)
      });
    }
  },[searchInput])

console.log(prime&&prime.prime)
  const toast = useRef()
  // const {loading} = useSelector(state=>state.admin)
  // if (loading) return <Shimmer />
  return (
    <AdminLayout>

      <div className='mt-5'>
        <div className='prime-management-buttons'>
          <div className='col-md-4'>
            <Button label='Free Trail' onClick={()=>{navigate('/admin-page/prime-management/free-trail-management')}} className='btn prime-buttons btn-hover'></Button>
          </div>
          <div className='col-md-4 '>
          <Button label='Beginner Level' onClick={()=>{navigate('/admin-page/prime-management/beginner-level-management')}} className='btn prime-buttons '></Button>
          </div>
          <div className='col-md-4 '>
          <Button label='Advanced Level' onClick={()=>{navigate('/admin-page/prime-management/advanced-level-management')}} className='btn prime-buttons '></Button>
          </div>
        </div>
      </div>


     


            <div className='' style={{display:'flex'}}>
            <div class="input-group rounded mt-5 w-25">
            <input
              type="search"
              class="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={(e)=>{setSearchInput(e.target.value)}}
              value={searchInput}
            />
            <span class="input-group-text border-0" id="search-addon">
              <i class="fas fa-search"></i>
            </span>
          </div>
          {prime?
                 <div className="mt-5 justify-content-center mx-5">
                 <select  onChange={(e) => setSearchInput(e.target.value)}
                     optionLabel="cname" optionGroupLabel="name" optionGroupChildren={['states', 'cities']}
                     className=" md:w-14rem form-control" breakpoint="767px" placeholder="Select a City"  >
                       <option value=" ">All</option>
                       {prime.map(value => {
                           return(
                                                           
                           <option value={value.prime}>{value.prime}</option>
                           )
                       })}
                     </select>
             </div>
          :<div></div>}

            </div>

            <div className='mt-5'>

            <table class="table table-hover table-dark mt-3">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">First Name</th>
                <th scope="col">Email</th>
                <th scope="col">Words</th>
                <th scope="col">Limit</th>
                <th scope="col">Subscription</th>
                <th scope="col">Validity</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user, i) => {
                  return (
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>{user.first_name}</td>
                      <td>{user.email}</td>
                      
                      <td>{user.wordCount}</td>
                      <td>{user.monthlyCount}</td>
                      <td>
                        {user.subscriptionType}
                      </td>
                      <td>
                        {user.monthlyCount}
                      </td>

                      <td>
                        {user.premium?                        <button
                          value={user.email}
                          key={user.premium}
                          className="btn border-white text-white"
                          onClick={(e) =>
                            onCellSelect(e.target.value, user.premium)
                          }
                        >
                          Cancel
                        </button>:<div></div>                
                        //   <button
                        //   value={user.email}
                        //   key={user.premium}
                        //   className="btn border-white text-white"
                        //   onClick={(e) =>
                        //     onCellSelect(e.target.value, user.premium)
                        //   }
                        // >
                        //   Unblock
                        // </button>
                        }

                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

            </div>
    </AdminLayout>

  )
}

export default PrimeManagement