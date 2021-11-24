import { configureStore } from "@reduxjs/toolkit"
import { cryptoApi } from "../services/cryptoApi"
import { cryptoNewsApi } from "../services/cryptoNewsApi"
import { cryptoHistoryApi } from "../services/cryptoHistoryApi"

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [cryptoHistoryApi.reducerPath]: cryptoHistoryApi.reducer,
  },
})
