import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { getUser } from "./user";

export const adminLog = createAsyncThunk(
  "admin/login",
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
    } else if (password == null || password == "") {
      Swal.fire({
        text: "Password is Required....!!",
        icon: "error",
      });
      console.log("failed");
      return thunkAPI.rejectWithValue();
    } else if (email !== null && email !== "admin4@gmail.com") {
      Swal.fire({
        text: "Only admin can access!!",
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
        console.log(res);

        const data = await res.json();
        console.log(res.status);

        if (res.status === 200) {
          const { dispatch } = thunkAPI;

          // dispatch(getAdmin(data.access));
          console.log(data);
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

const adminLogout = createAsyncThunk("admin/logout", async (_, thunkAPI) => {
  try {
    const res = await fetch("/api/admin/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const data = await res.json();
    console.log(res.status);
    if (res.status === 200) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const BlockUser = createAsyncThunk(
  "user/block",
  async (email, thunkAPI) => {
    console.log(email);
    const body = JSON.stringify(email);
    console.log(email);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/Block", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      console.log(res, "heyu");
      const data = await res.json();
      if (res.status === 200) {
        console.log("everything is ok");
        console.log(data);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const DeleteUser = createAsyncThunk(
  "user/Delete",
  async (email, thunkAPI) => {
    console.log(email);
    const body = JSON.stringify(email);
    console.log(email);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/delete", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      console.log(res, "heyu");
      const data = await res.json();
      if (res.status === 200) {
        console.log("everything is ok");
        console.log(data);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const searchData = createAsyncThunk(
  "user/search",
  async (search, thunkAPI) => {
    const body = JSON.stringify(search);
    console.log(search);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/prime-search", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      console.log(res, "heyu");
      const data = await res.json();
      if (res.status === 200) {
        console.log("everything is ok");
        console.log(data);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const UsersDetails = createAsyncThunk(
  "users/",
  async (setUserDetails, thunkAPI) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/user-details", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }

      });
      console.log(res, "heyu");
      const data = await res.json();
      // console.log(data);
      if (res.status === 200) {
        console.log("everything is ok");
        setUserDetails(data);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const primeUsers = createAsyncThunk(
  "users/primeUs",
  async (value, thunkAPI) => {
    const body = JSON.stringify({
      value,
    });
    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/user-data", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();
      // console.log(data);
      if (res.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const freeTrail = createAsyncThunk(
  "users/freeTrail",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/free-trail", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      // console.log(data);
      if (res.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const Beginner = createAsyncThunk(
  "users/Beginner",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/beginner", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      // console.log(data);
      if (res.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editPrime = createAsyncThunk(
  "users/editPrime",
  async ({ words, prize, month, key, prime }, thunkAPI) => {
    console.log(key)
    const body = JSON.stringify({
      words,
      prize,
      month,
      key,
      prime,
    })
    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/edit-prime",{
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const PrimeData = createAsyncThunk(
  "users/prime",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/prime-data", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      // console.log(data);
      if (res.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);




const initialState = {
  isAdminAuthenticated: false,
  admin: null,
  loading: false,
  login: false,
};
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetLogin: (state) => {
      state.login = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLog.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminLog.fulfilled, (state, actions) => {
        state.loading = false;
        state.isAdminAuthenticated = true;
        state.admin = actions.payload;
      })
      .addCase(adminLog.rejected, (state) => {
        state.loading = false;
      })

      .addCase(UsersDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(UsersDetails.fulfilled, (state, actions) => {
        state.loading = false;
        state.isAdminAuthenticated = true;

      })
      .addCase(UsersDetails.rejected, (state) => {
        state.loading = false;
      })

      .addCase(primeUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(primeUsers.fulfilled, (state, actions) => {
        state.loading = false;
        state.isAdminAuthenticated = true;
 
      })
      .addCase(primeUsers.rejected, (state) => {
        state.loading = false;
      })
      
      .addCase(freeTrail.pending, (state) => {
        state.loading = true;
      })
      .addCase(freeTrail.fulfilled, (state, actions) => {
        state.loading = false;
        state.isAdminAuthenticated = true;

      })
      .addCase(freeTrail.rejected, (state) => {
        state.loading = false;
      })
      
      .addCase(Beginner.pending, (state) => {
        state.loading = true;
      })
      .addCase(Beginner.fulfilled, (state, actions) => {
        state.loading = false;
        state.isAdminAuthenticated = true;

      })
      .addCase(Beginner.rejected, (state) => {
        state.loading = false;
      })
      
      .addCase(editPrime.pending, (state) => {
        state.loading = true;
      })
      .addCase(editPrime.fulfilled, (state, actions) => {
        state.loading = false;
        state.isAdminAuthenticated = true;

      })
      .addCase(editPrime.rejected, (state) => {
        state.loading = false;
      })
      
      .addCase(PrimeData.pending, (state) => {
        state.loading = true;
      })
      .addCase(PrimeData.fulfilled, (state, actions) => {
        state.loading = false;
        state.isAdminAuthenticated = true;

      })
      .addCase(PrimeData.rejected, (state) => {
        state.loading = false;
      })




  },
});
export const { resetLogin } = adminSlice.actions;
export default adminSlice.reducer;
