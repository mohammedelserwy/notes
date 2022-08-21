import Root from './Root';
import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

import taskReducer from './store/slice';
import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, taskReducer);

const store = configureStore({
  reducer: {
    task: persistedReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
});

const persistor = persistStore(store);

class App extends React.Component {
  render() {
    console.log(store.getState());
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
