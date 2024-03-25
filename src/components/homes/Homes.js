import React from 'react'
import "./home.css" 
import { useState } from 'react'
import {Home} from './Home'
import { homeData } from '../../dummyData'
export const Homes = () => {
  const [items,setItems] = useState(homeData) 
  console.log(homeData);
  return (
    <>
      <section className='home'>
        <Home items={items} />
        
        
      </section>
      <div className='margin'></div>
    </>
  )
}
 