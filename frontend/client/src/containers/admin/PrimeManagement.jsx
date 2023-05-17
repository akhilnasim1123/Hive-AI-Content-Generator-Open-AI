import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import AdminLayout from './adminLayout'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { useDispatch, useSelector } from 'react-redux'
import { DeactivatePrime, PrimeData, checkAdmin, primeUsers, searchData } from '../../features/admin'
import { useNavigate } from 'react-router-dom'
import { CascadeSelect } from 'primereact/cascadeselect'
import Shimmer from '../shimmer/shimmer'
import Swal from 'sweetalert2'

const PrimeManagement = () => {
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(checkAdmin());
  // }, []);
  const [users, setUsers] = useState([])
  const [searchInput, setSearchInput] = useState([]);
  const [prime, setPrime] = useState([])
  useEffect(() => {
    dispatch(primeUsers(null)).then((result) => {
      setUsers(result.payload)
    })
  }, [])
  useEffect(() => {
    dispatch(PrimeData()).then((result) => {
      console.log(result.payload)
      const data = result.payload
      console.log(data)
      setPrime(result.payload)
    })
  }, [])
  const navigate = useNavigate()
  const onCellSelect = (event,prime,active) => {
    console.log(active,prime)
    if (active === true){
      Swal.fire({
        title: "Are you sure?",
        text: "Do you wanna DeActivate This Prime!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, DeActivate it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(DeactivatePrime({prime,active})).then((result) => {
            console.log(result.payload);
            setPrime(result.payload);
            Swal.fire({
              title: "DeActivated",
              icon: "success",
            });
          });
        }
      });
    }else{
      Swal.fire({
        title: "Are you sure?",
        text: "Do you wanna Activate This Prime!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Activate it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(DeactivatePrime({prime,active})).then((result) => {
            console.log(result.payload);
            setPrime(result.payload);
            Swal.fire({
              title: "Activated",
              icon: "success",
            });
          });
        }
      });
    }
  
  };
  
  console.log(prime)

  useEffect(() => {
    if (searchInput.length > 0) {
      dispatch(searchData(searchInput)).then((result) => {
        console.log(result.payload)
        setUsers(result.payload)
      })
    } else if (searchInput.length === 0) {
      dispatch(primeUsers(null)).then((result) => {
        setUsers(result.payload)
      });
    }
  }, [searchInput])

  console.log(prime && prime.prime)
  const toast = useRef()
  // const {loading} = useSelector(state=>state.admin)
  // if (loading) return <Shimmer />
  return (
    <AdminLayout>

      <div className='mt-5'>
        <div className='prime-management-buttons'>
          <div className='col-md-4'>
            <Button label='Free Trail' onClick={() => { navigate('/admin-page/prime-management/free-trail-management') }} className='btn prime-buttons btn-hover'></Button>
          </div>
          <div className='col-md-4 '>
            <Button label='Beginner Level' onClick={() => { navigate('/admin-page/prime-management/beginner-level-management') }} className='btn prime-buttons '></Button>
          </div>
          <div className='col-md-4 '>
            <Button label='Advanced Level' onClick={() => { navigate('/admin-page/prime-management/advanced-level-management') }} className='btn prime-buttons '></Button>
          </div>
        </div>
      </div>

      {/* <div className='' style={{ display: 'flex' }}>
        <div class="input-group rounded mt-5 w-25">
          <input
            type="search"
            class="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            onChange={(e) => { setSearchInput(e.target.value) }}
            value={searchInput}
          />
          <span class="input-group-text border-0" id="search-addon">
            <i class="fas fa-search"></i>
          </span>
        </div>
        {prime.length>0 ?
          <div className="mt-5 justify-content-center mx-5">
            <select onChange={(e) => setSearchInput(e.target.value)}
              optionLabel="cname" optionGroupLabel="name" optionGroupChildren={['states', 'cities']}
              className=" md:w-14rem form-control" breakpoint="767px" placeholder="Select a City"  >
              <option value=" ">All</option>
              {prime.map(value => {
                return (

                  <option value={value.prime}>{value.prime}</option>
                )
              })}
            </select>
          </div>
          : <div></div>}

      </div> */}

      <div className='mt-5'>
        {prime&&prime.length > 1 ?
          <table class="table table-hover table-dark mt-3">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Prime</th>
                <th scope="col">Words</th>
                <th scope="col">Prize</th>
                <th scope="col">Limit</th>
                <th scope="col">active</th>
                <th scope="col">action</th>
                {/* <th scope="col">Subscription</th>
                <th scope="col">Validity</th>
                <th scope="col">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {prime &&
                prime.map((p, i) => {
                  return (
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>{p.prime}</td>
                      <td>{p.words}</td>

                      <td>${p.prize}</td>
                      <td>{p.month} Month</td>
                      {p.active===true?<td>True</td>:<td>False</td>}
                      
                      <td>
                        {p.active===true?
                        <button
                          value={p.unique_id}
                          className="btn border-white text-white"
                          onClick={(e) =>
                            onCellSelect(e.target.value, p.prime,p.active)
                          }
                        >
                          DeActivate</button>
                        :
                        <button
                        value={p.unique_id}
                        className="btn border-white text-white"
                        onClick={(e) =>
                          onCellSelect(e.target.value, p.prime,p.active)
                        }
                      >
                        Activate</button>
                      }
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table> : <div className='text-center ' style={{ marginTop: '10%', height: '50px' }}>
            <b>There Is No Plans Yet</b>
          </div>
        }

      </div>
    </AdminLayout>

  )
}

export default PrimeManagement