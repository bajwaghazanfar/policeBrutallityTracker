import React,{useState,useEffect} from 'react'
import styles from './LandingPage.module.css'
import logo from './Images/logo.png'
import {Link,Route}from 'react-router-dom'
import {motion}from 'framer-motion';
import {Doughnut,Bar,Line,Pie}from 'react-chartjs-2'
import Data from './ChartData.json'
import { FormControl, NativeSelect } from '@material-ui/core';
const LandingPage=({theme})=>{
    const[choice,setChoice]=useState('')
    const[chartData,setChartData]=useState(null)

   //Styling For Theme Mode Button
    let style;
    theme=='dark'?style={filter:'brightness(100)',}:style={filter:'brightness(0)',}
  //Chart

  //Get State Department
  const handleChange=e=>{
      setChoice(e.target.value)
  }
  const getChartData=choice!=''?Data.filter(fil=>fil.PD===choice):console.log()
  let answers=[]
  getChartData!=undefined?getChartData.map(map=>answers.push(map.Blackn,map.Whiten,map.Hispanicn,map.Asiann)):console.log()
  const PieChart=
  getChartData!=undefined?
<motion.div
initial={{x:'-100vw'}}
animate={{x:0}}
transition={{type:'spring'}}

>
  <Doughnut
  data={{
      labels:['Black','White','Hispanic','Asian'],
      datasets:[{
          label:'Deaths',
          backgroundColor:[
            'rgba(0, 0, 255, 0.5)',
            'rgba(255, 0, 0, 0.5)',
            'rgba(0, 255, 0, 0.5)',
            'rgba(247, 202, 24, 1)'
        ],
        data:answers,


      }],
      options:{
          labels:{
              defaultFontFamily:'Helvetica'
          }
      }
  }}/></motion.div>
  :<div></div>

  const comparison=getChartData!=undefined?
<motion.div 
initial={{x:'-100vw'}}
animate={{x:0}}
transition={{type:'spring'}}
><h2>A Black person is<h1 style={{color:'#CD5C5C'}}>{(answers[0]/answers[1]).toFixed(2)}X</h1>more likely to be killed than a White person</h2></motion.div>:
  console.log()
  
getChartData!=undefined?getChartData.map(map=>console.log(map.Blackn,map.Whiten,map.Hispanicn)):console.log()


  


    return(
<motion.div 
className={styles.wrapper}
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:1}}

>
        <header>
            <motion.img src={logo}
            alt="none"
            className={styles.logo}
            style={style}
            
            />
            <h1>Relinquish Police Brutallity and it's corrupt vices</h1><br/><h1>#JUSTICE</h1>
        </header>
        <main>
            The evil outweighs the good in the world.<br></br>
            The dark enveloping the light.<br/>
            The rich steal from the poor.<br/>
            Justice is never served, to the innocent,the downtrodden.<br/>
            Instead they are served injustice,hate and death all on a hot plate.<br/>
            <hr></hr>
            <div style={{textDecoration:'bold'}}>Track the crimes inflicted upon the citizens of America by the so-called system that is meant to protect them.</div>
            <hr></hr>
            
        </main>
        <h1 style={{textAlign:'center',color:'#CD5C5C',textDecoration:'underline'}}>Track Police Department Killings</h1>
        <motion.div 
        className={styles.Picker}
        initial={{x:'-100vw'}}
        animate={{x:0}}
        >
        <FormControl id="picker">
            <NativeSelect onChange={handleChange}>
                <option value="">Select Department</option>
                {Data.map((map,i)=>(
                    <option value={map.PD}key={i}>{map.PD}</option>
                ))}
            </NativeSelect>
        </FormControl>
        </motion.div>
        <div 
        className={styles.Chart}
         >
            {PieChart}
            {comparison}
        </div>
        <motion.div
        className={styles.LinkToMap}
        initial={{x:'-100vw'}}
        animate={{x:0}}
        transition={{type:'spring'}}
        
        
        >
            {getChartData?<Link to="/map"><button>View Map</button></Link>:console.log()}
        </motion.div>
</motion.div>
    )
}
export default LandingPage