import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface MetaMaskState {
  account: string | null;
  connected: boolean;
  connecting: boolean;
  error: string | null;
}

const initialState: MetaMaskState = {
  account: null,
  connected: false,
  connecting: false,
  error: null,
};

// Async action to connect to MetaMask
export const connectMetaMask = createAsyncThunk(
  "metamask/connect",
  async (_, { rejectWithValue }) => {
    try {
      const { ethereum } = window as any;
      if (!ethereum) throw new Error("MetaMask is not installed");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

const metamaskSlice = createSlice({
  name: "metamask",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(connectMetaMask.pending, (state) => {
        state.connecting = true;
        state.error = null;
      })
      .addCase(connectMetaMask.fulfilled, (state, action) => {
        state.account = action.payload;
        state.connected = true;
        state.connecting = false;
      })
      .addCase(connectMetaMask.rejected, (state, action) => {
        state.connecting = false;
        state.error = action.payload as string;
      });
  },
});

export default metamaskSlice.reducer;
