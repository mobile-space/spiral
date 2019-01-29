import React from "react";
import { AsyncStorage } from "react-native";
import { createAppContainer } from 'react-navigation';
import { Provider, connect } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistCombineReducers } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import reducers from "./app/reducers";
import TabNavigator from "./app/navigation/TabNavigator";

const AppContainer = createAppContainer(TabNavigator);

export const ConnectedRootComponent = (() => {
  const RootComponent = () => <AppContainer />;

  const mapStateToProps = state => ({
    products: state.products
  });

  /* eslint-disable global-require  */
  const { addProduct } = require("./app/actions/products_actions");
  /* eslint-enable global-require  */

  const mapDispatchToProps = {
    addProduct
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(RootComponent);
})();

const App = () => {
  const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["products", "cart"]
  };
  const persistedReducer = persistCombineReducers(persistConfig, reducers);

  const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
  const persistor = persistStore(store);

  // Clear Data
  // persistor.purge();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConnectedRootComponent />
      </PersistGate>
    </Provider>
  );
};

export default App;
