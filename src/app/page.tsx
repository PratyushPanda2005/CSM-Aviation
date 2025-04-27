"use client";
import Image from "next/image";
import Plane from "../../public/assets/videos/plane.png";
import Cloud from "../../public/assets/videos/11506812.png";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const planeX = useMotionValue(0);
  const [currentX, setCurrentX] = useState(0);
  const [cloudPositions, setCloudPositions] = useState({ left: 0, right: 0 });
  const positionsStored = useRef(false);
  
  // State for cloud movement (x and y for both clouds)
  const [leftCloudPos, setLeftCloudPos] = useState({ x: 0, y: 0 });
  const [rightCloudPos, setRightCloudPos] = useState({ x: 0, y: 0 });

  // Update currentX whenever planeX changes
  useEffect(() => {
    const unsubscribe = planeX.on("change", (latestX) => {
      setCurrentX(latestX);
      console.log("Plane X position:", currentX);
      
      // Move left cloud when plane is near (both x and y)
      if (Math.abs(latestX - cloudPositions.left) < 50) {
        setLeftCloudPos({ x: -30, y: -30 }); // Moves left and up
      }
      
      // Move right cloud when plane is near (both x and y)
      if (Math.abs(latestX - cloudPositions.right) < 50) {
        setRightCloudPos({ x: 30, y: 30 }); // Moves right and down
      }
    });
    
    return () => unsubscribe();
  }, [planeX, cloudPositions]);

  // Store initial cloud positions
  useEffect(() => {
    if (!positionsStored.current) {
      const leftCloud = document.querySelector('.left-cloud');
      const rightCloud = document.querySelector('.right-cloud');
      
      if (leftCloud && rightCloud) {
        const leftRect = leftCloud.getBoundingClientRect();
        const rightRect = rightCloud.getBoundingClientRect();
        
        setCloudPositions({
          left: leftRect.x,
          right: rightRect.x
        });
        
        positionsStored.current = true;
      }
    }
  }, []);

  return (
    <div className="overflow-hidden w-screen bg-white h-screen flex items-center">
      <div className="relative w-full h-full">
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative w-full max-w-7xl h-full flex justify-between">
            {/* Left Cloud */}
            <motion.div
              className="h-full left-cloud flex items-start"
              animate={{
                x: leftCloudPos.x,
                y: leftCloudPos.y
              }}
              transition={{ 
                type: "spring",
                stiffness: 60,
                damping: 10
              }}
            >
              <Image
                src={Cloud}
                alt=""
                className="w-[560px] lg:w-[640px] h-[640px]"
              />
            </motion.div>
            
            {/* Right Cloud */}
            <motion.div
              className="right-cloud h-full flex items-end"
              animate={{
                x: rightCloudPos.x,
                y: rightCloudPos.y
              }}
              transition={{ 
                type: "spring",
                stiffness: 60,
                damping: 10
              }}
            >
              <Image
                src={Cloud}
                alt=""
                className="w-[560px] lg:w-[640px] h-[640px] relative z-10"
              />
            </motion.div>
          </div>
        </div>
      
        {/* Plane that moves across */}
        <motion.div
          style={{ x: planeX }}
          initial={{ x: "-100%" }}
          animate={{ x: "100vw" }}
          transition={{
            duration: 4,
            ease: "linear",
          }}
          className="absolute top-1/2 -translate-y-1/2 w-auto flex gap-10"
        >
          <Image src={Plane} alt="Plane" className="w-[400px] h-auto" />
        </motion.div>
      </div>
    </div>
  );
}