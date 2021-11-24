import { combineReducers } from "redux"
import cryptoReducer from "./cryptoReducer"

const rootReducer = combineReducers({
  crypto: cryptoReducer,
})

export default rootReducer
