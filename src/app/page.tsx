'use client'
import Image from "next/image";
import Plane from "../../public/assets/videos/plane.png";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="overflow-hidden w-screen bg-black h-screen flex items-center">
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
          className="absolute top-1/2 -translate-y-1/2 h-[300px] w-screen bg-amber-900 flex justify-center items-center text-9xl text-amber-200 font-[700]"
        >HELLO</motion.div>
        
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