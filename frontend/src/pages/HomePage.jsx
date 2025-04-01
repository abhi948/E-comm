import React from 'react'
import { Navbar } from '../features/navigation/components/Navbar'
import {Footer} from '../features/footer/Footer'
import Banner from '../features/home/Banner'
import HomeComp from '../features/home/HomeComp'
import Motivation from '../features/home/Motivation'

export const HomePage = () => {
  return (
    <>
    <Navbar/>
    <Banner/>
    <HomeComp/>
    <Motivation/>
    <Footer/>
    </>
  )
}
