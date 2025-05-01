'use client'
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import PlaneImg from "../../../public/assets/images/pngwing.com.png";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);
const images = [
  {
    src: PlaneImg,
    alt: "King Air F90",
    title: "King Air F90",
  },
  {
    src: PlaneImg,
    alt: "King Air F100",
    title: "King Air F100",
  },
  {
    src: PlaneImg,
    alt: "King Air F110",
    title: "King Air F110",
  },
];

const ImageGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const leftThumbRef = useRef<HTMLDivElement>(null);
  const rightThumbRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);

  const getIndex = (offset: number) =>
    (currentIndex + offset + images.length) % images.length;

  const mainImage = images[currentIndex];
  const leftThumb = images[getIndex(1)];
  const rightThumb = images[getIndex(2)];

  const animateSwap = (clickedThumb: "left" | "right") => {
    if (isAnimating) return;
    setIsAnimating(true);
  
    const clickedThumbRef = clickedThumb === "left" ? leftThumbRef : rightThumbRef;
    const oppositeThumbRef = clickedThumb === "left" ? rightThumbRef : leftThumbRef;
    const clickedImageRef = clickedThumb === "left" ? leftImageRef : rightImageRef;
    
    const targetIndex = clickedThumb === "left" 
      ? (currentIndex + 1) % images.length 
      : (currentIndex - 1 + images.length) % images.length;
  
    // Get positions
    const thumbRect = clickedThumbRef.current?.getBoundingClientRect();
    const oppositeRect = oppositeThumbRef.current?.getBoundingClientRect();
    const centerRect = mainImageRef.current?.getBoundingClientRect();
    
    if (!thumbRect || !oppositeRect || !centerRect) return;
  
    // Create clones
    const thumbClone = clickedImageRef.current?.cloneNode(true) as HTMLElement;
    const centerClone = mainImageRef.current?.cloneNode(true) as HTMLElement;
    const oppositeClone = clickedThumb === "left" 
      ? rightImageRef.current?.cloneNode(true) as HTMLElement
      : leftImageRef.current?.cloneNode(true) as HTMLElement;
    
    if (!thumbClone || !centerClone || !oppositeClone) return;
  
    document.body.appendChild(thumbClone);
    document.body.appendChild(centerClone);
    document.body.appendChild(oppositeClone);
  
    // Position clones
    gsap.set([thumbClone, centerClone, oppositeClone], {
      position: "fixed",
      zIndex: 100,
      pointerEvents: "none",
      transformOrigin: "center center"
    });
  
    gsap.set(thumbClone, {
      left: thumbRect.left,
      top: thumbRect.top,
      width: thumbRect.width,
      height: thumbRect.height,
      scale: 1
    });
  
    gsap.set(centerClone, {
      left: centerRect.left,
      top: centerRect.top,
      width: centerRect.width,
      height: centerRect.height,
      scale: 1
    });
  
    gsap.set(oppositeClone, {
      left: oppositeRect.left,
      top: oppositeRect.top,
      width: oppositeRect.width,
      height: oppositeRect.height,
      scale: 1
    });

  
    // Hide originals during animation
    gsap.set([mainImageRef.current, leftImageRef.current, rightImageRef.current], {
      opacity: 0,
      duration: 0
    });
  
    // Create timeline
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set([mainImageRef.current, leftImageRef.current, rightImageRef.current], {
          opacity: 1,
          duration: 0
        });
        thumbClone.remove();
        centerClone.remove();
        oppositeClone.remove();
        
        setCurrentIndex(targetIndex);
        setIsAnimating(false);
      }
    });
  
    const xDirection = clickedThumb === "left" ? 1 : -1;
    const totalDuration = 1.2; // Total animation duration in seconds
  
    // 1. Initial scale up of clicked thumbnail
    tl.to(thumbClone, {
      scale: 1.1,
      duration: 0.15,
      ease: "power2.out"
    });
  
    // 2. Create text animation (fade out current text)
    tl.to(titleRef.current, {
      opacity: 0,
      y: -20,
      duration: totalDuration * 0.3,
      ease: "power2.out"
    });
  
    // 3. Main movement animations
    tl.add([
      // Clicked thumbnail moves to center
      gsap.to(thumbClone, {
        left: centerRect.left,
        top: centerRect.top,
        width: centerRect.width,
        height: centerRect.height,
        scale: 1,
        duration: totalDuration,
        ease: "power2.inOut"
      }),
      
      // Current center image moves to opposite position
      gsap.to(centerClone, {
        left: oppositeRect.left,
        top: oppositeRect.top,
        width: oppositeRect.width,
        height: oppositeRect.height,
        duration: totalDuration,
        ease: "power2.inOut"
      }),
      
      // Opposite thumbnail exits diagonally
      gsap.to(oppositeClone, {
        motionPath: {
            path: [
                {x: 0, y: 0},
                {x: xDirection * 100, y: 50},
                {x: xDirection * 200, y: 100}
            ],
            curviness: 1.5
        },
        x: xDirection * 200,
        y: 200,
        rotation: xDirection * 20,
        opacity: 0,
        duration: totalDuration * 0.8,
        ease: "power2.in"
      }),


      
    ], "<");
  
    
    // 4. Change text when center clone is halfway
    tl.call(() => {
      if (titleRef.current) {
        titleRef.current.textContent = images[targetIndex].title;
      }
    }, [], totalDuration * 0.5);
  
    // 5. Fade in new text
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: totalDuration * 0.5,
      ease: "power2.in"
    }, `-=${totalDuration * 0.2}`);
  
  
  
  };


  const handleClick = (direction: "left" | "right") => {
    animateSwap(direction);
  };
  
  useEffect(() => {
    images.forEach(img => {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = img.src.src; 
      document.head.appendChild(preloadLink);
    });
  }, []);

  return (
    <section className="min-h-screen lg:h-[100dvh] relative overflow-hidden px-6">
      {/* Center Image */}
      <div className="absolute inset-0 flex flex-col items-center justify-center ">
        <div 
          ref={titleRef}
          className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl z-0 text-[#02203d] font-bold  text-center relative top-[56px] sm:top-[120px] rotate-0"
        >
          {mainImage.title}
        </div>
        <div 
          ref={mainImageRef}
          className="relative w-full max-w-3xl h-[200px] sm:h-[400px] z-10"
        >
          <Image
            src={mainImage.src}
            alt={mainImage.alt}
            fill
            className="object-contain"
            priority
          />
        </div>
        <button className="bg-blue-500 text-white p-4 cursor-pointer rounded-3xl font-semibold">Request Quote</button>
      </div>

      {/* Bottom Thumbnails */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end px-10 z-30 ">
        {/* Left Thumbnail */}
        <div
          ref={leftThumbRef} 
          className="flex flex-col items-center cursor-pointer"
          onClick={() => handleClick("left")}
        >
        
          <div 
            ref={leftImageRef}
            className="relative w-[160px] h-[100px]"
          >
            <Image
              src={leftThumb.src}
              alt={leftThumb.alt}
              fill
              className="object-contain hover:scale-110 transition-transform duration-300"
              priority
            />
          </div>
        </div>

        {/* Right Thumbnail */}
        <div
          ref={rightThumbRef}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => handleClick("right")}
        >
         
          <div 
            ref={rightImageRef}
            className="relative w-[160px] h-[100px]"
          >
            <Image
              src={rightThumb.src}
              alt={rightThumb.alt}
              fill
              className="object-contain hover:scale-110 transition-transform duration-300"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
