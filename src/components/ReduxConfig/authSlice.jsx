import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  name: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.token = action.payload.token;
      state.name = action.payload.name;
      console.log("Updated state:", state); // Log the updated state

    },
    clearAuth(state) {
      state.token = null;
      state.name = null;
      console.log("State after clearing:", state); // Log the cleared state

    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
