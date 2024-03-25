import React, { useEffect } from 'react'
import { Homes } from "../components/homes/Homes"
import Upcomming from "../components/upcomming/Upcomming"
import { useState } from "react"
import { latest, recommended, upcome } from "../dummyData"
import Trending from '../components/trending/Trending'
import {useNavigate} from 'react-router-dom'


export const HomePages = () => {

  //const navigate = useNavigate();
  const [items, setItems] = useState(upcome)
  const [item, setItem] = useState(latest)
  const [rec, setRec] = useState(recommended)

   /*  useEffect(()=>{
      const token = localStorage.getItem('token');
      if(!token){
         navigate('/login');
      }
     },[])*/
  return (

    <>
      <Homes />
      
      <Upcomming items={items} title='Upcomming Movies'/>
      <Upcomming items={item} title='Latest Movies'/>
      <Trending/>
      <Upcomming items={rec} title='Recommended Movies' />
      
    </>
  )
}
