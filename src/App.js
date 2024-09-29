import { useState, useEffect } from 'react';
import './index.css';
import { Error } from './Errors'; // Ensure you import Error component
import ProfilePage from './ProfilePage'; // Import ProfilePage component
import LoginForm from './LoginForm'; // Import LoginForm component

function App() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname || '/');


  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPage(path);
  };

  return (
    <div className="App">
      {currentPage === '/' ? (
        <LoginForm navigateTo={navigateTo} />
      ) : currentPage === '/profile' && sessionStorage.getItem('jwt') !== null ? (
        <ProfilePage />
      ) : (
        <Error />
      )}
    </div>
  );
}

export default App;