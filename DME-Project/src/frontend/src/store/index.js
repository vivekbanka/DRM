import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import rolesSlice from './slices/rolesSlice';
import itemsSlice from './slices/itemsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    roles: rolesSlice,
    items: itemsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});
