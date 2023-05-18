import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { json } from "react-router-dom";
const cookie = require("cookie");

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
      const res = await fetch("/router/users/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await res.json();
      console.log(data)
      if (res.status === 201) {
        Swal.fire({
          text: res.statusText,
          icon: "success",
        });
        return data;
      } else {
        console.log(res)
        Swal.fire({
          text: res.error,
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
);

export const getUser = createAsyncThunk("users/me", async (_, thunkAPI) => {
  console.log('aasdfaaaaaaaaaaadsfa')
  try {
    const res = await fetch("/router/users/me", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await res.json();
    console.log(data)
    if (res.status === 200) {
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
  async (req, thunkAPI) => {
    console.log(req)
    const { email, password } = req;
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
        const res = await fetch("/router/users/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body,
        });

        const data = await res.json();
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
            text: 'There is no User With This Credentials',
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
    const res = await fetch("/router/users/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
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
        `http://64.227.168.207/api/users/blog-ideas-generator`,
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
      if (response.status === 200) {
        return data;
      } else {
        Swal.fire({
          text: data.error,
          icon: "error",
        });
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const BlogGenerator = createAsyncThunk(
  "users/Blog-generator",
  async ({ topic, keywords, words, accuracy,email }, thunkAPI) => {
    const body = JSON.stringify({
      topic,
      keywords,
      words,
      accuracy,
      email,
    });
    try {
      const response = await fetch(
        `http://64.227.168.207/api/users/blog-generator`,
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
      if (response.status === 200) {
        return data;
      } else {
        Swal.fire({
          text: data.error,
          icon: "error",
        });
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
        `http://64.227.168.207/api/users/story-generator`,
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
      if (response.status === 200) {
        return data;
      } else {
        Swal.fire({
          text: data,
          icon: "error",
        });

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
      const res = await fetch("/router/users/verify", {
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
  async ({ content, email, topic, keywords,unique_id }, thunkAPI) => {
    const body = JSON.stringify({
      content,
      email,
      topic,
      keywords,
      unique_id,
    });

    try {
      const response = await fetch(
        `http://64.227.168.207/api/users/save-blog`,
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

    try {
      const response = await fetch(
        `http://64.227.168.207/api/users/generate-blog-sections`,
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
      if (response.status === 200) {
        return data;
      } else {
        Swal.fire({
          text: data,
          icon: "error",
        });
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
    const email = res;
    const body = JSON.stringify({
      email,
    })
    console.log(email, body);
    try {
      const res = await fetch(`http://64.227.168.207/api/users/user-collection`,{
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

export const premiumSubscription = createAsyncThunk (
  'users/primium-subscription', async ({amount,paymentId,email,key},thunkAPI) =>{
    const body = JSON.stringify({
      amount,
      paymentId,
      email,
      key
    })
    try {
      const res = await fetch(`http://64.227.168.207/api/users/primium-subscription`,{
        method: 'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body,
      })
      const data = await res.json()
      if (res.statusCode === 200){
        return data
      }
      else{
        return thunkAPI.rejectWithValue(data)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)


export const premiumSubscriptionPlans = createAsyncThunk (
  'users/plans', async (email,thunkAPI) =>{
    const body = JSON.stringify({
      email,
    })
  

    try {
      const res = await fetch(`http://64.227.168.207/api/users/premium-plans`,{
        method: 'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        email,
      })
      const data = await res.json()
      if (res.statusCode === 200){
        return data
      }
      else{
        return thunkAPI.rejectWithValue(data)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)


export const otpLogin = createAsyncThunk(
  'users/otp', async (email,thunkAPI)=>{
    const body = JSON.stringify({
      email,
    })
    try {
      const res = await fetch(`http://64.227.168.207/api/users/otp`,{
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
        
      })
      
      const data = res.json()
      console.log(data)
      if (res.status === 200){
        return data
      }
      else{
        return thunkAPI.rejectWithValue(data)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const emailVerify = createAsyncThunk(
  'users/otp', async (email,thunkAPI)=>{
    const body = JSON.stringify({
      email,
    })
    try {
      const res = await fetch(`http://64.227.168.207/api/users/email-verify`,{
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
        
      })
      const data = res.json()
      if (res.status === 200){
        return data
      }
      else{
        return thunkAPI.rejectWithValue(data)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
//otp-verify
export const otpVerification = createAsyncThunk(
  'users/otp', async ({otp,email},thunkAPI)=>{
    const body = JSON.stringify({
      otp,
      email,
    })
    try {
      const res = await fetch(`http://64.227.168.207/api/users/otp-verify`,{
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
        
      })
      const data = res.json()
      
      if (res.status === 200){
        return data
      }
      else{
        Swal.fire({
          text: 'Invalid otp, Please enter a valid OTP',
          icon: "error",

        })
        return thunkAPI.rejectWithValue(data)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const otpEmailVerification = createAsyncThunk(
  'users/otp-email', async ({otp,email},thunkAPI)=>{
    const body = JSON.stringify({
      otp,
      email,
    })
    try {
      const res = await fetch(`http://64.227.168.207/api/users/otp-email-verify`,{
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
        
      })
      const data = res.json()
      
      if (res.status === 200){
        return data
      }
      else{
        Swal.fire({
          text: 'Invalid otp, Please enter a valid OTP',
          icon: "error",

        })
        return thunkAPI.rejectWithValue(data)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)


export const changeUserImage = createAsyncThunk(
  "user",
  async (obj, thunkAPI) => {
    const { url, email } = obj;
    // console.log(dataUrl,'this is data url ofofofofo')
    console.log(email, "this is email.........");
    const body = JSON.stringify({
      url,
      email,
    });
    // console.log(dataUrl,'this is data url ofofofofo')
    // console.log(email,'emaaaaiillllllllll')
    try {
      const res = await fetch(`http://64.227.168.207/api/users/update-image`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
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

export const ProfileEdit = createAsyncThunk(
  'user/data-edit',
  async({first_name,last_name,email,phone_number},thunkAPI)=>{
    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      phone_number,
    })
    console.log(body)
      try {
        const res = await fetch(`http://64.227.168.207/api/users/update-profile`,{
          method: 'POST',
          headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body,
        })
        const data = await res.json()
        if (res.statusCode === 200){
          return data
        }
        else{
          return thunkAPI.rejectWithValue(data)
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
    }
  )
  export const ImageGeneratorFun = createAsyncThunk(
    'user/image-generator',
    async({topic,keywords,imageQuality},thunkAPI)=>{
      const body = JSON.stringify({
        topic,
        keywords,
        imageQuality,
      })
      console.log(body)
        try {
          const res = await fetch(`http://64.227.168.207/api/users/image-generator`,{
            method: 'POST',
            headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body,
          })
          const data = await res.json()
          if (res.statusCode === 200){
            return data
          }
          else{
            return thunkAPI.rejectWithValue(data)
          }
        } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data)
        }
      }
    )



    export const SavedIdea = createAsyncThunk(
      'user/saved-Ideas',
      async(email,thunkAPI)=>{
        console.log(email)
        const body = JSON.stringify({
          email,
        })
        console.log(body)
          try {
            const res = await fetch(`http://64.227.168.207/api/users/saved-ideas`,{
              method: 'POST',
              headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body,
            })
            const data = await res.json()
            if (res.statusCode === 200){
              return data
            }
            else{
              return thunkAPI.rejectWithValue(data)
            }
          } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
          }
        }
      )


      export const deleteIdea = createAsyncThunk(
        'user/delete-Idea',
        async({content,email},thunkAPI)=>{
          console.log(email)
          const body = JSON.stringify({
            content,
            email,
          })
          console.log(body)
            try {
              const res = await fetch(`http://64.227.168.207/api/users/delete-idea`,{
                method: 'POST',
                headers:{
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body,
              })
              const data = await res.json()
              if (res.statusCode === 200){
                return data
              }
              else{
                return thunkAPI.rejectWithValue(data)
              }
            } catch (error) {
              return thunkAPI.rejectWithValue(error.response.data)
            }
          }
        )

        export const blogSect = createAsyncThunk(
          "users/blog-section",
          async (checkedList , thunkAPI) => {
            const body = JSON.stringify({
              checkedList,
            });
            console.log(checkedList)
        
            try {
              const response = await fetch(
                `http://64.227.168.207/api/users/blog-section`,
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
    
              if (response.status === 200) {
                return data;
              } else {
                Swal.fire({
                  text: data,
                  icon: "error",
                });
                return thunkAPI.rejectWithValue(data);
              }
            } catch (error) {
              return thunkAPI.rejectWithValue(error.response.data);
            }
          }
        );
        

        export const BlogSectionDetails = createAsyncThunk(
          'user/blog-section',
          async(email,thunkAPI)=>{
            console.log(email)
            const body = JSON.stringify({
              email,
            })
            console.log(body)
              try {
                const res = await fetch(`http://64.227.168.207/api/users/blog-sections-details`,{
                  method: 'POST',
                  headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body,
                })
                const data = await res.json()
                if (res.statusCode === 200){
                  return data
                }
                else{
                  return thunkAPI.rejectWithValue(data)
                }
              } catch (error) {
                return thunkAPI.rejectWithValue(error.response.data)
              }
            }
          )
          export const deleteSections = createAsyncThunk(
            'user/delete-Section',
            async({content,email},thunkAPI)=>{
              console.log(email)
              const body = JSON.stringify({
                content,
                email,
              })
              console.log(body)
                try {
                  const res = await fetch(`http://64.227.168.207/api/users/delete-section`,{
                    method: 'POST',
                    headers:{
                      Accept: 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body,
                  })
                  const data = await res.json()
                  if (res.statusCode === 200){
                    return data
                  }
                  else{
                    return thunkAPI.rejectWithValue(data)
                  }
                } catch (error) {
                  return thunkAPI.rejectWithValue(error.response.data)
                }
              }
            )




export const BlogDetails = createAsyncThunk(
  'user/blog-Details',
  async(email,thunkAPI)=>{
    console.log(email)
    const body = JSON.stringify({
      email,
    })
    console.log(body)
      try {
        const res = await fetch(`http://64.227.168.207/api/users/blog-details`,{
          method: 'POST',
          headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body,
        })
        const data = await res.json()
        if (res.statusCode === 200){
          return data
        }
        else{
          return thunkAPI.rejectWithValue(data)
        }
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
    }
  )


  export const deleteBlog = createAsyncThunk(
    'user/delete-Blog',
    async({content,email},thunkAPI)=>{
      console.log(email)
      const body = JSON.stringify({
        content,
        email,
      })
      console.log(body)
        try {
          const res = await fetch(`http://64.227.168.207/api/users/delete-Blog`,{
            method: 'POST',
            headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body,
          })
          const data = await res.json()
          if (res.statusCode === 200){
            return data
          }
          else{
            return thunkAPI.rejectWithValue(data)
          }
        } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data)
        }
      }
    )

export const subscribedDetails = createAsyncThunk( 'user/delete-Blog',
async(email,thunkAPI)=>{
  console.log(email)
  const body = JSON.stringify({
    email,
  })
  console.log(body)
    try {
      const res = await fetch(`http://64.227.168.207/api/users/subscribed`,{
        method: 'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body,
      })
      const data = await res.json()
      if (res.statusCode === 200){
        return data
      }
      else{
        return thunkAPI.rejectWithValue(data)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const cancelPrime = createAsyncThunk( 'user/delete-Blog',
async(email,thunkAPI)=>{
  console.log(email)
  const body = JSON.stringify({
    email,
  })
  console.log(body)
    try {
      const res = await fetch(`http://64.227.168.207/api/users/cancel-sub`,{
        method: 'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body,
      })
      const data = await res.json()
      if (res.statusCode === 200){
        return data
      }
      else{
        return thunkAPI.rejectWithValue(data)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)




const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  authLoading: false,
  registered: false,
  content: "",
  music :false
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
        // state.user = actions.payload;
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
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
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
      }).addCase(premiumSubscription.pending, (state) => {
        state.loading = true;
      })
      .addCase(premiumSubscription.fulfilled, (state, actions) => {
        state.loading = false;
        state.user = actions.payload;
      })
      .addCase(premiumSubscription.rejected, (state) => {
        state.loading = false;
      })
      .addCase(ProfileEdit.pending, (state) => {
        state.loading = true;
      })
      .addCase(ProfileEdit.fulfilled, (state, actions) => {
        state.loading = false;
        state.user = actions.payload;
      })
      .addCase(ProfileEdit.rejected, (state) => {
        state.loading = false;
      })
      .addCase(BlogSectionDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(BlogSectionDetails.fulfilled, (state, actions) => {
        state.loading = false;
        state.user = actions.payload;
      })
      .addCase(BlogSectionDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(blogSect.pending, (state) => {
        state.loading = true;
      })
      .addCase(blogSect.fulfilled, (state, actions) => {
        state.loading = false;
        state.user = actions.payload;
      })
      .addCase(blogSect.rejected, (state) => {
        state.loading = false;
      })
      .addCase(BlogDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(BlogDetails.fulfilled, (state, actions) => {
        state.loading = false;
        state.user = actions.payload;
      })
      .addCase(BlogDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(ImageGeneratorFun.pending, (state) => {
        state.loading = true;
      })
      .addCase(ImageGeneratorFun.fulfilled, (state, actions) => {
        state.loading = false;
        state.user = actions.payload;
      })
      .addCase(ImageGeneratorFun.rejected, (state) => {
        state.loading = false;
      })
      //ImageGeneratorFun
  },
});
export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;