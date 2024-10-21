import './App.css';
import { Router, Link, Routes, Route } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar,HomePage,Exchange,CryptoCurrencies,CryptoDetails,News } from './components';

function App() {
  return (
    <div className="app">
      {/* navbar */}
      <div className="navbar">
        <Navbar />
      </div>
      {/* main */}
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="/exchanges" element={<Exchange />} />
              <Route path="/cryptocurrencies" element={<CryptoCurrencies />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails />} />
              <Route path="/News" element={<News />} />
              <Route path="*" element={ <h1>404 Page..!</h1> } />
            </Routes>
          </div>
        </Layout>

         {/* footer */}
      <div className="footer" >
        <Typography.Title level={5} style={{color:"white",textAlign:"center"}}>
          Cryptoverse <br />
          All rights reserved
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/exchanges">Exchanges</Link>
          <Link to="/News">News</Link>
        </Space>
      </div>
      </div>

     

    </div>
  );
}

export default App;
