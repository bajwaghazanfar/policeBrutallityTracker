import React, { useState } from 'react'
import DeckGL from '@deck.gl/react';
import {StaticMap} from 'react-map-gl';
import {ScatterplotLayer} from 'deck.gl';
import {HexagonLayer} from 'deck.gl';
import Data from './convertcsv.json'
import styles from './Map.module.css'
import close from './close.png'
import {motion}from 'framer-motion'
import {BrowserView,MobileView,isBrowser,isMobile} from "react-device-detect";


const Map=({theme})=>{
  const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYmFqd2FnaGF6YW5mYXIiLCJhIjoiY2tiM3RjOHN5MDk1dDJzbnNncm5zaXNuaCJ9.x_Aq7hzAavuzzjftlrwjmw';
  const[showPopup,setShowPopUp]=useState(false)
  const[showToolTip,setshowToolTip]=useState(true)
  const[showModal,setShowModal]=useState(true)

  const sourceData=Data



  const scatterplot= new ScatterplotLayer({
    id:'scatterplot',
    data:sourceData,
    opacity: 0.8,
    filled: true,
    radiusMinPixels: 2,
    radiusMaxPixels: 5,
    getPosition: d => [parseFloat(d.longitude), parseFloat(d.latitude)],
    getFillColor:d=>d.Race=='Black'?[200, 0, 40, 150]
    :d.Race=='White'?[200, 100, 40, 150]
    :d.Race=='Hispanic'?[255,255,51]
    :d.Race!='White'&&'Black'&&'Hispanic'?[51,255,102,0.2]:console.log(null),
    pickable:true,
    onHover:({object,x,y})=>{
      const el=document.getElementById('tooltip')
      console.log(x)
      if(object){
      if(isBrowser){
        const{Image}=object
        const{Name}=object
        const{Race}=object
        const{Cause}=object
        const{Age}=object
        const{latitude}=object
        const{longitude}=object
        const{Description}=object
        const{Link}=object
        el.innerHTML=`
        <img src=${Image} alt='Not Present'/>
        <h1>${Name}</h1>
        <p>Age:${Age}</p>
        <p>Race:${Race}</p>
        <p>Cause Of Death:${Cause}</p>
        <h2>Click for more info!</h2>
        <hr></hr>

        `
        el.style.opacity=0.9
        el.style.left=x+'px';
        el.style.top=y+'px'
      }else{console.log()}
        
      }else{
        el.style.opacity=0
      }
    },
    onClick:({x,y,object})=>{
      const elements=document.getElementById('mobile')
      setShowPopUp(true)
      setshowToolTip(false)
      if(object){
          const{Image}=object
          const{Name}=object
          const{Race}=object
          const{Cause}=object
          const{Age}=object
          const{latitude}=object
          const{longitude}=object
          const{Description}=object
          const{Link}=object
          const{Unarmed}=object
          
          elements.innerHTML=`
          <img src=${Image} alt='Not Present'/>
          <button ${onclick=function(){
            setShowPopUp(false)
          }}>X</button>
          <h1>${Name}</h1>
          <p>Age:${Age}</p>
          <p>Race:${Race}</p>
          <p>Armed:${Unarmed}</p>
          <p>Cause Of Death:${Cause}</p>
          <hr></hr>
          <p>${Description}</p>
          <hr></hr>
          <a href=${Link}>${Link}</a>
          `
      }else{
        console.log("asd")
      }
    }
    
    
  })
console.log(showToolTip)

  // Initial viewport settings
const initialViewState = {
  longitude: -100.0,
  latitude: 40.0,
  zoom: 4,
  pitch: 0,
  bearing: 0,
  
};
showPopup?console.log("showpop"):console.log("na")







    return(
      <motion.div 
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{duration:5}}
      
      >
      <DeckGL
        initialViewState={initialViewState}
        style={{overflow:'hidden'}}
        controller={true}
        layers={[scatterplot]}
        getCursor={({isDragging})=>isDragging?'crosshair':'crosshair'}
        
      >
        <StaticMap 
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} 
        mapStyle={theme=='dark'?'mapbox://styles/mapbox/dark-v10':'mapbox://styles/mapbox/light-v10'}
        id="map-container"
        />
        <motion.div className={styles.info}>
          Click on a point to view the article!
        
        </motion.div>
        <div className={styles.modal} style={showModal?{opacity:1}:{opacity:0}}>
      <h1>Red represents black deaths</h1>
      <h1>Orange represents white deaths</h1>
      <h1>Yellow represents other deaths</h1>
      {isBrowser?<h4>Hover over any point to get more info!</h4>:<h4>Click on any point for more info</h4>}
      <button>X</button>
          
        </div>
        <div id="mobile" className={styles.mobile}style={showPopup?{opacity:1}:{opacity:0}}></div>
        <div id="tooltip"className={styles.tooltip}style={showToolTip?{opacity:0.9}:{opacity:0}}></div>
        
      </DeckGL>
    </motion.div>
 
    )
}

export default Map