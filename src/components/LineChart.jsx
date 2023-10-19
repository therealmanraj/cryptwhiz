import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import moment from "moment";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 5) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(
      moment.unix(coinHistory?.data?.history[i].timestamp).format("DD/MM/YYYY")
    );
  }
  coinPrice.reverse();
  coinTimestamp.reverse();

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        display: true,
        beginAtZero: true, // Hide Y axis labels
      },
      x: {
        display: false,
        beginAtZero: true, // Hide X axis labels
      },
    },
  };

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: `Price of ${coinName} In USD`,
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
        tension: 0.2,
      },
    ],
  };

  return (
    <>
      <Row className="chat-header">
        <Title level={2} className="chart-title">
          {coinName} Price History
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {`${coinHistory?.data?.change}% Current ${coinName} Price: $ ${currentPrice}`}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
