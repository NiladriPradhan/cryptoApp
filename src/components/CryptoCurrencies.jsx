// import React, { useEffect, useState } from 'react';
// import { useGetCryptosQuery } from '../services/cryptoApi';
// import { Card, Col, Row } from 'antd';
// import { Link } from 'react-router-dom';
// import millify from 'millify';

// const CryptoCurrencies = () => {
//   const { data: cryptoList, isFetching } = useGetCryptosQuery();
//   const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);

//   useEffect(() => {
//     setCryptos(cryptoList?.data?.coins);
//   }, [cryptoList]);

//   if (isFetching) return <h1>Loading...</h1>;

//   return (
//     <>
//       <Row gutter={[10, 10]} className="crypto-card-container">
//         {cryptos?.map((curElem) => (
//           <Col xs={24} sm={12} lg={6} className="crypto-card" key={curElem?.uuid}>
//             {/* Navigate to the details page of the clicked cryptocurrency */}
           
//             <Link to={`/crypto/${curElem?.uuid}`}>
            
//               <Card
//                 title={`${curElem.rank}. ${curElem.name}`}
//                 extra={<img className="crypto-image" src={curElem.iconUrl} alt={curElem.name} />}
//               >
//                 <p>Price: {millify(curElem.price)} </p>
//                 <p>Market Cap: {millify(curElem.marketCap)} </p>
//                 <p>Change: {millify(curElem.change)}% </p>
//               </Card>
//             </Link>
//           </Col>
//         ))}
//       </Row>
//     </>
//   );
// };

// export default CryptoCurrencies;



import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  

  // console.log(cryptos);
  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);
    
    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >

            {/* Note: Change currency.id to currency.uuid  */}
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
