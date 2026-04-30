import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../api/client";

export const fetchAccounts = createAsyncThunk("accounts/fetchAll", async () => {
  const response = await apiClient.get("/accounts");
  return response.data;
});

export const createAccount = createAsyncThunk("accounts/create", async (payload) => {
  const response = await apiClient.post("/accounts", payload);
  return response.data;
});

const accountsSlice = createSlice({
  name: "accounts",
  initialState: {
    items: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  }
});

export default accountsSlice.reducer;
