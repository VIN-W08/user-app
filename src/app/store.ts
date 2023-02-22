import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import uiReducer from '../features/uiSlice';
import userReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['user/setUserInput'],
        ignoredPaths: ['user.userInput.dateOfBirth']
      }
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
