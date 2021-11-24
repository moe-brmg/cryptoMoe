import {
  ASYNC_ACTION_ERROR,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_START,
  FETCH_COIN,
  FETCH_COINS,
  FETCH_COIN_HISTORY,
  FETCH_COIN_NEWS,
  FETCH_COIN_STATS,
} from "./cryptoConstants"

const initialState = {
  laoding: false,
  error: null,
  coins: [],
  coin: "",
  news: {},
  stats: {},
}

export default function cryptoReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ASYNC_ACTION_START:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case ASYNC_ACTION_FINISH:
      return {
        ...state,
        loading: false,
      }
    case ASYNC_ACTION_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    case FETCH_COINS:
      return {
        ...state,
        coins: payload,
      }
    case FETCH_COIN:
      return {
        ...state,
        coin: payload,
      }
    case FETCH_COIN_HISTORY:
      return {
        ...state,
        coinHistory: payload,
      }
    case FETCH_COIN_NEWS:
      return {
        ...state,
        news: payload,
      }
    case FETCH_COIN_STATS:
      return {
        ...state,
        stats: payload,
      }
    default:
      return state
  }
}
