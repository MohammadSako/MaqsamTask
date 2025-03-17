"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Footer from "../components/ui/footer";

const Map = dynamic(() => import("./components/Map"), { ssr: false });

export default function Home() {
  const [location, setLocation] = useState({ lat: 10.9544, lng: 10.9106 });
  const [wallpaper, setWallpaper] = useState("day.png");

  useEffect(() => {
    async function Geo(location) {
      const lat = location.lat;
      const lon = location.lng;
      if (!lat || !lon) {
        return new Response("Missing parameters", { status: 400 });
      }
      const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.status !== "OK") {
        return new Response("Error fetching data", { status: 500 });
      }
      const now = new Date();
      const sunrise = new Date(data.results.sunrise);
      const sunset = new Date(data.results.sunset);
      let wallpaper;
      if (now < sunrise || now > sunset) {
        setWallpaper("night.png");
      } else if (now < new Date(sunrise.getTime() + 1 * 60 * 60 * 1000)) {
        setWallpaper("sunrise.png");
      } else if (now < new Date(sunset.getTime() - 2 * 60 * 60 * 1000)) {
        setWallpaper("morning.png");
      } else if (now < sunset) {
        setWallpaper("sunset.png");
      } else {
        setWallpaper("afternoon.png");
      }
      return new Response(JSON.stringify({ wallpaper }), { status: 200 });
    }
    Geo(location);
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="flex justify-center capitalize text-6xl font-bold my-10 text-gray-600 font-sans">
        world sunrise and sunset
      </h1>
      <main>
        <Map
          latitude={location.lat}
          longitude={location.lng}
          onLocationSelect={(lng, lat) => setLocation({ lng, lat })}
        />
        <Image
          src={`/${wallpaper}`}
          alt="wallpaper"
          width={800}
          height={600}
          className="flex justify-center w-full h-auto mt-16"
        />
      </main>
      <footer className="py-4 mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

// Instructions:
// 1. Open the console: write => npm install.
// 2. Run the command: write => npm run dev
// 3. Then open on your browser: http://localhost:3000

// 4. Or click this link to open the app hosted on Vercel: https://maqsam-task-gamma.vercel.app
