export default function Home() {
  return (
    <div className="banner absolute w-full h-screen flex items-center justify-center">
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover">
        <source src="/assets/videos/jetcenter.mp4" type="video/mp4" />
      </video>
      <h2 className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-60 text-[240px] uppercase font-[700]">
        Csm
      </h2>
    </div>
  );
}
