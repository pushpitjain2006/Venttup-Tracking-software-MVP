import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port:
      // import.meta.env.REACT_APP_port ||
      5173,
  },
});
