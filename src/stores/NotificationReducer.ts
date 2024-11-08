import { createSlice } from "@reduxjs/toolkit";

const NotificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    notification_type: "",
    visible: false,
  },
  reducers: {
    ShowNotification: (state, action) => {
      state.message = action.payload.message;
      state.notification_type = action.payload.notification_type;
      state.visible = true;
    },
    HideNotification: (state) => {
      state.visible = false;
    },
  },
});

export const { ShowNotification, HideNotification } = NotificationSlice.actions;
export default NotificationSlice.reducer;
