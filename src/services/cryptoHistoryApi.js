import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const cryptoHistoryApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "2885c3a350msh9ac9dcb2d584128p11602bjsn6dc312fa5b4a",
}

const baseUrl = "https://coinranking1.p.rapidapi.com/coin"

const createRequest = (url) => ({ url, headers: cryptoHistoryApiHeaders })

export const cryptoHistoryApi = createApi({
  reducerPath: "cryptoHistoryApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`${coinId}/history/${timePeriod}`),
    }),
  }),
})

export const { useGetCryptoHistoryQuery } = cryptoHistoryApi
