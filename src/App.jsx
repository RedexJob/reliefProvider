// styles
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// components
import AppLayout from './AppLayout';
// actions
import {saveToLocalStorage} from '@store/features/layout';
import Login from '@pages/Login';
import AppLs from '../src/AppLs'
const App = () => {

    const navigateTo = useNavigate();
   


    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

    // ... Other useEffects ...
  
    const handleLoginSuccess = () => {
      setIsLoggedIn(true);

      navigateTo('/dashboard_a')
    };
  

    return (

    //  <AppLs/>
        <>
        {isLoggedIn ? (
          <AppLs/>
        ) : (
          <Login onSuccess={handleLoginSuccess} />
        )}
      </>

    );
}

export default App;
