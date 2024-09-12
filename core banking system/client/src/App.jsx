import React from 'react';
import UserDashboard from './components/user/dashboard/UserDashboard';
import { BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <UserDashboard />
      </Router>
    </div>
  );
}

export default App;


