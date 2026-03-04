import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getItems, createItem } from '../../api';

// Async thunks
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getItems();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch items');
    }
  }
);

export const addItem = createAsyncThunk(
  'items/addItem',
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await createItem(itemData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create item');
    }
  }
);


// Initial state
const initialState = {
  items: [],
  isLoading: false,
  error: null,
  selectedItem: null,
  isEditing: false,
};

// Slice
const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    clearSelectedItem: (state) => {
      state.selectedItem = null;
      state.isEditing = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch items
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add item
      .addCase(addItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export const { 
  clearError, 
  setSelectedItem, 
  setEditing, 
  clearSelectedItem 
} = itemsSlice.actions;

// Selectors
export const selectItems = (state) => state.items.items;
export const selectItemsLoading = (state) => state.items.isLoading;
export const selectItemsError = (state) => state.items.error;
export const selectSelectedItem = (state) => state.items.selectedItem;
export const selectIsEditingItem = (state) => state.items.isEditing;

export default itemsSlice.reducer;
