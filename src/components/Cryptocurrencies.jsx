import React, { useEffect, useState } from "react"
import millify from "millify"
import { Link } from "react-router-dom"
import Avatar from "@mui/material/Avatar"
import { Card, CardContent, Grid, Input } from "@mui/material"
import Loading from "./Loading"
import { useDispatch, useSelector } from "react-redux"
import { fetchCoins } from "../app/cryptoActions"

const Cryptocurrencies = ({ simplified }) => {
  const count = 100
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const dispatch = useDispatch()
  const { loading, coins } = useSelector((state) => state.crypto)

  useEffect(() => {
    if (coins.length < 1) dispatch(fetchCoins(count))
  }, [coins.length, count, dispatch])

  useEffect(() => {
    const filteredData = coins?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm)
    )
    simplified
      ? setCryptos(filteredData?.slice(0, 10))
      : setCryptos(filteredData)
  }, [coins?.data?.coins, searchTerm, simplified])

  if (loading) return <Loading />

  const style = !simplified ? { marginTop: 100 } : null

  return (
    <div style={style}>
      {!simplified && (
        <div className="search-crypto" style={{ marginBottom: 20 }}>
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Grid container spacing={2}>
        {cryptos?.map((coin) => (
          <Grid item xs={12} sm={6} lg={4} className="cypto-card" key={coin.id}>
            <Link to={`./crypto/${coin.id}`}>
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={6}>
                      <h4>{`${coin.rank}. ${coin.name}`}</h4>
                    </Grid>
                    <Grid item xs={6}>
                      <Avatar
                        src={coin.iconUrl}
                        style={{ marginLeft: "auto" }}
                      />
                    </Grid>
                  </Grid>

                  <p>Price: {millify(coin.price)}</p>
                  <p>MarketCap: {millify(coin.marketCap)}</p>
                  <p>Daily Change: {millify(coin.change)}</p>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Cryptocurrencies
