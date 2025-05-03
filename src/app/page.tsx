"use client";

import Features from "./components/Features";
import PopularDestination from "./components/PopularDestination";
import FirstAnimation from "./FirstAnimation";
import SecondAnimation from "./SecondAnimation";


export default function Home() {
 
  return (
    <>
    <FirstAnimation/>
    <SecondAnimation/>
    <FirstAnimation/>
    {/* <ImageGallery/> */}
    <PopularDestination/>
    <Features/>
    </>
  );
}
