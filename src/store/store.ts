import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from './storage'
import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux';

// Existing reducers
import cartSlice from './slices/cartSlice';
import favoritesSlices from './slices/favoritesSlices';
import invoiceSlice from './slices/invoiceSlice';
import catalogSlice from './slices/catalogSlice';
import modelSlice from './slices/modelSlice';

const persistConfig = {
  key: 'root', // key for the persistor
  storage, // define which storage to use
  // Optionally, you can blacklist/whitelist specific reducers
  // blacklist: ['cart'], // reducers to ignore
  // whitelist: ['favorites'], // reducers to persist
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    cart: cartSlice,
    favorites: favoritesSlices,
    invoiceStatus: invoiceSlice,
    catalog: catalogSlice,
    model: modelSlice
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Since we use typescript, lets utilize `useDispatch`
export const useDispatch = () => useDispatchBase<AppDispatch>();

// And utilize `useSelector`
export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);
