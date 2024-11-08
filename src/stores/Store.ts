import { combineReducers, configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./NotificationReducer";

const RootReducer = combineReducers({
  notification: notificationReducer,
});

const store = configureStore({
  reducer: RootReducer,
});

export default store;
