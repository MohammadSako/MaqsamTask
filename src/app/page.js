"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Footer from "../components/ui/footer";

const Map = dynamic(() => import("./components/Map"), { ssr: false });
// This tells Next.js to load the Map component dynamically instead of bundling it in the
// initial server-rendered page. This ensures that the Map component is only rendered on
// the client side. Some components, like react-leaflet (maps), rely on browser APIs (e.g., window, navigator),
// which are not available on the server.
// If SSR is enabled for such components, Next.js will throw errors like window is not defined.

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
      console.log("tessst", url);
      
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

  if (!wallpaper) {
    return <p>Loading</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Image
        src={"/maqsam1.png"}
        alt="wallpaper"
        width={150}
        height={50}
        className="m-4 "
      />

      <h1 className="flex justify-center capitalize sm:text-6xl text-3xl font-bold mt-4 text-gray-600 font-sans">
        world sunrise and sunset
      </h1>
      <p className="flex justify-center capitalize sm:text-3xl text-xl text-gray-500 mt-2">
        Junior Engineer Technical Task
      </p>
      <p className="flex justify-center text-center capitalize sm:text-2xl mx-4 font-bold mt-10 text-blue-600 font-mono">
        Select a country or place to see where the sun rises or sets
      </p>
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
          height={400}
          className="flex justify-center w-full sm:h-[400px] sm:mt-16"
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
// 5. See the code in Github: https://github.com/MohammadSako/MaqsamTask.git
