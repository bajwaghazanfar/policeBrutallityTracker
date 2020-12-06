import React,{useState} from 'react';
import Map from './Components/Map/Map'
import styles from './App.module.css'
import Navbar from './Components/Navbar/Navbar'
import LandingPage from './Components/LandingPage/LandingPage'
import {BrowserRouter as Router,Switch,Route}from 'react-router-dom'
import About from './Components/About/About'
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./Components/Themes/globalStyles";
import { lightTheme, darkTheme } from "./Components/Themes/Themes"
import {motion}from 'framer-motion'
function App() {
  const currentTheme=window.localStorage.getItem('theme')
  const [theme, setTheme] = useState(currentTheme);

  return (
    
  <Router>
    <Switch>
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
      <GlobalStyles/>
    <div className={styles.container} >
      <Navbar theme={theme} setTheme={setTheme}/>
      <Route path="/"exact render={(props) => <LandingPage {...props}theme={theme} />}/>
      <Route path="/about"component={About}/>
      <Route path="/Map" render={(props)=><Map{...props} theme={theme}/>}/>
      </div>
      </>
    </ThemeProvider>
      
    </Switch>
  </Router>

  );
}

export default App;
