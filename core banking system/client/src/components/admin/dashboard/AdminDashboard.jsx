import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMoneyBillTransfer, faWallet, faGear, 
  faArrowRightFromBracket, faCircleQuestion, 
  faCaretRight, faSackDollar, faPeopleGroup,
  faUsers, faFileInvoiceDollar, faCoins
} from '@fortawesome/free-solid-svg-icons';

import {Routes, Link, useNavigate, Route} from 'react-router-dom';
import { logout } from '../../../services/auth';

import './AdminDashboard.css';
// import Notification from './notification/Notification';

import AddCustomers from '../customers/AddCustomers';
import BranchTransactionReport from '../reports/BranchTransactionReport';
import Transactions from '../transactions/Transactions';
import Settings from '../../common/settings/Settings';
import CreateAccount from '../employees/CreateAccount';

const DashboardSidebar = () => {
  const [isSidebarClosed, setSidebarClosed] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  console.log('User:', user);
  const userName = user.username || 'User'; // Fallback to 'User' if username is not found
  //const userType = user.type || 'employee'; // Fallback to 'employee' if type is not found
  const userRole = user.role || 'employee'; // Fallback to 'employee' if role is not found
  const toggleSidebar = () => setSidebarClosed(!isSidebarClosed);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '/admin-dashboard/customers', icon: faUsers, text: 'Customers' },
    ...(userRole === 'manager' ? [{ path: '/', icon: faPeopleGroup, text: 'Employees' }] : []), // Show only to managers
    { path: '/admin-dashboard/createaccount', icon: faWallet, text: 'Create Account' },
    { path: '/admin-dashboard/transactions', icon: faMoneyBillTransfer, text: 'Transactions' },
    { path: '/', icon: faCoins, text: 'Fixed Deposits' },
    { path: '/', icon: faSackDollar, text: 'Loans' },
    ...(userRole === 'manager' ? [{ path: '/admin-dashboard/reports', icon: faFileInvoiceDollar, text: 'Reports' }] : []) // Show only to managers
  ];

  return (
    <div className="body">
      <nav className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
        <header>
          <div className="image-text">
            <span className="image">
              <img src="https://cf-vectorizer-live.s3.amazonaws.com/vectorized/2lNO9ykbvoI6dXm568P2qXGrFfQ/2lNOEmLgmd3NUzrav2Oc0zsvjrV.svg" alt="" />
            </span>
            <div className="text logo-text">
              <span className="name">Seychelles</span>
              <span className="name">Trust Bank</span>
            </div>
          </div>
          <FontAwesomeIcon icon={faCaretRight} className='bx bx-chevron-right toggle' onClick={toggleSidebar}/>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              {menuItems.map((item, index) => (
                <li className="nav-link" key={index}>
                  <Link to={item.path} onClick={()=>navigate(item.path)}>
                    <FontAwesomeIcon icon={item.icon} className='icon'/>
                    <span className="text nav-text">{item.text}</span>
                  </Link>
                  {item.subItems && (
                    <ul className="sub-menu">
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link to={subItem.path} onClick={() => navigate(subItem.path)}>
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
              <Link to="/admin-dashboard/settings">
                <FontAwesomeIcon icon={faGear} className='icon'/>
                <span className="text nav-text">Settings</span>
              </Link>
            </li>
            <li>
              <a href="#" onClick={handleLogout}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} className='icon'/>
                <span className="text nav-text">Logout</span>
              </a>
            </li>
            <li>
              <a href="#">
                <FontAwesomeIcon icon={faCircleQuestion} className='icon'/>
                <span className="text nav-text">Get Help</span>
              </a>
            </li>
          </div>
        </div>
      </nav>

      <section className="home">
        <div className="top-bar">
          <div className="text">Welcome, {userName}</div>
          <div className="notification"></div>
        </div>

        <Routes>
          <Route index element={<AddCustomers />} />
          <Route path="customers" element={<AddCustomers />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="reports" element={<BranchTransactionReport />} />
          <Route path="settings" element={<Settings />} />
          <Route path="createaccount" element={<CreateAccount />} />
        </Routes>
      </section>
    </div>
  );
};

export default DashboardSidebar;