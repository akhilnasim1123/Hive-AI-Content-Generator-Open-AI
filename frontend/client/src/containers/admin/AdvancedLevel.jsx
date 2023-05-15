import React, { useEffect, useRef, useState } from 'react'
import AdminLayout from './adminLayout'
import { useDispatch, useSelector } from 'react-redux'
import Shimmer from '../shimmer/shimmer';
import { Button } from 'primereact/button';
import { Slider } from 'primereact/slider';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Advanced, Beginner, editPrime, primeUsers, searchData } from '../../features/admin';
import { useNavigate } from 'react-router-dom';

const AdvancedLevel = () => {
  // const {loading} = useSelector(state=>state.admin)
  // if (loading) return <Shimmer />
  const dispatch = useDispatch()
  const [users,setUsers] = useState([])
  const [searchInput, setSearchInput] = useState(users);
  const [freeTrailDetails, setFreeTrailDetails] = useState([])

  const navigate = useNavigate()
console.log(users)
  const [formData,setFormData] = useState({
    words : '',
    prime:'',
    prize:'',
    month:'',
    key:''
  })

  const {words,prize,month,key,prime} = formData

  const onSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(editPrime({words,prize,month,key,prime})).then(result => {
      const data = result.payload
      console.log(data)
      setFormData({
          words:data.words,
          prime:data.prime,
          prize:data.prize,
          month:data.month,
          key:data.key,
      })
      console.log(formData)
    }).then(result => {
      toast.current.show({ severity: 'success', summary: 'Edited successful'})
  })

  }
  console.log(key)

  const onChange = (e) => {

    setFormData({...formData,[e.target.name]: e.target.value})
  }

  const onCellSelect = () => {

  }
  useEffect(()=> {
      dispatch(Advanced()).then((result)=>{
        const {userDetails,freeTrailDet} = result.payload
        setUsers(userDetails)
        console.log(freeTrailDet)
        console.log(result.payload)
        setFormData({
         words:freeTrailDet[2].words,
         prize : freeTrailDet[2].prize,
         month : freeTrailDet[2].month,
         key: freeTrailDet[2].unique_id,
         prime: freeTrailDet[2].prime
        })
        console.log(freeTrailDet.words)
      })
    },[])

  useEffect(()=>{
    if (searchInput.length > 0) {
      dispatch(searchData(searchInput)).then((result)=>{

        console.log(result.payload)
        setUsers(result.payload)
      })
    }else if (searchInput.length === 0 || searchInput === ''){
      dispatch(primeUsers('Beginner Level')).then(result => {
          setUsers(result.payload)
      });
    }
  },[searchInput])


  const toast = useRef()
  // const {loading} = useSelector(state=>state.admin)
  // if (loading) return <Shimmer />
  return (
    <AdminLayout>

      <div className='mt-5'>
          <h3> Advanced Management</h3>
      </div>


            <div className='mt-5'>
            <form onSubmit={onSubmitHandler} className='w-100'>
                <Toast ref={toast} />
                <div className=' prime-form' style={{display:'flex'}}>
                    <div className='mt-5 col-lg-3 col-md-6'>
                        <span className="p-float-label">
                            <InputText type='text' size='sm' value={prize} name='prize' className='form-inputs' onChange={onChange} />
                            <label style={{ color: 'rgb(26 32 43)' }}>Prize</label>
                        </span>
                    </div>
                    <div className='mt-5 col-lg-3 col-md-6'>
                        <span className="p-float-label">
                            <InputText name='words' value={words} className='form-inputs' onChange={onChange} />
                            <label style={{ color: 'rgb(26 32 43)' }}>Words</label>
                        </span>
                    </div>
                    <div className='mt-5 col-lg-3 col-md-6'>
                  <span className="p-float-label">
                      <InputText value={month} name='month'  onChange={onChange} className="w-full form-inputs" />
                      <label style={{ color: 'rgb(26 32 43)' }}>Month</label>
                      </span>
              <Slider value={month}  name='month' className="w-full" step={1} max={24} min={1} onChange={(e)=>{setFormData({ ...formData, month:e.value})}}/>

          </div>   
                </div>
                <div className='mt-3'>
                    <Button label='Submit' className='generate-blog-topic-ideas' type='submit' size="small"></Button>
                </div>
            </form>
            </div>


           <div>
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


           </div>

            <div className='mt-5'>
            {users.length>0?
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
                        }

                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
:       
                  <div className='text-center'>
                    <b>There is no Subscribers</b>
                  </div>
}
            </div>
    </AdminLayout>

  )

}

export default AdvancedLevel