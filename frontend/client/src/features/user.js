import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { Toast } from "primereact/toast";
import { useRef } from "react";

export const register = createAsyncThunk(
  "users/register",
  async ({ first_name, last_name, phone, email, password }, thunkAPI) => {
    const body = JSON.stringify({
      first_name,
      last_name,
      phone_number: phone,
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
        console.log(data);
        if (res.status === 200) {
          const { dispatch } = thunkAPI;
          console.log(res.status);
          dispatch(getUser());
          Swal.fire({
            text: "Logged in Successfully",
            icon: "success",
          });

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

export const logout = createAsyncThunk("users/logout", async (_, thunkAPI) => {
  try {
    const res = await fetch("/api/users/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
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
});

export const contentGenerator = createAsyncThunk(
  "users/content-generator",
  async ({ topic, keywords, email }, thunkAPI) => {
    const body = JSON.stringify({
      topic,
      keywords,
      email,
    });
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/users/blog-ideas-generator`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body,
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const BlogGenerator = createAsyncThunk(
  "users/Blog-generator",
  async ({ topic, keywords, words, accuracy }, thunkAPI) => {
    const body = JSON.stringify({
      topic,
      keywords,
      words,
      accuracy,
    });
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/users/blog-generator`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body,
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const StoryGenerator = createAsyncThunk(
  "users/story-generator",
  async ({ topic, keywords, words, accuracy, email }, thunkAPI) => {
    const body = JSON.stringify({
      topic,
      keywords,
      words,
      accuracy,
      email,
    });
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/users/story-generator`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body,
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "users/verify",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/users/verify", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (res.status === 200) {
        const { dispatch } = thunkAPI;

        dispatch(getUser());

        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const saveBlogIdea = createAsyncThunk(
  "users/save-blog-idea",
  async ({ content, email, topic, keywords }, thunkAPI) => {
    const body = JSON.stringify({
      content,
      email,
      topic,
      keywords,
    });
    console.log(body);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/users/save-blog",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body,
        }
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const blogSections = createAsyncThunk(
  "users/sgenerate-blog-sections",
  async ({ checkedList, topic, keywords, unique_id }, thunkAPI) => {
    const body = JSON.stringify({
      checkedList,
      topic,
      keywords,
      unique_id,
    });
    console.log(body);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/users/generate-blog-sections",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body,
        }
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userCollection = createAsyncThunk(
  "users/collection",
  async (res,thunkAPI) => {
    console.log(res,'sdfsadfsdaf')
    const email = res;
    const body = JSON.stringify({
      email,
    })
    console.log(email,'emailllllllllllllllllllllllllllll')
    try {
      const res = await fetch("http://127.0.0.1:8000/api/users/user-collection",{
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      })
      const data = await res.json()
      if (res.status === 200){
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
  isAuthenticated: false,
  user: null,
  loading: false,
  authLoading: false,
  registered: false,
  content: "",
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
        state.authLoading = true;
      })
      .addCase(login.fulfilled, (state, actions) => {
        state.authLoading = false;
        state.isAuthenticated = true;
        state.user = actions.payload;
      })
      .addCase(login.rejected, (state) => {
        state.authLoading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      })
      .addCase(contentGenerator.pending, (state) => {
        state.loading = true;
      })
      .addCase(contentGenerator.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(contentGenerator.rejected, (state) => {
        state.loading = false;
      })
      .addCase(BlogGenerator.pending, (state) => {
        state.loading = true;
      })
      .addCase(BlogGenerator.fulfilled, (state, actions) => {
        state.loading = false;
        state.content = actions.payload;
      })
      .addCase(BlogGenerator.rejected, (state) => {
        state.loading = false;
      })
      .addCase(StoryGenerator.pending, (state) => {
        state.loading = true;
      })
      .addCase(StoryGenerator.fulfilled, (state, actions) => {
        state.loading = false;
        state.content = actions.payload;
      })
      .addCase(StoryGenerator.rejected, (state) => {
        state.loading = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.authLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authLoading = false;
      })
      .addCase(saveBlogIdea.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveBlogIdea.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveBlogIdea.rejected, (state) => {
        state.loading = false;
      })
      .addCase(blogSections.pending, (state) => {
        state.loading = true;
      })
      .addCase(blogSections.fulfilled, (state, actions) => {
        state.loading = false;
        state.content = actions.payload;
      })
      .addCase(blogSections.rejected, (state) => {
        state.loading = false;
      })
      .addCase(userCollection.pending, (state) => {
        state.loading = true;
      })
      .addCase(userCollection.fulfilled, (state, actions) => {
        state.loading = false;
      })
      .addCase(userCollection.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;
