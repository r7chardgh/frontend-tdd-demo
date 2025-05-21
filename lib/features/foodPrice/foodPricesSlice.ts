import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FoodPrice } from '@/lib/definition';
import axiosInstance from '@/lib/axios';

// Define the state interface
interface FoodPriceState {
  data: FoodPrice | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: FoodPriceState = {
  data: null,
  status: 'idle',
  error: null,
};

// Async thunk for fetching food price data
export const fetchFoodPrices = createAsyncThunk<FoodPrice, void, { rejectValue: string }>(
  'foodPrice/fetchFoodPrices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('https://api.hkma.gov.hk/public/hkimr/food-price');
      if (response.status!==200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: FoodPrice = await response.data;
      
      if (!data.header.success || data.header.err_code !== '0000') {
        return rejectWithValue(data.header.err_msg || 'Failed to fetch food prices');
      }
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

// Create the slice
const foodPriceSlice = createSlice({
  name: 'foodPrice',
  initialState,
  reducers: {
    resetFoodPriceState: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodPrices.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFoodPrices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchFoodPrices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch food prices';
      });
  },
});

// Export actions
export const { resetFoodPriceState } = foodPriceSlice.actions;

// Export reducer
export default foodPriceSlice.reducer;