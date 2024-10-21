// import React, { useState } from 'react'
// import { useParams } from 'react-router-dom';
// import { useGetCryptoDetailsQuery } from '../services/cryptoApi';

// import { Card } from "antd";

// const CryptoDetails = () => {

//   const { coinId } = useParams();
//   const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
//   const cryptoDetails = data?.data?.coin;

//   const [showMore, setshowMore] = useState(false);
//   const showLessDescription = cryptoDetails?.description?.slice(0, 50);
//   const floatPrice = (number) => {
//     return Math.round(parseFloat(number) * 100) / 100;
//   }
//   return (
//     <>

//       <div>CryptoDetails</div>
//       {/* <h1 level={3} className="coin-details-heading">{cryptoDetails?.name} Value Statistics</h1> */}
//       {/* <Card
//         style={{
//           width: 300,
//         }}
//       >
//         <div style={{ display: "flex", justifyContent:"space-between", alignItems: "center" }}>
//           <h1>{cryptoDetails?.name}</h1>
//           <img src={cryptoDetails?.iconUrl} alt="" width={35} height={35} />
//         </div>
//         <hr style={{marginTop:"7px",width:"100%"}} />
//         <h3>id: {cryptoDetails?.rank}</h3>
//         <p> <span style={{ fontWeight: "bold" }}> Price:</span> {floatPrice(cryptoDetails?.price)}</p>

//         {
//           showMore ? cryptoDetails?.description : showLessDescription + "..."
//         }

//         <button onClick={() => setshowMore(!showMore)}> {showMore ? "showless" : "showMore"} </button>

//       </Card> */}
//       <Card
//       // extra={<img className="crypto-image" src={cryptoDetails?.iconUrl} alt={"no_image"} />}
//       // title={cryptoDetails.name}
//       style={{
//         width:300
//       }}
//       >
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <h1>{cryptoDetails?.name}</h1>
//           <img src={cryptoDetails?.iconUrl} alt="" width={35} height={35} />
//         </div>
//         <hr />
//         <h3>id: {cryptoDetails?.rank}</h3>
//         <p> <span style={{ fontWeight: "bold" }}> Price:</span> {floatPrice(cryptoDetails?.price)}</p>

//         {
//           showMore ? cryptoDetails?.description : showLessDescription + "..."
//         }

//         <button onClick={() => setshowMore(!showMore)}> {showMore ? "showless" : "showMore"} </button>

//       </Card>
//     </>
//   )
// }

// export default CryptoDetails;


import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useGetCryptoDetailsQuery, getCryptoHistoryQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import Loader from './Loader';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import HTMLReactParser from 'html-react-parser';
import { Col, Row, Select, Typography } from 'antd';
import millify from 'millify';
import LineChart from './LineChart';
import LineChartCheck from './LineChartCheck';
const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {

  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />;

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];


  return (
    <>
      <h1>{cryptoDetails?.rank}</h1>
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Title level={2} className="coin-name">
            {data?.data?.coin.name} ({data?.data?.coin.symbol}) Price
          </Title>
          <p>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
        </Col>
        <Select
          defaultValue={"7d"}
          className='select-timeperiod'
          placeholder='Select Time Period'

          onChange={(value) => setTimeperiod(value)}
        >
          {time.map((date, i) => <Option key={i} >{date}</Option>)}
        </Select>

        <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name} />

        <Col className='stats-container'>
          <Col className="coin-value-statistics">
            <Col className='coin-value-statistics-heading'>
              <Title className='coin-details-heading'>
                {cryptoDetails?.name} value Statistics
              </Title>
              <p>
                An overview showing the stats of Bitcoin
              </p>
            </Col>
            {stats.map(({ icon, title, value }) => (
              <Col className='coin-stats'>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>{value}</Text>
              </Col>
            ))}
          </Col>

          <Col className="other-stats-info">
            <Col className='coin-value-statistics-heading'>
              <Title className='coin-details-heading'>
                Other Statistics
              </Title>
              <p>
                An overview showing the stats of Bitcoin
              </p>
            </Col>
            {genericStats.map(({ icon, title, value }) => (
              <Col className='coin-stats'>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>
                <Text className='stats'>{value}</Text>
              </Col>
            ))}
          </Col>
        </Col>
        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">What is {cryptoDetails.name}?</Title>
            {HTMLReactParser(cryptoDetails.description)}
          </Row>

        </Col>
        <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map((link) => (
            <Row className='coin-link' key={link.name}>
              <Title level={5} className='link-name'> {link.type} </Title>
              <a href={link.url} target="_blank" rel="noreferrer" >
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
        <LineChartCheck/>
      </Col>
    </>
  )
}

