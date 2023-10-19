import { Route, Routes, useLocation } from "react-router-dom";
import { Layout, theme } from "antd";
import {
  Navbar,
  Exchanges,
  Homepage,
  Cryptocurrencies,
  News,
  Cryptodetails,
} from "./components";
import "./App.css";
import { useEffect, useState } from "react";

const { Header, Content, Footer } = Layout;

function App() {
  let location = useLocation();
  const [current, setCurrent] = useState(
    location.pathname === "/" || location.pathname === ""
      ? "/dashboard"
      : location.pathname
  );

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          position: "fixed",
          zIndex: "1",
          width: "100%",
        }}
      >
        <Navbar selectedKeys={[current]} />
      </Header>
      <Layout>
        <Content
          style={{
            margin: "80px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route exact path="/exchanges" element={<Exchanges />} />
              <Route
                exact
                path="/cryptocurrencies"
                element={<Cryptocurrencies />}
              />
              <Route exact path="/crypto/:coinId" element={<Cryptodetails />} />
              <Route exact path="/news" element={<News />} />
            </Routes>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          CryptWhiz ©2023 Created by Manraj Singh
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
