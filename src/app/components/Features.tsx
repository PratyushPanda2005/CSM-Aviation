import React from "react";

const Features = () => {

    const listItems = 
    [
        {
            title: "Miami Private Aircraft Services",
            subtext: "We provide premium air transportation solutions in Miami, with a focus on exceptional service delivery and customer satisfaction. Our experienced team ensures every flight meets the highest standards of luxury travel.",
            videopath: "/assets/pdvideos/medium.mp4"
        },
        {
            title: "New York Premium Aviation Services",
            subtext: "We deliver exceptional air travel solutions throughout the New York region, with our expert team ensuring superior service for every flight.",
            videopath: "/assets/pdvideos/medium.mp4"
        },
        {
            title: "Los Angeles Premium Aviation",
            subtext: "We specialize in providing superior air transportation solutions throughout the Los Angeles region. Our professional team delivers exceptional travel experiences tailored to each client's needs.",
            videopath: "/assets/pdvideos/medium.mp4"
        },
        {
            title: "Las Vegas Premium Air Services",
            subtext: "We provide exceptional private aviation solutions in Las Vegas, delivering superior travel experiences through our dedicated team of professionals.",
            videopath: "/assets/pdvideos/medium.mp4"
        },
    ]
  return (
    <section className="bg-black w-full px-6 lg:px-10 flex justify-center items-center pt-20">
      <div className="max-w-7xl">
      {listItems.map((item, index) => (
    <div key={index} className="flex flex-col mb-20 relative">
      <div className="relative">
        <h1 className="text-white font-[700]">{item.title}</h1>
        <p className="text-white/50 max-w-md ">
          {item.subtext}
        </p>
      </div>
      <div className="w-full flex justify-center pt-20">
        <div className="lg:h-[65vh] border">
          <video
            src={item.videopath}
            className="h-full w-full"
            autoPlay
            muted
            loop
          />
        </div>
      </div>
    </div>
  ))}
      </div>
    </section>
  );
};

export default Features;


