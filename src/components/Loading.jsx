import React from "react"
import CircularProgress from "@mui/material/CircularProgress"

import { Container } from "@mui/material"

export default function Loading() {
  return (
    <Container
      style={{
        display: "flex",
        marginTop: 100,
      }}
    >
      <CircularProgress />
    </Container>
  )
}
