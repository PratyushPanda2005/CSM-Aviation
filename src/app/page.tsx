'use client'
import Image from "next/image";
import Plane from "../../public/assets/videos/plane.png";
import Pathway2 from "../../public/assets/videos/Road2.jpg"
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="overflow-hidden w-screen bg-white h-screen flex items-center">
      <div className="relative w-full h-full">
        {/* Yellow trail that follows the plane */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-[400px] w-screen bg-[#101218]   text-5xl lg:text-7xl xl:text-9xl  font-[700]"
        >
          <div  className="w-full h-full relative">
         <Image src={Pathway2} className="w-full h-full relative" alt=""/>
          </div>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2.5, delay:3.1, ease: "easeOut"}} className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-5xl lg:text-7xl xl:text-9xl font-bold text-amber-50 text-center uppercase">
                CSM
              </h1>
            </motion.div>
        </div>
        
        {/* Plane that moves across */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "300%" }}
          transition={{
            duration: 6,
            ease: "linear",
           
          }}
          className="absolute top-1/2 -translate-y-1/2 w-auto"
        >
          <Image src={Plane} alt="Plane" className="w-full h-auto" />
        </motion.div>
      </div>
    </div>
  );
}


