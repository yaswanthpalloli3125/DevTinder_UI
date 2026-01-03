import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slices/userSlice"
import feedSlice from "./Slices/feed"
import requestSlice from "./Slices/requestsSlice"
import connectionSlice from "./Slices/connectionSlice"
const appStore = configureStore({
    reducer:{
      user:userSlice,
      feed: feedSlice,
      requests: requestSlice,
      connections:connectionSlice
    }
})

export default appStore;