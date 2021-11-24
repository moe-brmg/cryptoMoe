import {
  getCoinApi,
  getCoinHistoryApi,
  getCoinsApi,
  getStatsApi,
} from "../services/cryptoApi"
import { getCryptoNewsApi } from "../services/cryptoNewsApi"
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

export function asyncActionStart() {
  return {
    type: ASYNC_ACTION_START,
  }
}
export function asyncActionFinish() {
  return {
    type: ASYNC_ACTION_FINISH,
  }
}
export function asyncActionError(error) {
  return {
    type: ASYNC_ACTION_ERROR,
    payload: error,
  }
}

export function fetchCoins(count) {
  return async function (dispatch) {
    dispatch(asyncActionStart())

    try {
      const coins = await getCoinsApi(count)
      dispatch({ type: FETCH_COINS, payload: coins })
    } catch (error) {
      dispatch(asyncActionError(error))
    }
    dispatch(asyncActionFinish())
  }
}

export function fetchCoin(coinId) {
  return async function (dispatch) {
    dispatch(asyncActionStart())

    try {
      const coin = await getCoinApi(coinId)
      dispatch({ type: FETCH_COIN, payload: coin })
    } catch (error) {
      dispatch(asyncActionError(error))
    }
    dispatch(asyncActionFinish())
  }
}

export function getCoinHistory(coinId, timePeriod) {
  return async function (dispatch) {
    dispatch(asyncActionStart())

    try {
      const coinHistory = await getCoinHistoryApi(coinId, timePeriod)
      dispatch({ type: FETCH_COIN_HISTORY, payload: coinHistory })
    } catch (error) {
      dispatch(asyncActionError(error))
    }
    dispatch(asyncActionFinish())
  }
}

export function getCoinNews(count, newsCategory) {
  return async function (dispatch) {
    dispatch(asyncActionStart())

    try {
      const coinNews = await getCryptoNewsApi(count, newsCategory)
      dispatch({ type: FETCH_COIN_NEWS, payload: coinNews })
    } catch (error) {
      dispatch(asyncActionError(error))
    }
    dispatch(asyncActionFinish())
  }
}
export function getCoinStats() {
  return async function (dispatch) {
    dispatch(asyncActionStart())

    try {
      const coinStats = await getStatsApi()
      dispatch({ type: FETCH_COIN_STATS, payload: coinStats })
    } catch (error) {
      dispatch(asyncActionError(error))
    }
    dispatch(asyncActionFinish())
  }
}

export function isEmpty(obj) {
  return typeof obj == "object" && Object.keys(obj).length === 0
}
