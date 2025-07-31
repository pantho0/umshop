import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

export interface IUserState {
  userId: string;
  firstName: string;
  lastName: string;
  role: string;
  image?: string;
  email: string;
  iat: number;
  exp: number;
}

interface IAuthState {
  user: null | IUserState;
  token: string | null;
}

const initialState: IAuthState = {
  user: null,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state: RootState) => state.persisted.auth.user;
export const selectCurrentToken = (state: RootState) =>
  state.persisted.auth.token;
