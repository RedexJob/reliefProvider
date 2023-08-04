// styles
import GlobalStyles from '@styles/global';
import 'react-grid-layout/css/styles.css';
import './fonts/icomoon/style.css';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { useNavigate } from "react-router-dom";
// components
import AppLayout from './AppLayout';
import {SnackbarProvider} from 'notistack';

// utils
import {ThemeProvider, StyleSheetManager} from 'styled-components';
import {ThemeProvider as MuiThemeProvider, createTheme} from '@mui/material/styles';
import {preventDefault} from '@utils/helpers';
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';

// contexts
import {SidebarContextAPI} from '@contexts/sidebarContext';

// hooks
import {useEffect,useState} from 'react';
import {useInterfaceContext} from '@contexts/interfaceContext';
import {useDispatch} from 'react-redux';

// actions
import {saveToLocalStorage} from '@store/features/layout';
//import Login from '@pages/Login';

const AppLs = () => {

    // const navigateTo = useNavigate();
    const page = document.documentElement;
    const {isDarkMode, isContrastMode, direction} = useInterfaceContext();
    const theme = createTheme({
        direction: direction,
    });
    const cacheRtl = createCache({
        key: 'css-rtl',
        stylisPlugins: [rtlPlugin],
    });

    useDispatch()(saveToLocalStorage());

    useEffect(() => {
        page.setAttribute('dir', direction);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [direction]);

    useEffect(() => {
        isContrastMode && page.classList.add('contrast');
        preventDefault();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // const [isLoggedIn, setIsLoggedIn] = useState(false);

    // // ... Other useEffects ...
  
    // const handleLoginSuccess = () => {
    //   setIsLoggedIn(true);

    //   navigateTo('/dashboard_a')
    // };
  

    return (
        <>
        {/* {isLoggedIn ? ( */}
          <CacheProvider value={cacheRtl}>
            <MuiThemeProvider theme={theme}>
              <ThemeProvider theme={{ theme: isDarkMode ? "dark" : "light" }}>
                <SnackbarProvider
                  maxSnack={3}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: direction === "ltr" ? "right" : "left",
                  }}
                  autoHideDuration={3000}
                >
                  <SidebarContextAPI>
                    <GlobalStyles />
                    <StyleSheetManager stylisPlugins={direction === "rtl" ? [rtlPlugin] : []}>
                      <AppLayout />
                    </StyleSheetManager>
                  </SidebarContextAPI>
                </SnackbarProvider>
              </ThemeProvider>
            </MuiThemeProvider>
          </CacheProvider>
        {/* ) : ( */}
          {/* <Login onSuccess={handleLoginSuccess} /> */}
        {/* )} */}
      </>

    );
}

export default AppLs;
