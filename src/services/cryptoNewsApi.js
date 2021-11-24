var axios = require("axios").default

export async function getCryptoNewsApi(count = 10, newsCategory) {
  var options = {
    method: "GET",
    url: `https://bing-news-search1.p.rapidapi.com/news/search?q=${newsCategory}&freshness=Day&textFormat=Raw&safeSearch=Off&count=${count}`,
    headers: {
      "x-bingapis-sdk": "true",
      "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
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
