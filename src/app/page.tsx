'use client'
import Image from "next/image";
import Plane from "../../public/assets/videos/plane.png";
import Pathway2 from "../../public/assets/videos/Road2.jpg"
import Aviation from "../../public/assets/videos/Aviation.jpeg"
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="overflow-hidden w-screen bg-white h-screen flex items-center">
      <div className="relative w-full h-full">
        {/* Yellow trail that follows the plane */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-[400px] w-screen bg-[#101218] "
        >
          <div  className="w-full h-full relative">
         <Image src={Pathway2} className="w-full h-full relative" alt=""/>
          </div>
          <div className="absolute inset-0 flex items-center ">
            <motion.div initial={{x:"-100%"}} animate={{x:"100%"}} transition={{delay:3.1, duration: 3}} className="">
            <Image className="h-[80%] w-[480px] opacity-[30%]" src={Aviation} alt=""/>
            </motion.div>
            <motion.div initial={{opacity:0}} animate={{opacity:1}}  transition={{duration: 6, delay:5, ease: "easeOut"}} className="absolute inset-0 flex items-center justify-center">
              <div>
              <h1 className="w-[480px] text-4xl font-[700] text-white">Direct Charter to Public</h1>
              <p className="w-[400px] text-white">Located in Central California, we are positioned well to depart from all Northern and Southern California airport locations, including Las Vegas and Reno, Nevada. We offer the Luxury Travel Experience, with safety and overall trip experience as our primary focus.</p>
              </div>
            </motion.div>
            </div>
        </div>
        
        {/* Plane that moves across */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "300%" }}
          transition={{
            duration: 6,
            ease: "linear",
           
          }}
          className="absolute top-1/2 -translate-y-1/2 w-auto flex gap-10"
        >
          <h1 className="text-5xl lg:text-7xl xl:text-9xl font-bold text-amber-50 text-center uppercase flex items-center">CSM</h1>
          <Image src={Plane} alt="Plane" className="w-full h-auto" />
        </motion.div>
      </div>
    </div>
  );
}


