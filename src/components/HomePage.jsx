// import React, { useEffect, useState } from 'react';
// import { useGetCryptosQuery } from '../services/cryptoApi';
// import millify from 'millify';
// import { Typography, Row, Col, Statistic } from 'antd';
// import { Link } from 'react-router-dom';
// import CryptoCurrencies from './CryptoCurrencies';
// import News from './News';

// const { Title } = Typography;

// const HomePage = () => {
//     const { data, isFetching } = useGetCryptosQuery();
//     const [isOnline, setIsOnline] = useState(navigator.onLine);
//     const globalStats = data?.data?.stats;
   
    

//     useEffect(() => {
//         const handleOnlineStatus = () => {
//             setIsOnline(navigator.onLine);
//         };

//         window.addEventListener('online', handleOnlineStatus);
//         window.addEventListener('offline', handleOnlineStatus);

//         return () => {
//             window.removeEventListener('online', handleOnlineStatus);
//             window.removeEventListener('offline', handleOnlineStatus);
//         };
//     }, []);

//     if (!isOnline) return <div>No internet connection...</div>;
//     if (isFetching) return <div>Loading...</div>;

//     return (
//         <>
//             <Title level={2} className='heading'>Global Crypto App</Title>
            
            
           
//                         <Row>
//                     <Col span={12}> <Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
//                 <Col span={12}> <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
//                 <Col span={12}> <Statistic title="Total Coins" value={millify(globalStats.totalCoins)} /></Col>
//                 <Col span={12}> <Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
//                 <Col span={12}> <Statistic title="Total 24h Volumes" value={millify(globalStats.total24hVolume)} /></Col>
//                 <Col span={12}> <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
//             </Row>
                    
                
   
//             <div className="home-heading-container">
//                 <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
//                 <Title level={3} className='show-more'><Link to={'/cryptocurrencies'}>Show More</Link></Title>
//             </div>
//             <CryptoCurrencies simplified />

//             <div className="home-heading-container">
//                 <Title level={2} className='home-title'>Latest Crypto News</Title>
//                 <Title level={3} className='show-more'><Link to={'/news'}>Show More</Link></Title>
//             </div>
//             <News simplified />
//         </>
//     );
// };

// export default HomePage;


import React, { useEffect, useState } from 'react';
import { useGetCryptosQuery } from '../services/cryptoApi';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Button } from 'antd';
import { Link } from 'react-router-dom';
import CryptoCurrencies from './CryptoCurrencies';
import News from './News';

const { Title } = Typography;

const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showMore, setShowMore] = useState(false);
  const globalStats = data?.data?.stats;

  console.log(data);
  

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  if (!isOnline) return <div>No internet connection...</div>;
  if (isFetching) return <div>Loading...</div>;

  return (
    <>
      <Title level={2} className="heading">Global Crypto App</Title>

      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats?.total} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(globalStats?.totalExchanges)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Coins" value={millify(globalStats?.totalCoins)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={millify(globalStats?.totalMarketCap)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volumes" value={millify(globalStats?.total24hVolume)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={millify(globalStats?.totalMarkets)} />
        </Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptocurrencies in the World</Title>
        <Title level={3} className="show-more">
          <Button type="link" onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Show Less' : 'Show More'}
          </Button>
        </Title>
      </div>

      {/* Show either top 10 or all cryptocurrencies */}
      <CryptoCurrencies simplified={!showMore} />

      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>

      <News simplified={!showMore} />
    </>
  );
};

export default HomePage;