export default CryptoDetails;




// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi'; // Ensure the correct hook is imported
// import Loader from './Loader';
// import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
// import HTMLReactParser from 'html-react-parser';
// import { Col, Row, Select, Typography } from 'antd';
// import millify from 'millify';
// import LineChart from './LineChart';

// const { Title, Text } = Typography;
// const { Option } = Select;

// const CryptoDetails = () => {
//   const { coinId } = useParams();
//   const [timeperiod, setTimeperiod] = useState('7d');
  
//   // Correctly use the hooks provided by Redux Toolkit Query
//   const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
//   const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod }); // Use the correct hook

//   const cryptoDetails = data?.data?.coin;

//   if (isFetching) return <Loader />;

//   const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

//   const stats = [
//     { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
//     { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
//     { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
//     { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
//     { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
//   ];

//   const genericStats = [
//     { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
//     { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
//     { title: 'Approved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
//     { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
//     { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
//   ];

//   return (
//     <>
//       <h1>{cryptoDetails?.rank}</h1>
//       <Col className="coin-detail-container">
//         <Col className="coin-heading-container">
//           <Title level={2} className="coin-name">
//             {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
//           </Title>
//           <p>{cryptoDetails?.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
//         </Col>
//         <Select
//           defaultValue="7d"
//           className="select-timeperiod"
//           placeholder="Select Time Period"
//           onChange={(value) => setTimeperiod(value)}
//         >
//           {time.map((date, i) => (
//             <Option key={i} value={date}>
//               {date}
//             </Option>
//           ))}
//         </Select>

//         <LineChart
//           coinHistory={coinHistory}
//           currentPrice={millify(cryptoDetails?.price)}
//           coinName={cryptoDetails?.name}
//         />

//         <Col className="stats-container">
//           <Col className="coin-value-statistics">
//             <Col className="coin-value-statistics-heading">
//               <Title className="coin-details-heading">
//                 {cryptoDetails?.name} Value Statistics
//               </Title>
//               <p>An overview showing the stats of {cryptoDetails?.name}.</p>
//             </Col>
//             {stats.map(({ icon, title, value }) => (
//               <Col className="coin-stats" key={title}>
//                 <Col className="coin-stats-name">
//                   <Text>{icon}</Text>
//                   <Text>{title}</Text>
//                 </Col>
//                 <Text className="stats">{value}</Text>
//               </Col>
//             ))}
//           </Col>

//           <Col className="other-stats-info">
//             <Col className="coin-value-statistics-heading">
//               <Title className="coin-details-heading">Other Statistics</Title>
//               <p>An overview showing the stats of {cryptoDetails?.name}.</p>
//             </Col>
//             {genericStats.map(({ icon, title, value }) => (
//               <Col className="coin-stats" key={title}>
//                 <Col className="coin-stats-name">
//                   <Text>{icon}</Text>
//                   <Text>{title}</Text>
//                 </Col>
//                 <Text className="stats">{value}</Text>
//               </Col>
//             ))}
//           </Col>
//         </Col>
//         <Col className="coin-desc-link">
//           <Row className="coin-desc">
//             <Title level={3} className="coin-details-heading">
//               What is {cryptoDetails?.name}?
//             </Title>
//             {HTMLReactParser(cryptoDetails?.description || '')}
//           </Row>
//         </Col>
//         <Col className="coin-links">
//           <Title level={3} className="coin-details-heading">
//             {cryptoDetails?.name} Links
//           </Title>
//           {cryptoDetails?.links?.map((link) => (
//             <Row className="coin-link" key={link.name}>
//               <Title level={5} className="link-name">
//                 {link.type}
//               </Title>
//               <a href={link.url} target="_blank" rel="noreferrer">
//                 {link.name}
//               </a>
//             </Row>
//           ))}
//         </Col>
//       </Col>
//     </>
//   );
// };

// export default CryptoDetails;
