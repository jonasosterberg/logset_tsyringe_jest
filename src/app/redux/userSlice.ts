// eslint-disable-next-line import/named
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store";

import context from "../../contextIPC/users/userContextApi";

export interface UserData {
  id?: string;
  birthDay: string | null;
  name: string;
  email: string;
  age: number | null;
}

interface UsersState {
  usersList: UserData[];
}

const initialState: UsersState = {
  usersList: [],
};

export const getUsersList = createAsyncThunk("users/allUser", async () => {
  const response: UserData[] = await context.getAllUser();
  return response;
});

export const addUserThunk = createAsyncThunk(
  "users/addUser",
  async (userData: UserData) => {
    const newUser = {
      birthDay: userData.birthDay,
      name: userData.name,
      email: userData.email,
      age: userData.age,
    };
    const response: UserData = await context.addUser(newUser);
    return response;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUser: (state, action: PayloadAction<string>) => {
      context.deleteUser(action.payload)
      if (action.payload) {
        const index = state.usersList.findIndex(
          (user) => user.id === action.payload
        );
        state.usersList.splice(index, 1);
      }
    },
  },

  extraReducers: (builder) => {
    // Add user list to the state array
    builder.addCase(
      getUsersList.fulfilled,
      (state: UsersState, action: PayloadAction<UserData[]>) => {
        const reverseData = [...action.payload].reverse();
        state.usersList = reverseData;
      }
    );

    // Add user to the state array
    builder.addCase(
      addUserThunk.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        console.log("The action payload is", action.payload);

        // const arr =action.payload.concat(state.usersList);
        // const arr = [...action.payload, state.usersList];
        state.usersList = [action.payload, ...state.usersList]
      }
    );
  },
});

export const { deleteUser } = usersSlice.actions;

export const selectUser = (state: RootState) => state.users.usersList;

export default usersSlice.reducer;
