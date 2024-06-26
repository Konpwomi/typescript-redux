import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UserState, User } from "../types";

const apiUrl = "https://65a25d5942ecd7d7f0a77211.mockapi.io/users";

const initialState: UserState = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          if (action.type.includes("fetchUsers")) {
            state.users = action.payload;
          } else if (action.type.includes("fetchUser")) {
            state.currentUser = action.payload;
          } else if (action.type.includes("createUser")) {
            state.users.push(action.payload);
          } else if (action.type.includes("editUser")) {
            const index = state.users.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) {
              state.users[index] = action.payload;
            }
          } else if (action.type.includes("deleteUser")) {
            state.users = state.users.filter((user) => user.id !== action.payload);
          }
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        },
      );
  },
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(apiUrl);
  return response.data;
});

export const fetchUser = createAsyncThunk("users/fetchUser", async (userId: string) => {
  const response = await axios.get(`${apiUrl}/${userId}`);
  return response.data;
});

export const createUser = createAsyncThunk("users/createUser", async (user: User) => {
  const response = await axios.post(apiUrl, user);
  return response.data;
});

export const editUser = createAsyncThunk("users/editUser", async (user: User) => {
  const response = await axios.put(`${apiUrl}/${user.id}`, user);
  return response.data;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (userId:number) => {
  await axios.delete(`${apiUrl}/${userId}`);
  return userId;
});

export default userSlice.reducer;