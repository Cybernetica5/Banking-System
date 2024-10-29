import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cookies from 'js-cookie';
import { 
  faMoneyBillTransfer, faWallet, faGear, 
  faArrowRightFromBracket, faCircleQuestion, 
  faCaretRight, faSackDollar, faPeopleGroup,
  faUsers, faFileInvoiceDollar, faCoins
} from '@fortawesome/free-solid-svg-icons';

import {Routes, Link, useNavigate, Route, Navigate} from 'react-router-dom';
import { logout } from '../../../services/auth';

import './AdminDashboard.css';

import AddCustomers from '../customers/AddCustomers';
import GetCustomerDetails from '../customers/GetCustomerDetails';
import Customers from '../customers/Customers';
import Reports from '../reports/Reports';
import BranchTransactionReport from '../reports/BranchTransactionReport';
import BranchLatePaymentsReport from '../reports/BranchLatePaymentsReport';
import Transactions from '../transactions/Transactions';
import Settings from '../../admin/settings/Settings';
import ApplyFixedDeposit from '../FixedDeposits/fixedDeposits';
import Employee from '../employees/Employees';
import AddEmployeeForm from '../employees/AddEmployees';
import RemoveEmployee from '../employees/removeEmployee';
import UpdateEmployee from '../employees/updateStaffDetails';
import UpdateEmployeeUserDetails from '../employees/updateUserDetails';
import UpdateEmployeeBranch from '../employees/updatebranchDetails';
import CreateAccount from '../accounts/CreateAccount';
import EmployeeLoans from '../../admin/Loans/EmployeeLoans/employeeLoans';
import ManagerLoans from '../../admin/Loans/ManagerLoans/managerLoans';
import Cookies from 'js-cookie';


const DashboardSidebar = () => {
  const [isSidebarClosed, setSidebarClosed] = useState(true);
  const navigate = useNavigate();

  const userName = Cookies.get('username') || 'User'; // Fallback to 'User' if username is not found
  const userRole = Cookies.get('role') || 'employee'; // Fallback to 'employee' if role is not found

  console.log('User:', userName, userRole); //! Debugging

  const toggleSidebar = () => setSidebarClosed(!isSidebarClosed);
  
  const handleLogout = async () => {
    const token = cookies.get('refreshToken');
    if (!token) {
      console.error('\\Logout error: Missing token//');
      return;
    }
    console.log('Token:', token);
    try {
      console.log('Logout request PROCESSING');
      await logout(token);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error.response ? error.response.data : error.message);
      console.error('Token:', token);
    }
  };

  const menuItems = [
    { path: '/admin-dashboard/customers/get-customer-details', icon: faUsers, text: 'Customers' },
    ...(userRole === 'manager' ? [{ path: '/admin-dashboard/employee/add-employee', icon: faPeopleGroup, text: 'Employees' }] : []), // Show only to managers
    { path: '/admin-dashboard/createaccount', icon: faWallet, text: 'Create Account' },
    { path: '/admin-dashboard/transactions', icon: faMoneyBillTransfer, text: 'Transactions' },
    { path: '/admin-dashboard/fixed-deposits', icon: faCoins, text: 'Fixed Deposits' },
    { path: '/admin-dashboard/loans', icon: faSackDollar, text: 'Loans' },
    ...(userRole === 'manager' ? [{ path: '/admin-dashboard/reports/transaction-report', icon: faFileInvoiceDollar, text: 'Reports' }] : []), // Show only to managers
    {path: '/admin-dashboard/employee-loans', icon: faSackDollar, text: 'Employee Loans'},
    {path: '/admin-dashboard/manager-loans', icon: faSackDollar, text: 'Manager Loans'},
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
          <Route path="/" element={<Navigate to="customers/get-customer-details" replace />} />
          <Route path="customers" element={<Customers />}>
            <Route path="get-customer-details" element={<GetCustomerDetails />} />
            <Route path="add-new-customer" element={<AddCustomers />} />
          </Route>
          <Route path="transactions" element={<Transactions />} />

          <Route path="employee" element={<Employee />}>
            <Route path="add-employee" element={<AddEmployeeForm />} />
            <Route path="remove-employee" element={<RemoveEmployee />} />
            <Route path="update-staff-detail" element={<UpdateEmployee />} />
            <Route path="update-staff-user-detail" element={<UpdateEmployeeUserDetails />} />
            <Route path="update-staff-branch-detail" element={<UpdateEmployeeBranch />} />
          </Route>
          <Route path="reports" element={<Reports />}>
            <Route path="transaction-report" element={<BranchTransactionReport />} />
            <Route path="late-loan-payment-report" element={<BranchLatePaymentsReport />} />
          </Route>
          <Route path="settings" element={<Settings />} />
          <Route path="fixed-deposits" element={<ApplyFixedDeposit />} /> 
          <Route path="createaccount" element={<CreateAccount />} />
          <Route path="employee-loans" element={<EmployeeLoans />} />
          <Route path="manager-loans" element={<ManagerLoans />} />
        </Routes>
      </section>
    </div>
  );
};

export default DashboardSidebar;