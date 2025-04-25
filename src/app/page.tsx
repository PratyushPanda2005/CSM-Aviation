'use client'
import Image from "next/image";
import Plane from "../../public/assets/videos/plane.png";
import Cloud from "../../public/assets/videos/cloud2.png";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="overflow-hidden bg-black h-screen flex items-center">
      <header className="relative w-full h-full">
        {/* Cloud that stops in the middle */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "50%" }}
          transition={{
            duration: 2,
            delay: 2,
           
          }}
          className="absolute top-1/2 -translate-y-1/2 w-[800px]"
        >
          <Image src={Cloud} alt="Cloud" className="w-full h-auto" />
        </motion.div>

        {/* Plane that continues moving */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "300%" }}
          transition={{
            duration: 4,
            ease: "linear",
            delay: 0.5
          }}
          className="absolute top-1/2 -translate-y-1/2 "
        >
          <Image src={Plane} alt="Plane" className="w-full h-auto" />
        </motion.div>
      </header>
    </div>
  );
}