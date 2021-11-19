import { Container } from "@mui/material"
import React from "react"
import moment from "moment"

import { useGetCryptosNewsQuery } from "../services/cryptoNewsApi"

const News = ({ simplified }) => {
  const { data: cryptoNews } = useGetCryptosNewsQuery({
    newsCategory: "Cryptocurrency",
    count: simplified ? 10 : 100,
  })
  console.log(cryptoNews)

  const style = !simplified ? { marginTop: 100 } : null
  return (
    <Container style={style}>
      <p>News</p>
    </Container>
  )
}

export default News
