import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "./adminLayout";
// import { BlockUser, DeleteUser, searchData, UsersDetails } from ".../feature/admin";
import { useDispatch } from "react-redux";
import { Button } from "primereact/button";

import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";
import { BlockUser, DeleteUser, searchData, UsersDetails } from "../../features/admin";

const UserData = () => {
  const dispatch = useDispatch();
  const [userdetails, setUserDetails] = useState([]);
  // const { allUser } = useSelector((state) => state.admin);
  // const [searchInput, setSearchInput] = useState('');

  const { isAdminAuthenticated } = useSelector((state) => state.admin);
  console.log(isAdminAuthenticated);
  const [searchInput, setSearchInput] = useState(userdetails);
  const [state,setState]=useState(null)
  console.log(searchInput);

  // block user ----------------------------------------------
  const onCellSelect = (event, is_active) => {
    console.log(event, is_active);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you wanna Block This User!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Block it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(BlockUser(event)).then((result) => {
          console.log(result.payload);
          setUserDetails(result.payload);
          Swal.fire({
            title: "Blocked",
            icon: "success",
          });
        });
      }
    });
  };
  // end block user ---------------------------------------------------------------|

  // fetching user from backend --------------------------------------------------------|
  useEffect(() => {
    dispatch(UsersDetails(setUserDetails));
  }, []);
  // end fetch user from backend--------------------------------------|

  // search ---------------------------------------------------|
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);

  };

  useEffect(()=>{
    if (searchInput.length > 0) {
      dispatch(searchData(searchInput)).then((result)=>{
        console.log(result.payload)
        setUserDetails(result.payload)
      })
    }else if (searchInput.length == 0){
      dispatch(UsersDetails(setUserDetails));
    }
  },[searchInput])



const onSelect=(name,email) => {
  console.log(name );
  Swal.fire({
    title: "Are you sure?",
    text: `Do you wanna Delete ${name}..!!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(DeleteUser(email)).then((result) => {

        console.log(result.payload);
        setUserDetails(result.payload);
        Swal.fire({
          title: "Removed",
          icon: "success",
        });
      });
    }
  });
};


  // end search ---------------------------------------------------|

  console.log(userdetails);

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
// {  if (!isAdminAuthenticated) return <Navigate to="/admin" />;}
  return (
    <AdminLayout title="admin page | AdminPage" content="AdminPage">
      <div>


        <div>
          <div class="input-group rounded mt-5 w-25">
            <input
              type="search"
              class="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={handleChange}
              value={searchInput}
            />
            <span class="input-group-text border-0" id="search-addon">
              <i class="fas fa-search"></i>
            </span>
          </div>

          <table class="table table-dark mt-3">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
                <th scope="col">Active</th>
                <th scope="col">Actions</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {userdetails &&
                userdetails.map((user, i) => {
                  return (
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.email}</td>
                      {user.is_active ? <td>True</td> : <td>False</td>}

                      <td>
                        {user.is_active?                        <button
                          value={user.email}
                          key={user.is_active}
                          className="btn border-white text-white"
                          onClick={(e) =>
                            onCellSelect(e.target.value, user.is_active)
                          }
                        >
                          Block
                        </button>:                      
                          <button
                          value={user.email}
                          key={user.is_active}
                          className="btn border-white text-white"
                          onClick={(e) =>
                            onCellSelect(e.target.value, user.is_active)
                          }
                        >
                          Unblock
                        </button>}

                      </td>
                      <td>
                        <button
                          value={user.email}
                          key={user.is_active}
                          className="btn border-danger text-white"
                          onClick={(e) =>
                            onSelect(user.first_name,user.email)
                          }
                        >
                          Delete
                        </button>

                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserData;
