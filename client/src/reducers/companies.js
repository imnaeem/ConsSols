import { createSlice } from '@reduxjs/toolkit';

const companiesSlice = createSlice({
  name: 'companies',
  initialState: {
    companies: [],
    fetched: false,
  },
  reducers: {
    fetchAllCompanies: (state, action) => {
      state.companies = action.payload;
      state.fetched = true;
    },
    searchedCompanies: (state, action) => {
      state.companies = action.payload;
      state.fetched = true;
    },
  },
});

export const { fetchAllCompanies, searchedCompanies } = companiesSlice.actions;
export default companiesSlice.reducer;
