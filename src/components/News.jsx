import React, { useState } from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { Avatar, Card, Col, Row, Select, Typography } from "antd";
import moment from "moment";
import { Option } from "antd/es/mentions";
import { useGetCryptosQuery } from "../services/cryptoApi";
const { Text, Title } = Typography;
const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const options = data?.data?.coins?.map((coin, i) => ({
    value: `${coin.name}`,
    label: `${coin.name}`,
  }));
  if (!cryptoNews?.value) return "Loading...";
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Filter News by Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => {
              if (option.label) {
                return option.label
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
                  ? true
                  : false;
              }
            }}
            options={options}
          />
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card" style={{ textAlign: "left" }}>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img src={news?.image?.thumbnail?.contentUrl} alt="" />
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={news.provider[0]?.image?.thumbnail?.contentUrl}
                    alt=""
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
