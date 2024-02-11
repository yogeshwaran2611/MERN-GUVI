import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import ProfileForm from './ProfileForm';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  const [userEmail, setUserEmail] = useState('');

  const handleTogglePage = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleRegistrationSuccess = () => {
    setCurrentPage('login');
  };

  return (
    <div>
      {isLoggedIn ? (
        <ProfileForm userEmail={userEmail.email} />

      ) : (
        <>
          {currentPage === 'login' ? (
            <Login onLogin={handleLogin} onToggle={handleTogglePage} />
          ) : (
            <Register onToggle={handleTogglePage} onRegistrationSuccess={handleRegistrationSuccess} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
