import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import millify from "millify"
import { Container } from "@mui/material"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import LineChart from "./LineChart"
import Loading from "./Loading"
import { fetchCoin, getCoinHistory } from "../app/cryptoActions"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

const CryptoDetails = () => {
  const { coinId } = useParams()
  const [timePeriod, setTimePeriod] = useState("1y")
  const dispatch = useDispatch()
  const { loading, coin, coinHistory } = useSelector((state) => state.crypto)
  const cryptoDetails = coin?.data?.coin

  useEffect(() => {
    dispatch(fetchCoin(coinId))
    dispatch(getCoinHistory(coinId, timePeriod))
  }, [coinId, dispatch, timePeriod])

  let time = []
  let stats = []
  if (loading) return <Loading />
  else {
    time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"]

    stats = [
      {
        title: "Price to USD",
        value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      },
      { title: "Rank", value: cryptoDetails?.rank },
      {
        title: "24h Volume",
        value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      },
      {
        title: "Market Cap",
        value: `$ ${
          cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
        }`,
      },
      {
        title: "All-time-high(daily avg.)",
        value: `$ ${
          cryptoDetails?.allTimeHigh?.price &&
          millify(cryptoDetails?.allTimeHigh.price)
        }`,
      },
    ]
  }

  return (
    <Container style={{ marginTop: 100 }}>
      <Box className="coin-heading-container">
        <h2 level={2} className="coin-name">
          {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
        </h2>
        <p>
          {cryptoDetails?.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </Box>
      <Box sx={{ minWidth: 320 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Timeperiod</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Timeperiod"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
          >
            {time?.map((date) => (
              <MenuItem value={date} key={date}>
                {date}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={cryptoDetails?.price && millify(cryptoDetails?.price)}
        coinName={cryptoDetails?.name}
      />

      <Box className="stats-container">
        <div className="coin-value-statistics">
          <Box className="coin-value-statistics-heading">
            <h3 className="coin-details-heading">
              {cryptoDetails?.name} Value Statistics
            </h3>
            <p>
              An overview showing the statistics of {cryptoDetails?.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </Box>
          {stats.map(({ title, value }, index) => (
            <Box className="coin-stats" key={index}>
              <p>
                {title} : {value}
              </p>
            </Box>
          ))}
        </div>
      </Box>
    </Container>
  )
}

export default CryptoDetails
