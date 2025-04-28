"use client";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import FirstAnimation from "./FirstAnimation";
import Plane from "../../public/assets/videos/plane.png";
import Aviation from "../../public/assets/videos/Aviation.jpeg";
import { animate } from "framer-motion";

export default function Home() {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const planeX = useMotionValue(0);
  
  const planeWidth = 400;
  const cloudWidth = 480;
  const gap = 30; 
  
  
  const stopTriggerPosition = windowWidth / 2 + planeWidth / 2;
  const cloudStopPosition = windowWidth / 2 - cloudWidth / 2;


  // const cloudX = useTransform(planeX, (latest) => {
  //   const followingPosition = latest - cloudWidth - gap;
  //   return latest < stopTriggerPosition ? followingPosition : cloudStopPosition;
  // });

  const cloudX = useMotionValue(0);

useEffect(() => {
  const unsubscribe = planeX.on("change", (latest) => {
    const followingPosition = latest - cloudWidth - gap;

    if (latest < stopTriggerPosition) {
      cloudX.set(followingPosition);
    } else {
      animate(cloudX, cloudStopPosition, {
        type: "spring", // or "tween" for a more linear feel
        stiffness: 100,
        damping: 20,
        mass: 0.5,
      });
    }
  });

  return () => unsubscribe();
}, [planeX, stopTriggerPosition, cloudStopPosition, cloudWidth, gap, cloudX]);


  useEffect(() => {
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="overflow-hidden w-screen bg-white h-screen flex items-center">
        <div className="relative w-full h-full">
          {/* Cloud that follows behind plane and stops in middle */}
          <motion.div 
            style={{ 
              x: cloudX,
              position: 'absolute',
              top: '50%',
              translateY: '-50%',
              zIndex: 10, // Lower than plane
              width: `${cloudWidth}px`,
              height: `${cloudWidth}px`
            }}
          >
            <div id="cloud-clip-path" className="relative w-full h-full">
              <Image 
                src={Aviation} 
                alt="Aviation background" 
                className="w-full h-full opacity-40"
                priority
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4">
                <h1 className="text-center text-4xl font-[700]">Direct Charter to Public</h1>
                <p className="text-black text-center">
                  Located in Central California, we are positioned well to depart from all Northern and Southern California airport locations.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Plane continues moving across screen */}
          <motion.div
            style={{ 
              x: planeX,
              position: 'absolute',
              top: '50%',
              translateY: '-50%',
              zIndex: 20 // Higher than cloud
            }}
            initial={{ x: "-100%" }}
            animate={{ x: "100vw" }}
            transition={{
              duration: 4,
              ease: "linear",
            }}
          >
            <Image 
              src={Plane} 
              alt="Flying plane" 
              className="w-[400px] h-auto" 
              priority
            />
          </motion.div>
        </div>
      </div>
      <FirstAnimation/>
    </>
  );
}