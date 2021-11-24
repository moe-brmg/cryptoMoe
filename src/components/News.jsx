import { Autocomplete, Avatar, Stack, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Card, CardContent, Grid } from "@mui/material"
import moment from "moment"
import { useDispatch, useSelector } from "react-redux"
import { fetchCoins, getCoinNews } from "../app/cryptoActions"
import Loading from "./Loading"
import CardMedia from "@mui/material/CardMedia"
import placeholderImage from "../assests/news.jpg"

const News = ({ simplified }) => {
  const count = 40
  const [category, setCategory] = useState("cryptocurrency")
  const { news, loading, coins } = useSelector((state) => state.crypto)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCoinNews(count, category))
    if (coins.length < 1) dispatch(fetchCoins(100))
  }, [category, coins.length, dispatch])
  console.log("news")

  if (loading) return <Loading />

  const style = !simplified ? { marginTop: 100 } : null
  return (
    <div style={style}>
      {!simplified && (
        <Autocomplete
          disablePortal
          value={category}
          onChange={(event, newValue) => {
            setCategory(newValue)
          }}
          id="combo-box-demo"
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Search" />}
          options={
            coins.length !== 0
              ? [
                  ...coins?.data?.coins?.map((coin) => coin.name),
                  "cryptocurrency",
                ]
              : ["cryptocurrency"]
          }
        />
      )}
      <br />
      <Grid container spacing={2}>
        {(simplified ? news?.value?.slice(16) : news?.value)?.map(
          (item, index) => (
            <Grid item xs={12} sm={6} lg={4} className="cypto-card" key={index}>
              <a href={item?.url} target="_blank" rel="noreferrer">
                <Card>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={8}>
                        <h4>{item?.name}</h4>
                      </Grid>
                      <Grid item xs={4}>
                        <CardMedia
                          component="img"
                          height="120"
                          image={
                            item?.image?.thumbnail?.contentUrl ||
                            placeholderImage
                          }
                          alt={item?.name}
                          style={{ padding: 5 }}
                        />
                      </Grid>
                    </Grid>
                    <p>
                      {item.description.length > 250
                        ? `${item.description.substring(0, 250)} ...`
                        : item.description}
                    </p>

                    <Stack direction="row" spacing={2}>
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          item.provider[0]?.image?.thumbnail?.contentUrl ||
                          placeholderImage
                        }
                      />
                      <p style={{ marginTop: "auto", marginBottom: "auto" }}>
                        {moment(item.datePublished).startOf("ss").fromNow()}
                      </p>
                    </Stack>
                  </CardContent>
                </Card>
              </a>
            </Grid>
          )
        )}
      </Grid>
    </div>
  )
}

export default News
