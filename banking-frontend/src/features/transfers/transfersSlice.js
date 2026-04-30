import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../api/client";

export const submitTransfer = createAsyncThunk("transfers/submit", async (payload) => {
  const response = await apiClient.post("/transfers", payload);
  return response.data;
});

export const fetchTransactions = createAsyncThunk("transfers/fetchTransactions", async (accountId) => {
  const response = await apiClient.get(`/transactions/${accountId}`);
  return response.data;
});

const transfersSlice = createSlice({
  name: "transfers",
  initialState: {
    lastTransfer: null,
    transactions: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitTransfer.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitTransfer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lastTransfer = action.payload;
      })
      .addCase(submitTransfer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
      });
  }
});

export default transfersSlice.reducer;
