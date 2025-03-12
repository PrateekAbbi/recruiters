"use client"; // ✅ Enables client-side functionality

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { type Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim"; // ✅ Correct import for lightweight performance
import Form from "@/components/Form";
import { DataTable } from "@/components/Table";

export default function Home() {
  // ✅ Initialize particles
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine); // ✅ Loads the slim version of tsparticles
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center">
      {/* ✅ Interactive Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true }, // ✅ Covers the entire background
          background: { color: "#0d0d0d" }, // ✅ Dark theme
          particles: {
            number: { value: 100 }, // ✅ More particles
            shape: { type: "circle" }, // ✅ Circular particles
            size: {
              value: { min: 2, max: 5 }, // ✅ Varying particle sizes
            },
            move: {
              enable: true,
              speed: 2, // ✅ Smooth movement
              direction: "none",
              random: false,
              straight: false,
              outModes: { default: "out" },
              attract: { enable: false },
            },
            opacity: {
              value: 0.8,
              random: true,
              animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.3,
                sync: false,
              },
            },
            color: {
              value: ["#ff4a4a", "#ffb84a", "#48ff4a", "#4affd9", "#4a8fff"], // ✅ Colorful particles
            },
            links: {
              enable: true,
              color: "#ffffff", // ✅ White connecting lines
              distance: 150, // ✅ Distance for connections
              width: 1.5,
              opacity: 0.4,
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: ["repulse", "bubble"], // ✅ Particles move away on hover
                },
                onClick: {
                  enable: true,
                  mode: "push", // ✅ Clicking adds new particles
                },
              },
              modes: {
                repulse: {
                  distance: 120, // ✅ Particles move away from cursor
                  duration: 0.4,
                },
                bubble: {
                  distance: 150,
                  size: 6, // ✅ Bubbles increase in size
                  duration: 0.4,
                },
                push: {
                  quantity: 4, // ✅ Clicking adds 4 new particles
                },
              },
            },
          },
          detectRetina: true, // ✅ Ensures high-resolution support
        }}
        className="absolute inset-0 z-1"
      />

      {/* ✅ Content on top of the particles */}
      <div className="relative z-10 flex flex-col gap-6 w-full max-w-5xl mt-5">
        <Form />
        <DataTable />
      </div>
    </div>
  );
}
