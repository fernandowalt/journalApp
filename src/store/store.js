import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { authReducer } from "../components/reducers/authReducer";
import { uiReducer } from "../components/reducers/uiReducer";
import { configureStore } from '@reduxjs/toolkit'


const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({ 
  auth: authReducer, 
  ui: uiReducer 
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default configureStore({
  reducer:reducers
})
