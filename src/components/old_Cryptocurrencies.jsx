import React, { useEffect, useState } from "react"
import millify from "millify"
import { Link } from "react-router-dom"
import Avatar from "@mui/material/Avatar"
import { useGetCryptosQuery } from "../services/cryptoApi"
import { Card, CardContent, Container, Grid, Input } from "@mui/material"
import Loading from "./Loading"

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const filteredData = cryptosList?.data.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm)
    )
    setCryptos(filteredData)
  }, [cryptosList, searchTerm])

  if (isFetching) return <Loading />
  const style = !simplified ? { marginTop: 100 } : null
  return (
    <Container style={style}>
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
    </Container>
  )
}

export default Cryptocurrencies
