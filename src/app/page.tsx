'use client'
import Image from "next/image";
import Plane from "../../public/assets/videos/plane.jpg"
import { motion } from "motion/react"
export default function Home() {
  return (
  <>
   <header>
    <motion.div initial={{x: "-100%"}} animate={{x: "300%"}} transition={{duration: 5}} className="w-[40%]">
    <Image className="object-cover" src={Plane} alt=""/>
    </motion.div>
    <motion.div initial={{x: "300%"}} animate={{x: "-100%"}} transition={{duration: 5}} className="w-[40%]">
    <Image className="object-cover rotate-180" src={Plane} alt=""/>
    </motion.div>
   </header>
  </>
  );
}
