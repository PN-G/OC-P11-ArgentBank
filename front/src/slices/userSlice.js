import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "http://localhost:3001/api/v1";

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (token, { rejectWithValue }) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${backendURL}/user/profile`,
        "",
        config
      );
      return data.body;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        console.log(error.response);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateUserName = createAsyncThunk(
  "user/changeUserName",
  async ({ token, newUserName }, { rejectWithValue }) => {
    console.log("clic"), console.log(token);
    console.log(newUserName);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${backendURL}/user/profile`,
        { userName: newUserName },
        config
      );
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

const initialState = {
  id: null,
  userName: null,
  firstName: null,
  lastName: null,
  loading: false,
  isConnected: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogOut: (state) => {
      state.id = null;
      state.userName = null;
      state.firstName = null;
      state.lastName = null;
      state.isConnected = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.isConnected = true;
        state.id = action.payload.id;
        state.userName = action.payload.userName;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
      })
      .addCase(getUserData.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    builder
      .addCase(updateUserName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.loading = false;
        state.userName = action.payload.userName;
      })
      .addCase(updateUserName.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { userLogOut } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
