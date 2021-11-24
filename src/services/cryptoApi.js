var axios = require("axios").default

export async function getStatsApi() {
  var options = {
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/stats`,
    headers: {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": "2885c3a350msh9ac9dcb2d584128p11602bjsn6dc312fa5b4a",
    },
  }

  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function getCoinsApi(count = 100) {
  var options = {
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coins?limit=${count}`,
    headers: {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": "2885c3a350msh9ac9dcb2d584128p11602bjsn6dc312fa5b4a",
    },
  }

  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export async function getCoinApi(coinId = 1) {
  var options = {
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
    headers: {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": "2885c3a350msh9ac9dcb2d584128p11602bjsn6dc312fa5b4a",
    },
  }

  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export async function getCoinHistoryApi(coinId, timePeriod) {
  var options = {
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${coinId}/history/${timePeriod}`,
    headers: {
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "x-rapidapi-key": "2885c3a350msh9ac9dcb2d584128p11602bjsn6dc312fa5b4a",
    },
  }

  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
