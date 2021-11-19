import React, { useState } from "react"
import HTMLReactParser from "html-react-parser"
import { useParams } from "react-router-dom"
import millify from "millify"
import { Container } from "@mui/material"
import { useGetCryptoDetailsQuery } from "../services/cryptoApi"
import { useGetCryptoHistoryQuery } from "../services/cryptoHistoryApi"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import LineChart from "./LineChart"
import Loading from "./Loading"

const CryptoDetails = () => {
  const { coinId } = useParams()
  const [timePeriod, setTimePeriod] = useState("1y")
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod })
  const cryptoDetails = data?.data?.coin

  let time = []
  let stats = []

  time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"]
  if (!isFetching) {
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

    const genericStats = [
      {
        title: "Number Of Markets",
        value: `${cryptoDetails?.numberOfMarkets || 0}`,
      },
      {
        title: "Number Of Exchanges",
        value: `${cryptoDetails?.numberOfExchanges || 0}`,
      },
      // { title: 'Aprroved Supply', value: cryptoDetails?.approvedSupply ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
      {
        title: "Total Supply",
        value: `$ ${
          cryptoDetails?.totalSupply && millify(cryptoDetails?.totalSupply)
        }`,
      },
      {
        title: "Circulating Supply",
        value: `$ ${
          cryptoDetails?.circulatingSupply &&
          millify(cryptoDetails?.circulatingSupply)
        }`,
      },
    ]
  } else {
    return <Loading />
  }

  return (
    <Container style={{ marginTop: 100 }}>
      <Box className="coin-heading-container">
        <h2 level={2} className="coin-name">
          {data?.data?.coin.name} ({data?.data?.coin.slug}) Price
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
