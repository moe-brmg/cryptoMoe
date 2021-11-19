import React from "react"
import millify from "millify"
import { Link } from "react-router-dom"
import Stack from "@mui/material/Stack"

import { useGetCryptosQuery } from "../services/cryptoApi"
import Loading from "./Loading"
import { Cryptocurrencies, News } from "."
import { Button, Container } from "@mui/material"

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10)

  const globalStats = data?.data?.stats

  if (isFetching) return <Loading />

  return (
    <Container style={{ marginTop: 100 }}>
      <h1 className="heading">Global Crypto Stats</h1>
      <Stack direction="row" spacing={6}>
        <div className="stat">
          <span className="title">Total Cryptocurrencies:</span>
          <span className="value">{globalStats?.total}</span>
        </div>
        <div className="stat">
          <span className="title">Total Exhchanges:</span>
          <span className="value">{millify(globalStats?.totalExchanges)}</span>
        </div>
        <div className="stat">
          <span className="title">Total Marketcap:</span>
          <span className="value">{millify(globalStats?.totalMarketCap)}</span>
        </div>
        <div className="stat">
          <span className="title">24 Vol:</span>
          <span className="value">{millify(globalStats?.total24hVolume)}</span>
        </div>
        <div className="stat">
          <span className="title">Total Markets:</span>
          <span className="value">{millify(globalStats?.totalMarkets)}</span>
        </div>
      </Stack>
      <div className="home-container">
        <h2> Top 10 Cryptocurrencies</h2>
        <Cryptocurrencies simplified />
        <Button as={Link} to="/Cryptocurrencies" variant="outlined">
          Show More
        </Button>
      </div>
      <div className="home-container">
        <h2> Latest News</h2>
        <News simplified />
        <Button as={Link} to="/News" variant="outlined">
          Show More
        </Button>
      </div>
    </Container>
  )
}

export default Homepage
