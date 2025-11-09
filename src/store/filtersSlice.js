import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  vehicleType: null,
  equipment: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setVehicleType(state, action) {
      state.vehicleType = action.payload; 
    },
    toggleEquipment(state, action) {
      const key = action.payload; 
      if (state.equipment.includes(key)) {
        state.equipment = state.equipment.filter((item) => item !== key);
      } else {
        state.equipment.push(key);
      }
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setLocation, setVehicleType, toggleEquipment, resetFilters } =
  filtersSlice.actions;

export const selectFilters = (state) => state.filters;

export default filtersSlice.reducer;
