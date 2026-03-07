import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRoles, createRole, updateRole, deleteRole } from '../../api';

// Async thunks
export const fetchRoles = createAsyncThunk(
  'roles/fetchRoles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRoles();
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch roles');
    }
  }
);

export const addRole = createAsyncThunk(
  'roles/addRole',
  async (roleData, { rejectWithValue }) => {
    try {
      const response = await createRole(roleData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to create role');
    }
  }
);

export const editRole = createAsyncThunk(
  'roles/editRole',
  async ({ id, roleData }, { rejectWithValue }) => {
    try {
      const response = await updateRole(id, {...roleData});
      return { id, updatedRole: {...roleData} };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update role');
    }
  }
);

export const removeRole = createAsyncThunk(
  'roles/removeRole',
  async (id, { rejectWithValue }) => {
    try {
      await deleteRole(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to delete role');
    }
  }
);

// Initial state
const initialState = {
  roles: [],
  isLoading: false,
  error: null,
  selectedRole: null,
  isEditing: false,
};

// Slice
const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
    setEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    clearSelectedRole: (state) => {
      state.selectedRole = null;
      state.isEditing = false;
    },
    addRoleToState: (state, action) => {
      // This is handled by the addRole.fulfilled reducer
    },
    updateRoleInState: (state, action) => {
      // This is handled by the editRole.fulfilled reducer
    },
  
  },
  extraReducers: (builder) => {
    builder
      // Fetch roles
      .addCase(fetchRoles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roles = action.payload;
        state.error = null;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Add role
      .addCase(addRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roles.push(action.payload);
        state.error = null;
      })
      .addCase(addRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Edit role
      .addCase(editRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editRole.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id, updatedRole } = action.payload;
        // Try both id and roleID to handle different data structures
        const index = state.roles.findIndex(role => 
          role.id === id || role.roleID === id
        );
        if (index !== -1) {
          // Merge the updated role with the existing role to preserve all properties
          state.roles[index] = { ...state.roles[index], ...updatedRole };
        }
        state.selectedRole = null;
        state.isEditing = false;
        state.error = null;
      })
      .addCase(editRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Remove role
      .addCase(removeRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeRole.fulfilled, (state, action) => {
        state.isLoading = false;
        // Try both id and roleID to handle different data structures
        state.roles = state.roles.filter(role => 
          role.id !== action.payload && role.roleID !== action.payload
        );
        state.error = null;
      })
      .addCase(removeRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  clearError, 
  setSelectedRole, 
  setEditing, 
  clearSelectedRole
} = rolesSlice.actions;

// Selectors
export const selectRoles = (state) => state.roles.roles;
export const selectRolesLoading = (state) => state.roles.isLoading;
export const selectRolesError = (state) => state.roles.error;
export const selectSelectedRole = (state) => state.roles.selectedRole;
export const selectIsEditing = (state) => state.roles.isEditing;

export default rolesSlice.reducer;
