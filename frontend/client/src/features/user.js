import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { Toast } from 'primereact/toast';
import { useRef } from "react";

export const register = createAsyncThunk(
  "users/register",
  async ({ first_name, last_name,phone, email, password }, thunkAPI) => {
    const body = JSON.stringify({
      first_name,
      last_name,
      phone_number:phone,
      email,
      password,
    });

    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();

      if (res.status === 201) {
        Swal.fire({
          text: res.statusText,
          icon: "success",
        });
        return data;
      } else {
        console.log(res.statusText);
        console.log(res);
        Swal.fire({
          text: res.statusText,
          icon: "error",
        });
        console.log(res.statusText);
        console.log(res);
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      Swal.fire({
        text: err.response.data,
        icon: "error",
      });
      console.log(err);
      console.log(err.response.data);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);


const getUser = createAsyncThunk("users/me", async (_, thunkAPI) => {
  try {
    const res = await fetch("/api/users/me", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      // Swal.fire({
      // 	text:res.statusText,
      // 	icon:'success'
      // })
      return data;
    } else {

      return thunkAPI.rejectWithValue(data);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});


export const login = createAsyncThunk(
  "users/login",
  async ({ email, password }, thunkAPI) => {
    const body = JSON.stringify({
      email,
      password,
    });
    if (email === null || (email === "" && password === null) || email === "") {
      Swal.fire({
        text: "These Fields are Required....!!",
        icon: "error",
      });
      return thunkAPI.rejectWithValue();
    } else if (email === null || email === "") {
      Swal.fire({
        text: "Email is Required....!!",
        icon: "error",
      });
      return thunkAPI.rejectWithValue();
    } else if (password == null || password === "") {
      Swal.fire({
        text: "Password is Required....!!",
        icon: "error",
      });
      console.log("failed");
      return thunkAPI.rejectWithValue();
    } else {
      try {
        const res = await fetch("/api/users/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body,
        });

        const data = await res.json();
        console.log(data)
        if (res.status === 200) {
          const { dispatch } = thunkAPI;
          console.log(res.status)
          dispatch(getUser());
          Swal.fire({
          	text:'Logged in Successfully',
          	icon:'success'
          })

          return data;
        } else {
          Swal.fire({
            text: res.statusText,
            icon: "error",
          });
          return thunkAPI.rejectWithValue(data);
        }
      } catch (err) {
        Swal.fire({
          text: err.response.data,
          icon: "error",
        });
        return thunkAPI.rejectWithValue(err.response.data);
      }
    }
  }
);

export const logout = createAsyncThunk(
  "users/logout",
  async (_, thunkAPI) => {
    try {
      const res = await fetch('/api/users/logout', {
        method: 'POST',
        headers:{
          Accept:"application/json",

        }
      })
      const data = await res.json();
      console.log(data)
      if (res.status === 200){
        return data;
      }
      else{
        return thunkAPI.rejectWithValue(data)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
  )






const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  registered: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.registered = true;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled,(state,actions)=>{
        state.loading = false;
        state.isAuthenticated = true;
        state.user = actions.payload;
      })
      .addCase(login.rejected,(state)=>{
        state.loading = false;
      })
      .addCase(logout.pending,(state)=>{
        state.loading = true;
      })
      .addCase(logout.fulfilled,(state)=>{
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logout.rejected,(state)=>{
        state.loading = false;
      })
    }
});
export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;
