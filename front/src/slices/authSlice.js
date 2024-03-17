import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "http://localhost:3001/api/v1";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password , rememberMe }, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${backendURL}/user/login`,
        { email, password },
        config
      );
      if (rememberMe) {
        localStorage.setItem("token", data.body.token);
      }
      return data.body;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const isLoggedIn = token? true : false;

const initialState = {
  loading: false,
  token,
  isLoggedIn,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.loading = false;
        state.success = true;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logOut } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
