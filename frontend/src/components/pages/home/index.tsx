"use client";
import loop from "@/assets/loop.mp4";
import Navbar from "@/components/ui/navbar";

const HomePage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={loop} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Navbar />
    </div>
  );
};

export default HomePage;
