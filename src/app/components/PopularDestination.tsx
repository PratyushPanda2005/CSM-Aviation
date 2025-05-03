import React from 'react'
import Globe from '../../../public/assets/videos/bhautik-patel-MqSkaMxfJQ0-unsplash.jpg'
import Image from 'next/image'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(useGSAP);
const PopularDestination = () => {
    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: "#clip",
                start: "center center",
                end: "+=800 center",
                scrub: 0.5,
                pin: true,
                pinSpacing: true,
              },
        })

        clipAnimation.to(".mask-clip-path", {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
          });
    })

  return (
    <div id='about' className='min-h-screen w-screen'>
        <div className='relative mb-8 mt-36 flex flex-col items-center gap-5'>
            <h2 className='text-sm uppercase md:text-[10px]'>Welcome to CSM Aviation</h2>
            <div className='mt-5 text-center text-4xl uppercase leading-[0.8] md:text-[6rem]'>
                  <b>Popular Destinations</b>
            </div>
            <div className='absolute bottom-[-80dvh] left-1/2 w-full max-w-96 -translate-x-1/2 text-center font-circular-web text-lg md:max-w-[34rem]'>
        <p>Beyond First Class. Beyond Expectation. Safely There.</p>
        <p>Discover seamless and luxurious private jet charters to your global destinations, knowing your journey with CSM Aviation is underpinned by the highest safety standards.</p>
            </div>
        </div>
        <div className='h-dvh w-screen' id='clip'>
            <div className='mask-clip-path absolute left-1/2 top-0 z-20 h-[60vh] w-96 origin-center -translate-x-1/2 overflow-hidden rounded-3xl md:w-[30vw]'>
                <Image src={Globe} alt='' className='absolute left-0 top-0 size-full object-cover'/>
            </div>
        </div>
    </div>
  )
}

export default PopularDestination