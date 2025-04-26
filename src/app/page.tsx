'use client'
import Image from "next/image";
import Plane from "../../public/assets/videos/plane.png";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="overflow-hidden w-screen bg-white h-screen flex items-center">
      <div className="relative w-full h-full">
        {/* Yellow trail that follows the plane */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{
            duration: 3.1,
            ease: "linear",
            delay: 1.8
          }}
          className="absolute top-1/2 -translate-y-1/2 h-[400px] w-screen bg-[#101218] border-y-[32px] border-[#C7B299] text-5xl lg:text-7xl xl:text-9xl text-amber-200 font-[700]"
        >
          <div className="w-full h-full py-4 flex justify-between flex-col">
          <div className="flex">
          <div className="bg-yellow-300 h-[12px] w-full"/>
          </div>
          <div className="flex gap-4">
          <div className="bg-white h-[12px] w-[120px]"/>
          <div className="bg-white h-[12px] w-[120px]"/>
          <div className="bg-white h-[12px] w-[120px]"/>
          <div className="bg-white h-[12px] w-[120px]"/>
          <div className="bg-white h-[12px] w-[120px]"/>
          <div className="bg-white h-[12px] w-[120px]"/>
          <div className="bg-white h-[12px] w-[120px]"/>
          <div className="bg-white h-[12px] w-[120px]"/>
          <div className="bg-white h-[12px] w-[120px]"/>
          <div className="bg-white h-[12px] w-[120px]"/>
          <div className="bg-white h-[12px] w-[120px]"/>
          </div>
          <div className="flex">
          <div className="bg-yellow-300 h-[12px] w-full"/>
          </div>
          </div>
        
        </motion.div>
        
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