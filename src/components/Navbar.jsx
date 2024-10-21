import React, { useEffect, useState } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';
import logo from "../image/logo.jpg";
const Navbar = () => {

  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);
  useEffect(() => {
    const handleReSize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleReSize);
    handleReSize();
    return () => window.removeEventListener('resize', handleReSize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  return (
    <>
      <div className="nav-container">
        <div className="logo-container">
          <Avatar src={logo} alt='A' size='large' />
          <Typography.Title level={2} className='logo' >
            <Link to="/" > Cryptoverse </Link>
          </Typography.Title>
          <Button className='menu-control-container' onClick={()=>setActiveMenu(!activeMenu)}> <MenuOutlined/> </Button>
        </div>
        {
          activeMenu && (
            <Menu theme='dark' >
              <Menu.Item icon={<HomeOutlined />}>
                <Link to="/" > Home </Link>
              </Menu.Item>
              <Menu.Item icon={<FundOutlined />}>
                <Link to="/CryptoCurrencies" > CryptoCurrency </Link>
              </Menu.Item>
              <Menu.Item icon={<MoneyCollectOutlined />}>
                <Link to="/exchanges" > Exchange </Link>
              </Menu.Item>
              <Menu.Item icon={<BulbOutlined />}>
                <Link to="/News" > News </Link>
              </Menu.Item>
            </Menu>

          )
        }

      </div>
    </>
  )
}

export default Navbar;