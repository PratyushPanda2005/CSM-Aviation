"use client";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useScroll, animate } from "framer-motion";
import { useEffect, useState } from "react";
import Plane from "../../public/assets/videos/plane.png";
import Aviation from "../../public/assets/videos/Aviation.jpeg";

export default function Home() {
  const { scrollYProgress } = useScroll(); // normalized scroll [0,1]
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const planeWidth = 400;
  const cloudWidth = 480;
  const gap = 30;

  const cloudX = useMotionValue(0);

  // ✅ Initialize window width AND set initial cloudX off-screen
  useEffect(() => {
    const updateWindowWidth = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      const initialPlaneX = -planeWidth;
      const initialCloudX = initialPlaneX - cloudWidth - gap;
      cloudX.set(initialCloudX); // 🛠️ Set cloud off-screen initially
    };

    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, [cloudX, cloudWidth, planeWidth, gap]);

  // Plane's X: from off-screen left to fully off-screen right
  const planeX = useTransform(
    scrollYProgress,
    [0, 1],
    [-planeWidth, windowWidth + planeWidth]
  );

  // Cloud follows plane and stops at center
  useEffect(() => {
    const stopTriggerPosition = windowWidth / 2 + planeWidth / 2;
    const cloudStopPosition = windowWidth / 2 - cloudWidth / 2;

    const unsubscribe = planeX.on("change", (latestPlaneX) => {
      const followX = latestPlaneX - cloudWidth - gap;

      if (latestPlaneX < stopTriggerPosition) {
        cloudX.set(followX);
      } else {
        animate(cloudX, cloudStopPosition, {
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 0.5,
        });
      }
    });

    return () => unsubscribe();
  }, [planeX, windowWidth, cloudWidth, planeWidth, gap, cloudX]);

  return (
    <>
      <div className="overflow-hidden w-screen bg-white h-[200vh] flex items-center">
        <div className="w-full h-screen sticky top-0">
          {/* Cloud */}
          <motion.div
            style={{
              x: cloudX,
              position: "absolute",
              top: "50%",
              translateY: "-50%",
              zIndex: 10,
              width: `${cloudWidth}px`,
              height: `${cloudWidth}px`,
            }} className=" flex items-center justify-center"
          >
            <div id="cloud-clip-path" className="relative w-[320px] h-[320px] lg:w-full lg:h-full">
              <Image
                src={Aviation}
                alt="Aviation background"
                className="w-full h-full opacity-40"
                priority
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4">
                <h1 className="text-center text-2xl lg:text-4xl font-[700] ">Direct Charter to Public</h1>
                <p className="text-black text-center">
                  Located in Central California, we are positioned well to depart from all Northern and Southern California airport locations.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Plane */}
          <motion.div
            style={{
              x: planeX,
              position: "absolute",
              top: "50%",
              translateY: "-50%",
              zIndex: 20,
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
    </>
  );
}
