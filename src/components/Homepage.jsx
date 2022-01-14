import React, { useEffect } from "react"
import millify from "millify"
import { Link } from "react-router-dom"
import Stack from "@mui/material/Stack"
import { useDispatch, useSelector } from "react-redux"
import Loading from "./Loading"
import { Cryptocurrencies, News } from "."
import { Button, Container } from "@mui/material"
import { getCoinStats, isEmpty } from "../app/cryptoActions"

const Homepage = () => {
  const dispatch = useDispatch()
  const { loading, stats } = useSelector((state) => state.crypto)

  useEffect(() => {
    if (isEmpty(stats)) {
      dispatch(getCoinStats())
    }
  }, [dispatch, stats])

  if (loading) return <Loading />

  return (
    <Container style={{ marginTop: 100 }}>
      <h2 className="heading">Global Crypto Stats</h2>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={6}>
        <div className="stat">
          <span className="title">cryptos:</span>
          <span className="value">{stats?.data?.totalCoins}</span>
        </div>
        <div className="stat">
          <span className="title">Exhchanges:</span>
          <span className="value">
            {!isEmpty(stats) && millify(stats?.data?.totalExchanges)}
          </span>
        </div>
        <div className="stat">
          <span className="title">Marketcap:</span>
          <span className="value">
            {!isEmpty(stats) && millify(stats?.data?.totalMarketCap)}
          </span>
        </div>
        <div className="stat">
          <span className="title">24 Vol:</span>
          <span className="value">
            {!isEmpty(stats) && millify(stats?.data?.total24hVolume)}
          </span>
        </div>
        <div className="stat">
          <span className="title">Markets:</span>
          <span className="value">
            {!isEmpty(stats) && millify(stats?.data?.totalMarkets)}
          </span>
        </div>
      </Stack>
      <div className="home-container">
        <h2> Top 10 Cryptocurrencies</h2>
        <Cryptocurrencies simplified />
        <br />
        <Button as={Link} to="/Cryptocurrencies" variant="outlined">
          Show More
        </Button>
      </div>
      <div className="home-container">
        <h2> Latest News</h2>
        <News simplified />
        <br />
        <Button as={Link} to="/News" variant="outlined">
          Show More
        </Button>
      </div>
    </Container>
  )
}

export default Homepage
