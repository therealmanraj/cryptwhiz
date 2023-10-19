import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
} from "@ant-design/icons";

const Navbar = (props) => {
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(
      "Home",
      "/",
      <Link to="/">
        <HomeOutlined>Home</HomeOutlined>
      </Link>
    ),
    getItem(
      "CyptoCurrencies",
      "/cryptocurrencies",
      <Link to="/cryptocurrencies">
        <FundOutlined>CyptoCurrencies</FundOutlined>
      </Link>
    ),
    getItem(
      "News",
      "/news",
      <Link to="/news">
        <BulbOutlined>News</BulbOutlined>
      </Link>
    ),
    // getItem(
    //   "Exchange",
    //   "4",
    //   <Link to="/exchanges">
    //     <MoneyCollectOutlined>Exchange</MoneyCollectOutlined>
    //   </Link>
    // ),
  ];
  return (
    <Menu
      theme="dark"
      items={items}
      defaultSelectedKeys={["1"]}
      mode="horizontal"
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
      selectedKeys={props.selectedKeys}
    />
  );
};

export default Navbar;
