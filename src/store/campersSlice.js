import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCampers, getCamperById } from "../services/campersApi";


export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async ({ page = 1, limit = 4 } = {}, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const filters = state.filters;

      const params = { page, limit };

      
      if (filters.location) {
        params.location = filters.location;
      }

    
      if (filters.vehicleType) {
        params.form = filters.vehicleType; 
      }

     
      if (Array.isArray(filters.equipment) && filters.equipment.length > 0) {
        filters.equipment.forEach((key) => {
          params[key] = true;
        });
      }

      const campersArray = await getCampers(params);

      return { data: campersArray, page, limit };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch campers");
    }
  }
);


export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await getCamperById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch camper");
    }
  }
);

const initialState = {
  items: [],
  current: null,
  isLoading: false,
  error: null,
  page: 1,
  limit: 4,
  hasMore: true,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    clearCurrent(state) {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchCampers.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;

        const { page } = action.meta.arg || {};
        if (!page || page === 1) {
          state.items = [];
          state.hasMore = true;
          state.page = 1;
        }
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;

        const { data, page, limit } = action.payload;
        state.page = page;
        state.limit = limit;

        const incoming = data || [];

        if (page === 1) {
          state.items = incoming;
        } else {
          state.items = [...state.items, ...incoming];
        }

        if (incoming.length < limit) {
          state.hasMore = false;
        }
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchCamperById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.current = null;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.current = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrent } = campersSlice.actions;

export const selectCampers = (state) => state.campers.items;
export const selectCurrentCamper = (state) => state.campers.current;
export const selectCampersLoading = (state) => state.campers.isLoading;
export const selectCampersError = (state) => state.campers.error;
export const selectCampersPage = (state) => state.campers.page;
export const selectCampersHasMore = (state) => state.campers.hasMore;

export default campersSlice.reducer;
