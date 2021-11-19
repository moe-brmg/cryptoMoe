import { Container } from "@mui/material"
import React from "react"
import { Line } from "react-chartjs-2"

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = []
  const coinTimestamp = []

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory?.data?.history[i].price)
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    )
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "# of Votes",
        data: coinPrice,
        fill: false,
        backgroundColor: "#000",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <>
      <h2>{coinName} Price Chart</h2>
      <Container>
        <h5>{coinHistory?.data?.change} %</h5>
        <h5>
          Current {coinName} Price $ {currentPrice}{" "}
        </h5>
        <Line data={data} options={options} />
      </Container>
    </>
  )
}

export default LineChart
