import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  // مهم برای Electron
  base: "./",

  plugins: [
    react(),

    VitePWA({
      // فعلاً برای Electron خاموش
      disabled: true,

      registerType: "autoUpdate",

      includeAssets: [
        "vero-icon.svg",
        "apple-touch-icon.png",
      ],

      manifest: {
        name: "VERO",
        short_name: "VERO",
        description: "Luxury architectural client portal",

        theme_color: "#050505",
        background_color: "#050505",

        display: "standalone",

        icons: [
          {
            src: "vero-icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "vero-icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],

  build: {
    sourcemap: true,
  },
});