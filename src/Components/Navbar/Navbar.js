import React,{useEffect} from 'react'
import styles from './Navbar.module.css'
import {Link,Route}from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
import {motion}from 'framer-motion'
const Navbar=({theme,setTheme})=>{

    const setMode=(mode)=>{
        window.localStorage.setItem('theme',mode)
        const localTheme=window.localStorage.getItem('theme')
        setTheme(localTheme)
    }
    console.log(window.localStorage.getItem('theme'))

    const themeToggler = () => {
        theme === 'light' ? setMode('dark') : setMode('light')
    }
    useEffect(()=>{
        
    })


    




    return(
        <motion.nav className={styles.navbar}id="navbar" initial={{y:-250}} animate={{y:-10}} >
            <ul className={styles.navbarNav}>
            <li><motion.button  animate={{fontSize:20}} onClick={themeToggler}>{theme==='light'?<FontAwesomeIcon icon={faMoon}style={{color:'black'}}/>:<FontAwesomeIcon icon={faLightbulb}/>}</motion.button></li>
                <Link to="/"><li className={styles.navItem}><motion.button animate={{fontSize:20}}>Home</motion.button></li></Link>
                <Link to="/map"><li className={styles.navItem}><motion.button animate={{fontSize:20}}>Map</motion.button></li></Link>
                <li className={styles.navItem}><motion.button animate={{fontSize:20}}><a href="https://linktr.ee/bajwa_ghazanfar" style={{textDecoration:'underline',fontWeight:'bold'}}>More Info</a></motion.button></li>
                <li className={styles.navItem}><motion.button animate={{fontSize:20}}><a href="https://www.linkedin.com/in/ghazanfar-bajwa-b183531a7/">Contact Me</a></motion.button></li>
            </ul>
        </motion.nav>
    )
}
export default Navbar