import type { MetadataRoute } from "next";

export default function mainfest(): MetadataRoute.Manifest {
  return {
    name: "HackUDC Management",
    short_name: "HackUDC",
    description: "HackUDC management utility",
    start_url: "/",
    display: "standalone",
    background_color: "#181818",
    theme_color: "#15803d",
    icons: [
      {
        src: "/icon-256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
