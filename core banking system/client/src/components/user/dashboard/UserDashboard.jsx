import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMoneyBillTransfer, faWallet, faClockRotateLeft, faGear, 
  faHouseUser, faArrowRightFromBracket, faCircleQuestion, 
  faCaretRight, faSackDollar
} from '@fortawesome/free-solid-svg-icons';

import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/auth';

import './UserDashboard.css';
import Notification from './notification/Notification';
import Home from '../home/Home';
import MoneyTransfer from '../MoneyTransfer/MoneyTransfer1';

import AccountDetails from '../account-details/AccountDetails';
import TransactionHistory from '../transaction-history/TransactionHistory';
import Loans from '../loans/Loans';
import ApplyLoan from '../loans/ApplyLoan';
import LoanPayment from '../loans/LoanPayment';
import LoanDetails from '../loans/LoanDetails';
import Settings from '../../common/settings/Settings';

const DashboardSidebar = () => {
  const [isSidebarClosed, setSidebarClosed] = useState(true);
  const [userName, setUserName] = useState('User'); // Set initial fallback value
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user?.username) {
      setUserName(user.username);
    }
  }, []); // Fetch user data once when component mounts

  const toggleSidebar = () => setSidebarClosed(!isSidebarClosed);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/dashboard/home', icon: faHouseUser, text: 'Home' },
    { path: '/dashboard/account-details', icon: faWallet, text: 'Account Details' },
    { path: '/dashboard/money-transfer', icon: faMoneyBillTransfer, text: 'Money Transfer' },
    { path: '/dashboard/transaction-history', icon: faClockRotateLeft, text: 'Transaction History' },
    { 
      path: '/dashboard/loans', 
      icon: faSackDollar, 
      text: 'Loans',
      subItems: [
        { path: '/dashboard/loans/apply', text: 'Apply Loan' },
        { path: '/dashboard/loans/payment', text: 'Loan Payment' },
        { path: '/dashboard/loans/details', text: 'Loan Details' },
      ]
    },
  ];

  return (
    <div className="body">
      <nav className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
        <header>
          <div className="image-text">
            <span className="image">
              <img src="https://cf-vectorizer-live.s3.amazonaws.com/vectorized/2lNO9ykbvoI6dXm568P2qXGrFfQ/2lNOEmLgmd3NUzrav2Oc0zsvjrV.svg" alt="Bank Logo" />
            </span>
            <div className="text logo-text">
              <span className="name">Seychelles</span>
              <span className="name">Trust Bank</span>
            </div>
          </div>
          <FontAwesomeIcon icon={faCaretRight} className='bx bx-chevron-right toggle' onClick={toggleSidebar} />
        </header>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              {menuItems.map((item, index) => (
                <li className="nav-link" key={index}>
                  <Link to={item.path}>
                    <FontAwesomeIcon icon={item.icon} className='icon' />
                    <span className="text nav-text">{item.text}</span>
                  </Link>
                  {item.subItems && (
                    <ul className="sub-menu">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link to={subItem.path}>
                            <span className="text nav-text">{subItem.text}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="bottom-content">
            <li className="nav-link">
              <Link to="/dashboard/settings">
                <FontAwesomeIcon icon={faGear} className='icon' />
                <span className="text nav-text">Settings</span>
              </Link>
            </li>
            <li>
              <a href="#" onClick={handleLogout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} className='icon' />
                <span className="text nav-text">Logout</span>
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faCircleQuestion} className='icon' />
                <span className="text nav-text">Get Help</span>
              </a>
            </li>
          </div>
        </div>
      </nav>

      <section className="home">
        <div className="top-bar">
          <div className="text">Welcome, {userName}</div>
          <div className="notification"><Notification /></div>
        </div>

        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          {/* <Route path="account-details" element={<AccountDetails />} /> */}
          <Route path="money-transfer" element={<MoneyTransfer />} />
          {/* <Route path="transaction-history" element={<TransactionHistory />} /> */}
          <Route path="loans" element={<Loans />}>
            <Route path="apply" element={<ApplyLoan />} />
            <Route path="payment" element={<LoanPayment />} />
            <Route path="details" element={<LoanDetails />} />
          </Route>
          <Route path="settings" element={<Settings />} />
        </Routes>
      </section>
    </div>
  );
};

export default DashboardSidebar;
